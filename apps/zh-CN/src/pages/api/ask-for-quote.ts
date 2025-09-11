import type { APIRoute } from "astro";
import type {
  SpamFilterRule,
  SpamFilterRuleBoolExp,
  SpamFilterRuleDistinctExp,
  SpamFilterRuleOrderBy,
} from "@rxdrag/rxcms-models";
import {
  EnquiryAssciations,
  EnquiryEntityName,
  EnquiryFields,
  SpamFilterRuleFields,
  SpamFilterRuleQueryOptions,
} from "@rxdrag/rxcms-models";
import {
  queryWebSiteSettings,
  sendEmail,
  upsertEntity,
  verifyEncryption,
  type QuoteRequest,
} from "@rxdrag/website-lib-core";
import { FORM_SALT, getEnvVariables, rx } from "theme";

// 标记此页面为服务器渲染，而不是静态生成
export const prerender = false;

function getRealIP(request: Request) {
  // 🔥 本地调试：使用测试IP
  const testIP = request.headers.get("X-Test-IP");
  if (testIP) {
    console.log("🧪 使用测试IP:", testIP);
    return testIP;
  }

  // 尝试多个可能的头部字段
  const possibleHeaders = [
    "CF-Connecting-IP", // Cloudflare
    "X-Real-IP", // Nginx
    "X-Forwarded-For", // 标准代理头
    "X-Client-IP", // 某些代理
    "X-Forwarded", // 非标准
    "X-Cluster-Client-IP", // 集群
    "Forwarded-For", // 旧标准
    "Forwarded", // RFC 7239
  ];

  for (const header of possibleHeaders) {
    const value = request.headers.get(header);
    if (value) {
      // X-Forwarded-For 可能包含多个IP，取第一个
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }

  // 最后回退
  return undefined;
}

function isValidIP(ip: string): boolean {
  // 简单的IP验证
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^[a-fA-F0-9:]+$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const envVariables = getEnvVariables();
    // 从请求中获取JSON数据
    let requestData: QuoteRequest;
    try {
      requestData = await request.json();
    } catch (error) {
      console.error("JSON parsing error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid request format",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 验证蜜罐字段
    if (requestData.phone) {
      // 悄悄失败，返回成功但不处理
      return new Response(
        JSON.stringify({
          success: true,
          message:
            "Your enquiry has been submitted successfully, we will contact you soon",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 创建实体对象 - 移除不在数据库模型中的字段
    const { phone, encryptedField, ...entityData } = requestData;
    const entity: Record<string, unknown> = { ...entityData };

    // 检查蜜罐字段
    if (phone) {
      // 蜜罐被触发，拒绝请求
      return new Response(
        JSON.stringify({
          success: false,
          message: "Form submission rejected",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 验证加密字段
    const isValid = verifyEncryption(
      //加密盐
      FORM_SALT,
      encryptedField,
      phone || "",
      30 // 30分钟有效期
    );

    if (!isValid) {
      // 加密验证失败，拒绝请求
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid form submission",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 获取请求头信息
    const url =
      request.headers.get("X-Request-URL") || request.headers.get("referer");
    const ip = getRealIP(request);
    const userAgent = request.headers.get("user-agent");

    // 设置额外字段
    entity[EnquiryFields.formIp] = ip;
    entity[EnquiryFields.fromUrl] = url;
    entity[EnquiryFields.userAgent] = userAgent;
    entity[EnquiryFields.read] = false;
    entity[EnquiryFields.spam] = false;
    entity[EnquiryAssciations.website] = {
      sync: { id: envVariables.websiteId },
    };

    // 验证必填字段
    if (
      !entity[EnquiryFields.name] ||
      !entity[EnquiryFields.email] ||
      !entity[EnquiryFields.message]
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please fill in all required fields",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 垃圾信息过滤
    const spamRules = (
      await rx.queryEntityList<
        SpamFilterRule,
        SpamFilterRuleBoolExp,
        SpamFilterRuleOrderBy,
        SpamFilterRuleDistinctExp
      >(
        new SpamFilterRuleQueryOptions([
          SpamFilterRuleFields.emails,
          SpamFilterRuleFields.ips,
          SpamFilterRuleFields.keywords,
        ])
      )
    )?.items as SpamFilterRule[] | undefined;

    for (const rule of spamRules || []) {
      const email = (entity[EnquiryFields.email] as string)?.trim();
      if (
        !email ||
        rule.emails
          ?.replace("，", ",")
          .split(",")
          .map((em) => em.trim())
          .includes(email) ||
        (ip &&
          rule.ips
            ?.replace("，", ",")
            .split(",")
            .map((ipAddr) => ipAddr.trim())
            .includes(ip)) ||
        rule.keywords
          ?.split(",")
          .some(
            (keyword: string) =>
              keyword &&
              (entity[EnquiryFields.message] as string).includes(keyword)
          )
      ) {
        // 标记为垃圾信息并保存
        await upsertEntity(
          EnquiryEntityName,
          { ...entity, spam: true, read: false },
          envVariables
        );

        // 返回404响应，模拟原始行为
        return new Response(null, { status: 404 });
      }
    }

    // 保存询价信息
    await upsertEntity(EnquiryEntityName, entity, envVariables);

    // 获取网站设置并发送邮件通知
    const websettins = await queryWebSiteSettings(envVariables);
    const name = entity?.[EnquiryFields.name] as string;

    if (websettins?.noticeEmail) {
      const content = `
      Company: ${entity[EnquiryFields.company]}
      Name: ${name}
      Email: ${entity[EnquiryFields.email]}
      Mobile or Whatsapp: ${entity[EnquiryFields.mobile]}
      Message: ${entity[EnquiryFields.message]}
      IP: ${ip}
      URL: ${url}
      CTA: ${entity[EnquiryFields.fromCta]}
      userAgent: ${userAgent}
      `;

      const employeeEmail = {
        to: websettins?.noticeEmail,
        subject: "New Enquiry Received",
        message: content,
      };

      //去掉await，提高页面响应速度
      sendEmail(employeeEmail, envVariables);
    }
    //TODO 先不实现，需要读取theme信息，用于获取回复邮件模板
    // if(websettins?.replyToEmail){

    //   const customerEmail = {
    //     to: entity[EnquiryFields.email],
    //     subject: "New Enquiry Received",
    //     message: content,
    //   };

    //   //去掉await，提高页面响应速度
    //   sendEmail(customerEmail, envVariables);
    // }

    // 返回JSON响应
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Your enquiry has been submitted successfully, we will contact you soon",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing enquiry request:", error);

    // 返回错误响应
    return new Response(
      JSON.stringify({
        success: false,
        message: "Submission failed, please try again later",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

import type { CookieConsentConfig } from "vanilla-cookieconsent";

  // 声明全局 gtag 函数类型
  declare global {
    function gtag(...args: any[]): void;
  }
  
  // 加载 Google Analytics 脚本
  export function grantGa() {
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  }
  
  // 清除 Google Analytics cookies
  function clearGA4Cookies() {
    const gaCookies = document.cookie
      .split(";")
      .filter((cookie) => cookie.trim().startsWith("_ga"));
  
    gaCookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
  }
  
  export const config: CookieConsentConfig = {
    guiOptions: {
      consentModal: {
        layout: "box inline",
        position: "bottom left",
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },
    categories: {
      necessary: {
        readOnly: true,
      },
      functionality: {},
      analytics: {
        services: {
          ga4: {
            label:
              '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
            onAccept: () => {
              console.log("Google Analytics 4 accepted");
              grantGa();
            },
            onReject: () => {
              console.log("Google Analytics 4 rejected");
              clearGA4Cookies();
  
              // 禁用 Google Analytics
              if (typeof gtag !== "undefined") {
                gtag("consent", "update", {
                  analytics_storage: "denied",
                });
              }
            },
            cookies: [
              {
                name: /^_ga/,
              },
              {
                name: /^_gid/,
              },
              {
                name: /^_gat/,
              },
            ],
          },
          another: {
            label: "Another one (dummy)",
          },
        },
      },
    },
    language: {
      default: "en",
      autoDetect: "browser",
      translations: {
        en: {
          consentModal: {
            title: "Your Privacy Matters",
            description:
              "We use cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. You can manage your preferences or accept all cookies. For more information, please see our Privacy Policy.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage preferences",
            footer:
              '<a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>\n<a href="/terms" target="_blank" rel="noopener">Terms and Conditions</a>',
          },
          preferencesModal: {
            title: "Consent Preferences Center",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close modal",
            serviceCounterLabel: "Service|Services",
            sections: [
              {
                title: "How We Use Cookies",
                description:
                  "Cookies help us provide, protect and improve our services. You can choose which categories you want to allow. Some cookies are necessary for the website to function and cannot be switched off.",
              },
              {
                title:
                  'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                description:
                  "These cookies are essential for the website to operate properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
                linkedCategory: "necessary",
              },
              {
                title: "Functionality Cookies",
                description:
                  "Functionality cookies allow the website to remember choices you make (such as your language or the region you are in) and provide enhanced, more personal features.",
                linkedCategory: "functionality",
              },
              {
                title: "Analytics Cookies",
                description:
                  "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services and your experience.",
                linkedCategory: "analytics",
              },
              {
                title: "More Information",
                description:
                  'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
              },
            ],
          },
        },
      },
    },
  };
  
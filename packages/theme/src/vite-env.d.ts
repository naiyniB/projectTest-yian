/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WEBSITE_ID: string;
  readonly PUBLIC_ENTIFY_SERVER_URL: string;
  readonly PUBLIC_ENTIFY_GUEST_TOKEN: string;
  readonly PUBLIC_LANGUAGE: string;
  // 可以根据需要添加更多环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

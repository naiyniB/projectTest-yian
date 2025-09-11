// Cookie 同意策略类型
  export type CookieConsentStrategy = "ALWAYS_SHOW" | "EU_ONLY";
  
  // Google Analytics 配置
  export const ANALYTICS_CONFIG = {
    // Cookie 同意策略
    // 'ALWAYS_SHOW' - 所有地区都显示Cookie同意UI
    // 'EU_ONLY' - 只有欧洲地区显示Cookie同意UI，其他地区直接加载GA
    COOKIE_CONSENT_STRATEGY:
      (import.meta.env.PUBLIC_COOKIE_CONSENT_STRATEGY as CookieConsentStrategy) ||
      "EU_ONLY",
  
    // 可选配置
    ANONYMIZE_IP: true,
    COOKIE_FLAGS: "SameSite=None;Secure",
  
    // 调试模式（开发环境）
    DEBUG_MODE: import.meta.env.DEV,
  
    // 地理位置检测API配置
    GEO_API_TIMEOUT: 3000, // 3秒超时
    GEO_API_URL: "https://ipapi.co/json/",
  
    // 欧洲国家代码列表（EU + EEA + UK）
    EU_COUNTRIES: [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "IS",
      "LI",
      "NO",
      "GB", // EEA + UK
    ] as const,
  } as const;
  
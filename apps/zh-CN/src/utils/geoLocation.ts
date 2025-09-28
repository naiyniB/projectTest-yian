import { ANALYTICS_CONFIG } from '../config/analytics';

export interface GeoLocation {
  country_code?: string;
  country_name?: string;
  region?: string;
  city?: string;
  error?: string;
}

// 检测用户是否在欧洲
export async function isUserInEurope(): Promise<boolean> {
  try {
    const response = await fetch(ANALYTICS_CONFIG.GEO_API_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(ANALYTICS_CONFIG.GEO_API_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeoLocation = await response.json();
    
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('地理位置检测结果:', data);
    }

    if (data.country_code) {
      const isEU = ANALYTICS_CONFIG.EU_COUNTRIES.includes(data.country_code as any);
      
      if (ANALYTICS_CONFIG.DEBUG_MODE) {
        console.log(`用户位置: ${data.country_name} (${data.country_code}), 是否在欧洲: ${isEU}`);
      }
      
      return isEU;
    }

    return false;
  } catch (error) {
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.warn('地理位置检测失败:', error);
      console.log('默认假设用户在欧洲（出于安全考虑）');
    }
    
    // 检测失败时，出于隐私保护考虑，默认假设用户在欧洲
    return true;
  }
}

// 检查是否应该显示Cookie同意UI
export async function shouldShowCookieConsent(): Promise<boolean> {
  const strategy = ANALYTICS_CONFIG.COOKIE_CONSENT_STRATEGY;
  
  if (strategy === 'ALWAYS_SHOW') {
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('Cookie策略: 总是显示同意UI');
    }
    return true;
  }
  
  if (strategy === 'EU_ONLY') {
    const isEU = await isUserInEurope();
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log(`Cookie策略: 仅欧洲显示，当前用户${isEU ? '需要' : '不需要'}显示同意UI`);
    }
    return isEU;
  }
  
  // 默认显示（安全策略）
  return true;
} 
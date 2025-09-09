import {
  Entify,
  type EnvVariables,
  type IEntify,
} from "@rxdrag/website-lib-core";

export function getEnvVariables(): EnvVariables {
  return {
    websiteId: import.meta.env.PUBLIC_WEBSITE_ID,
    entifyServerUrl: import.meta.env.PUBLIC_ENTIFY_SERVER_URL,
    entifyGuestToken: import.meta.env.PUBLIC_ENTIFY_GUEST_TOKEN,
    language: import.meta.env.PUBLIC_LANGUAGE,
  };
}

export const rx = Entify.getInstance(getEnvVariables()) as IEntify;

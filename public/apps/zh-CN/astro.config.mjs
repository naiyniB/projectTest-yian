import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";


export default defineConfig({
  site: "https://null",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2025-05-26"),
      entryLimit: 10000,
      filter: (page) => {
        return (
          !page.includes("/api/") &&
          !page.endsWith("/search/") &&
          !page.endsWith("/thanks/") &&
          !page.endsWith("/500/")
        );
      },
      serialize(item) {
        return item;
      },
    }),
  ],
  output: "static",
  adapter: node({
    mode: "standalone", // 使用独立模式
  }), // 使用 Node.js 适配器
  redirects: {

  },

});

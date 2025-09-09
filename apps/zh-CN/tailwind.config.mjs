

export default {
  darkMode: "class", // 使用class策略来控制暗色模式
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "node_modules/@rxdrag/website-lib/src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@rxdrag/website-lib-core/src/**/*.{js,ts,jsx,tsx}",
    "node_modules/theme/src/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: theme,
  plugins: [
    //这个需要生成代码时插入，预览时从cdn加载
    require("@tailwindcss/typography"),
    function ({ addVariant }) {
      addVariant("sticky", ".sticky &");
      addVariant("scrolled", ".scrolled &");
      addVariant("open", [".open&", ".open &"]);
      addVariant("actived", [".actived&", ".actived &"]);
      addVariant("disabled", [".disabled&", ".disabled &"]);
      addVariant("selected", [".selected&", ".selected &"]);
    },
  ],
};


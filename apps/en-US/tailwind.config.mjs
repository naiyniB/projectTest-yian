const theme = {
  extend: {
    colors: {
      // 主题色系 - 使用数字表示深浅度
      primary: {
        50: "var(--primary-50)",
        100: "var(--primary-100)",
        200: "var(--primary-200)",
        300: "var(--primary-300)",
        400: "var(--primary-400)",
        500: "var(--primary-500)",
        600: "var(--primary-600)",
        700: "var(--primary-700)",
        800: "var(--primary-800)",
        900: "var(--primary-900)",
        950: "var(--primary-950)",
        DEFAULT: "var(--primary-500)", // 默认使用 500 级别
      },

      // 次要色系
      secondary: {
        50: "var(--secondary-50)",
        100: "var(--secondary-100)",
        200: "var(--secondary-200)",
        300: "var(--secondary-300)",
        400: "var(--secondary-400)",
        500: "var(--secondary-500)",
        600: "var(--secondary-600)",
        700: "var(--secondary-700)",
        800: "var(--secondary-800)",
        900: "var(--secondary-900)",
        950: "var(--secondary-950)",
        DEFAULT: "var(--secondary-500)",
      },

      // 强调色系
      accent: {
        50: "var(--accent-50)",
        100: "var(--accent-100)",
        200: "var(--accent-200)",
        300: "var(--accent-300)",
        400: "var(--accent-400)",
        500: "var(--accent-500)",
        600: "var(--accent-600)",
        700: "var(--accent-700)",
        800: "var(--accent-800)",
        900: "var(--accent-900)",
        950: "var(--accent-950)",
        DEFAULT: "var(--accent-500)",
      },

      // 中性色系 - 用于背景、文本等
      neutral: {
        50: "var(--neutral-50)",
        100: "var(--neutral-100)",
        200: "var(--neutral-200)",
        300: "var(--neutral-300)",
        400: "var(--neutral-400)",
        500: "var(--neutral-500)",
        600: "var(--neutral-600)",
        700: "var(--neutral-700)",
        800: "var(--neutral-800)",
        900: "var(--neutral-900)",
        950: "var(--neutral-950)",
        DEFAULT: "var(--neutral-500)",
      },

      // 功能色系 - 成功
      success: {
        50: "var(--success-50)",
        100: "var(--success-100)",
        200: "var(--success-200)",
        300: "var(--success-300)",
        400: "var(--success-400)",
        500: "var(--success-500)",
        600: "var(--success-600)",
        700: "var(--success-700)",
        800: "var(--success-800)",
        900: "var(--success-900)",
        950: "var(--success-950)",
        DEFAULT: "var(--success-500)",
      },

      // 功能色系 - 警告
      warning: {
        50: "var(--warning-50)",
        100: "var(--warning-100)",
        200: "var(--warning-200)",
        300: "var(--warning-300)",
        400: "var(--warning-400)",
        500: "var(--warning-500)",
        600: "var(--warning-600)",
        700: "var(--warning-700)",
        800: "var(--warning-800)",
        900: "var(--warning-900)",
        950: "var(--warning-950)",
        DEFAULT: "var(--warning-500)",
      },

      // 功能色系 - 危险
      danger: {
        50: "var(--danger-50)",
        100: "var(--danger-100)",
        200: "var(--danger-200)",
        300: "var(--danger-300)",
        400: "var(--danger-400)",
        500: "var(--danger-500)",
        600: "var(--danger-600)",
        700: "var(--danger-700)",
        800: "var(--danger-800)",
        900: "var(--danger-900)",
        950: "var(--danger-950)",
        DEFAULT: "var(--danger-500)",
      },

      // 功能色系 - 信息
      info: {
        50: "var(--info-50)",
        100: "var(--info-100)",
        200: "var(--info-200)",
        300: "var(--info-300)",
        400: "var(--info-400)",
        500: "var(--info-500)",
        600: "var(--info-600)",
        700: "var(--info-700)",
        800: "var(--info-800)",
        900: "var(--info-900)",
        950: "var(--info-950)",
        DEFAULT: "var(--info-500)",
      },

      // 表面色系 - 统一背景色定义
      surface: {
        base: "var(--surface-base)", // 基础表面（页面背景）
        card: "var(--surface-card)", // 卡片表面
        popover: "var(--surface-popover)", // 弹出层表面
        overlay: "var(--surface-overlay)", // 覆盖层表面
        modal: "var(--surface-modal)", // 模态框表面
        subtle: "var(--surface-subtle)", // 轻微的背景，用于分隔区域
        muted: "var(--surface-muted)", // 柔和的背景，降低视觉强度
        emphasis: "var(--surface-emphasis)", // 强调背景，用于引起注意
        DEFAULT: "var(--surface-base)",
      },

      // 文本颜色
      foreground: {
        primary: "var(--foreground-primary)", // 主要文本颜色，用于标题和重要内容
        secondary: "var(--foreground-secondary)", // 次要文本颜色，用于次要内容
        tertiary: "var(--foreground-tertiary)", // 三级文本颜色，用于辅助信息
        disabled: "var(--foreground-disabled)", // 禁用状态文本颜色
        inverse: "var(--foreground-inverse)", // 反色文本，通常用于深色背景上的文本
        hover: "var(--foreground-hover)",
        DEFAULT: "var(--foreground-primary)", // 默认使用主要文本颜色
      },

      // 链接颜色
      link: {
        DEFAULT: "var(--link-default)", // 默认链接颜色
        hover: "var(--link-hover)", // 悬停状态
        active: "var(--link-active)", // 激活状态
        visited: "var(--link-visited)", // 已访问状态
      },

      header: {
        sticky: "var(--header-sticky)",
        DEFAULT: "var(--header-default)",
      },
      footer: {
        DEFAULT: "var(--footer-default)",
      },
      // 边框颜色 - 使用语义化命名
      divider: {
        DEFAULT: "var(--divider-default)", // 默认边框
        subtle: "var(--divider-subtle)", // 轻微边框，低对比度
        muted: "var(--divider-muted)", // 柔和边框
        emphasis: "var(--divider-emphasis)", // 强调边框
        focus: "var(--divider-focus)", // 聚焦边框
        // 注意：功能性边框可以直接使用 border-danger-500 等方式引用功能色系
      },
    },

    // 阴影大小
    boxShadow: {
      sm: "var(--shadow-sm)",
      DEFAULT: "var(--shadow)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      xl: "var(--shadow-xl)",
      "2xl": "var(--shadow-2xl)",
      inner: "var(--shadow-inner)",
      none: "none",
    },

    // 字体
    fontFamily: {
      sans: [
        "var(--font-sans)",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
      ],
      serif: [
        "var(--font-serif)",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      mono: [
        "var(--font-mono)",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
  },
}

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


# 测试demo



这是一个使用pnpm和Turborepo管理的多语言Astro项目。每种语言对应一个子项目，共享相同的组件和配置。

## 项目结构

```
kingnod/
├── apps/              # 各语言的Astro应用
│   ├── zh-CN/            # 中文站点
│   ├── en-US/            # 英文站点
│   └── ...            # 其他语言站点
├── packages/          # 共享包
│   ├── eslint-config-custom/        # 共享配置
│   └── theme/         # 共享UI组件和主题
├── package.json       # 工作空间配置
├── pnpm-workspace.yaml # pnpm工作空间配置
└── turbo.json         # Turborepo配置
```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 开发所有应用
pnpm dev

# 开发特定语言的应用
pnpm dev --filter=en-US
```

### 构建

```bash
# 构建所有应用
pnpm build

# 构建特定语言的应用
pnpm build --filter=en-US
```

## 添加新语言

1. 在`apps`目录下创建新的语言目录
2. 复制现有语言项目的结构
3. 修改内容和配置以适应新语言

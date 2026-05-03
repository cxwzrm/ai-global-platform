# 🔐 Vercel Token 获取指南

## 什么是 Vercel Token？

Vercel Token 用于通过 API 访问 Vercel，允许脚本自动创建项目、配置环境变量、触发部署等操作。

---

## 获取 Vercel Token 的步骤

### 方法一：通过 Vercel 网页（推荐）

#### 步骤 1：登录 Vercel

1. 访问 https://vercel.com
2. 点击右上角 **Login** 或使用 GitHub 登录

#### 步骤 2：进入设置

1. 点击右上角头像
2. 选择 **Settings**

#### 步骤 3：创建 Token

1. 点击左侧菜单 **Tokens**
2. 点击 **Create Token**

#### 步骤 4：配置 Token

```
Name: AI Industrial Platform Deploy
Scope: Full Account (或选择特定范围)
Expiration: 根据需要设置
```

#### 步骤 5：生成并保存 Token

1. 点击 **Create**
2. ⚠️ **重要**：立即复制 Token 并保存，它只会显示一次！

---

## Vercel CLI 获取 Token

### 安装 Vercel CLI

```bash
# npm
npm install -g vercel

# 或使用 npx
npx vercel login
```

### 通过 CLI 登录

```bash
# 交互式登录
vercel login

# 登录后查看 Token
vercel tokens list
```

### 创建 Token

```bash
vercel tokens create "AI Industrial Platform"
```

---

## Vercel API 调用示例

### 1. 获取账户信息

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  https://api.vercel.com/v1/user
```

### 2. 创建项目

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.vercel.com/v1/projects \
  -d '{
    "name": "ai-global-platform",
    "framework": "nextjs",
    "gitSource": {
      "type": "github",
      "repo": "YOUR_USERNAME/ai-global-platform"
    }
  }'
```

### 3. 添加环境变量

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.vercel.com/v1/projects/PROJECT_ID/env \
  -d '{
    "key": "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "value": "t8o1zoqj",
    "target": ["production", "preview", "development"]
  }'
```

### 4. 触发部署

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  https://api.vercel.com/v1/projects/PROJECT_ID/deployments
```

---

## Token 类型说明

| 类型 | 权限范围 |
|------|----------|
| Full Account | 访问所有项目 |
| Teams | 访问特定团队 |
| Project | 仅访问特定项目 |

---

## 安全提示

⚠️ **重要**：
1. 不要将 Token 提交到 Git
2. 使用环境变量存储 Token
3. 设置合理的过期时间
4. 定期更换 Token

---

**Token 格式示例**：
```
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 权限说明

| 权限 | 用途 |
|------|------|
| projects:read | 读取项目信息 |
| projects:write | 创建和更新项目 |
| deployments:read | 读取部署信息 |
| deployments:write | 创建和管理部署 |
| env:read | 读取环境变量 |
| env:write | 创建和更新环境变量 |

---

**下一步**：运行自动化部署脚本 → 查看 `./deploy.sh`

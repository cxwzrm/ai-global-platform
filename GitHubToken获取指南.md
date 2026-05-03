# 🔐 GitHub Token 获取指南

## 什么是 GitHub Token？

GitHub Token 是一种用于通过 API 访问 GitHub 的凭证，允许脚本自动创建仓库、推送代码等操作。

---

## 获取 GitHub Token 的步骤

### 方法一：通过 GitHub 网页（推荐）

#### 步骤 1：登录 GitHub

1. 访问 https://github.com
2. 点击右上角头像 → **Settings**（设置）

#### 步骤 2：进入开发者设置

1. 在左侧菜单底部点击 **Developer settings**
2. 点击 **Personal access tokens** → **Tokens (classic)**

#### 步骤 3：生成新 Token

1. 点击 **Generate new token** → **Generate new token (classic)**
2. 填写以下信息：

```
Note: AI Industrial Platform Deployment
Expiration: 30 days (或根据需要)
```

#### 步骤 4：选择权限范围

勾选以下权限（必选）：

- ☑️ **repo** - 完全控制私有仓库
  - ☑️ repo:status - 提交状态
  - ☑️ repo_deployment - 部署状态
  - ☑️ public_repo - 完全控制公共仓库
  - ☑️ repo_invite - 仓库邀请
- ☑️ **workflow** - 更新 GitHub Actions 工作流

#### 步骤 5：生成并保存 Token

1. 点击 **Generate token**
2. ⚠️ **重要**：立即复制 Token 并保存，它只会显示一次！

---

## 使用 GitHub CLI (gh)

### 安装 GitHub CLI

```bash
# macOS
brew install gh

# Linux
brew install gh

# Windows
winget install GitHub.cli
```

### 通过 CLI 登录

```bash
gh auth login
```

### 通过 CLI 生成 Token

```bash
gh auth token --scopes repo,workflow
```

---

## GitHub API 调用示例

### 创建仓库

```bash
# 使用 curl
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "ai-global-platform",
    "description": "AI Industrial Platform - Global Laser Equipment E-commerce",
    "private": false,
    "auto_init": false
  }'
```

### 推送代码

```bash
# 添加远程并推送
git remote add origin https://github.com/YOUR_USERNAME/ai-global-platform.git
git push -u origin master
```

---

## 权限说明

| 权限 | 用途 |
|------|------|
| repo | 创建和管理仓库 |
| workflow | 管理 GitHub Actions |
| read:user | 读取用户信息 |

---

## 安全提示

⚠️ **重要**：
1. 不要将 Token 提交到 Git
2. 使用环境变量存储 Token
3. 定期更换 Token
4. 设置过期时间

---

**Token 格式示例**：
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

**下一步**：获取 Vercel Token → 查看 `./VercelToken获取指南.md`

# 🚀 AI Industrial Platform - Vercel 部署指南

## 📋 目录

1. [快速开始](#快速开始)
2. [方式一：全自动部署（一键脚本）](#方式一全自动部署一键脚本)
3. [方式二：半自动部署（手动操作）](#方式二半自动部署手动操作)
4. [Token 获取指南](#token-获取指南)
5. [环境变量配置](#环境变量配置)
6. [域名配置](#域名配置)
7. [部署验证](#部署验证)
8. [常见问题](#常见问题)

---

## 快速开始

你有两种方式完成部署：

| 方式 | 自动化程度 | 需要手动操作 | 推荐场景 |
|------|-----------|-------------|---------|
| **全自动部署** | ⭐⭐⭐⭐⭐ | 仅提供2个Token | 技术人员、快速部署 |
| **半自动部署** | ⭐⭐⭐ | 需要约15分钟手动操作 | 非技术人员 |

---

## 方式一：全自动部署（一键脚本）⭐ 推荐

只需提供两个 Token，执行一个脚本即可完成全部部署！

### 步骤 1：获取 Token

#### 获取 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写 Note: `AI Industrial Platform`
4. 勾选权限: `repo` (完全控制仓库)
5. 点击 **Generate token**
6. ⚠️ **立即复制保存！**

#### 获取 Vercel Token

1. 访问 https://vercel.com/account/tokens
2. 点击 **Create Token**
3. 填写 Name: `AI Industrial Platform`
4. 设置过期时间
5. 点击 **Create**
6. ⚠️ **立即复制保存！**

### 步骤 2：设置 Token

```bash
# 方式 A：环境变量（推荐）
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
export VERCEL_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxx"

# 方式 B：直接运行脚本（会提示输入）
./deploy.sh
```

### 步骤 3：运行部署脚本

```bash
# 进入项目目录
cd ai-global-platform

# 设置执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

### 脚本会完成以下操作：

```
✅ 1. 检查前置条件（Git、curl等）
✅ 2. 验证 Token 有效性
✅ 3. 创建 GitHub 仓库
✅ 4. 推送代码到 GitHub
✅ 5. 创建 Vercel 项目
✅ 6. 配置所有环境变量
✅ 7. 触发首次部署
✅ 8. 等待部署完成
```

### 部署成功后，你会看到：

```
🎉 部署完成!

📦 项目信息
  GitHub 仓库: https://github.com/YOUR_USERNAME/ai-global-platform
  Vercel 项目: https://vercel.com/dashboard

🌐 访问地址
  Vercel: https://ai-global-platform.vercel.app
```

---

## 方式二：半自动部署（手动操作）

如果不想使用脚本，可以手动完成以下步骤：

### 步骤 1：创建 GitHub 仓库

#### 1.1 登录 GitHub

访问 https://github.com 并登录

#### 1.2 创建新仓库

1. 点击右上角 **+** → **New repository**
2. 填写信息：

```
Repository name: ai-global-platform
Description: AI Industrial Platform - Global Laser Equipment E-commerce
Visibility: Public
```

3. ⚠️ **不要勾选** "Add a README file"
4. 点击 **Create repository**

#### 1.3 获取仓库 URL

创建成功后，复制仓库 URL，格式如：
```
https://github.com/YOUR_USERNAME/ai-global-platform.git
```

### 步骤 2：推送代码

```bash
# 进入项目目录
cd ai-global-platform

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/ai-global-platform.git

# 推送代码
git push -u origin master
```

### 步骤 3：导入 Vercel

#### 3.1 登录 Vercel

访问 https://vercel.com 并登录（推荐使用 GitHub 登录）

#### 3.2 创建项目

1. 点击 **Add New...** → **Project**
2. 在列表中找到 `ai-global-platform`
3. 点击 **Import**

#### 3.3 配置项目

在配置页面设置：

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
```

#### 3.4 添加环境变量

点击 **Environment Variables**，添加以下变量：

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `t8o1zoqj` | All |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | All |
| `NEXT_PUBLIC_SITE_NAME` | `AI Industrial Platform` | All |
| `SANITY_API_TOKEN` | `sklEXEOrg6NEHJAxlkGjTraa9zGXD8fZAukkFMMCTfgOZen4MP22vfe0J02tTy2j7D7WBA4VTk1YXvHIdazdtehkt36xJ8gY6cssqD9DhoWxOSamiVwjB4dEkXjMrRp8hWXTWxcAGNEljU9RcRmu30UhXYentAYhpays7cvat1rOEfY9VlHi` | All |

#### 3.5 部署

1. 点击 **Deploy**
2. 等待 2-5 分钟
3. 部署成功后会显示预览 URL

---

## Token 获取指南

### GitHub Token（详细步骤）

详见文档: `./GitHubToken获取指南.md`

快速步骤：

1. 访问 https://github.com/settings/tokens
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. 点击 **Generate new token**
4. 勾选 `repo` 权限
5. 生成并保存 Token

### Vercel Token（详细步骤）

详见文档: `./VercelToken获取指南.md`

快速步骤：

1. 访问 https://vercel.com/account/tokens
2. 点击 **Create Token**
3. 填写名称和过期时间
4. 生成并保存 Token

---

## 环境变量配置

### 必需的环境变量

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `t8o1zoqj` | Sanity 项目 ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity 数据集 |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | API 版本 |
| `NEXT_PUBLIC_SITE_NAME` | `AI Industrial Platform` | 站点名称 |

### 可选的环境变量

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `SANITY_API_TOKEN` | `sklEXEOrg6NEHJA...` | Sanity 编辑 Token |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | 站点 URL（配置域名后更新） |

---

## 域名配置

### 使用 Vercel 分配的域名

部署成功后，Vercel 会分配一个域名：
```
https://ai-global-platform.vercel.app
```

### 添加自定义域名

#### 1. 在 Vercel 中添加

1. 进入项目 → **Settings** → **Domains**
2. 输入你的域名（如 `aiindustrial.com`）
3. 点击 **Add**
4. Vercel 会显示 DNS 配置记录

#### 2. 在域名注册商处配置

根据 Vercel 提供的记录添加：

```
类型    名称    值
A       @      76.76.21.21
CNAME   www    cname.vercel-dns.com
```

#### 3. 验证配置

在 Vercel 中点击 **Check DNS Configuration**

---

## 部署验证

### 1. 基础验证

| 检查项 | 预期结果 |
|--------|---------|
| 首页加载 | 正常显示 Hero、Features 等模块 |
| 产品列表 | 显示 8 个产品 |
| 多语言切换 | EN/DE/ES/FR/IT/NL 正常切换 |
| 产品详情页 | 点击产品能正常打开详情 |
| 联系表单 | 表单可填写和提交 |

### 2. 技术验证

```bash
# 测试 Sanity API
curl "https://t8o1zoqj.api.sanity.io/v2024-01-01/data/query/production?query=count(*)"

# 应返回: {"result":8} 表示 8 个产品
```

### 3. 性能测试

访问 https://pagespeed.web.dev/ 进行 Lighthouse 测试

---

## 常见问题

### Q1: 部署脚本失败？

**检查项**：
1. Token 是否正确
2. Token 权限是否足够
3. GitHub 仓库是否已存在（脚本会跳过）

### Q2: 页面空白或 500 错误？

**原因**：环境变量未配置
**解决**：检查 Vercel 中的环境变量是否完整

### Q3: 多语言不工作？

**检查**：
1. middleware.ts 是否存在
2. messages/ 文件夹是否完整

### Q4: 如何重新部署？

```bash
# 在 Vercel 仪表板中
# 1. 进入项目
# 2. 点击 Deployments
# 3. 选择版本
# 4. 点击 Redeploy
```

### Q5: 如何查看部署日志？

在 Vercel 项目页面点击具体部署，会显示完整的构建日志。

---

## 快速检查清单

### 全自动部署检查

- [ ] GitHub Token 已获取
- [ ] Vercel Token 已获取
- [ ] 运行 `./deploy.sh`
- [ ] 部署成功

### 半自动部署检查

- [ ] GitHub 仓库已创建
- [ ] 代码已推送
- [ ] Vercel 账号已登录
- [ ] 项目已导入
- [ ] 环境变量已配置
- [ ] 部署成功

---

## 下一步

部署完成后：

1. **访问网站** - 确认正常运行
2. **配置域名** - 添加自定义域名
3. **管理内容** - 使用 Sanity Studio
4. **性能优化** - 配置 CDN 和缓存

### Sanity Studio 访问

```bash
cd ai-global-platform
npm run sanity
# 访问 http://localhost:3333
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| `./GitHubToken获取指南.md` | GitHub Token 获取详细步骤 |
| `./VercelToken获取指南.md` | Vercel Token 获取详细步骤 |
| `./deploy.sh` | 一键部署脚本 |
| `./环境变量清单.md` | 完整环境变量列表 |
| `./快速启动指南.md` | 开发环境启动步骤 |

---

**文档版本：** 2.0
**更新内容：** 添加全自动部署脚本支持
**最后更新：** 2024-05-03

#!/bin/bash

# ╔═══════════════════════════════════════════════════════════════════════════╗
# ║                                                                           ║
# ║     🚀 AI Industrial Platform - 一键自动化部署脚本                          ║
# ║                                                                           ║
# ║     功能:                                                                 ║
# ║     1. 创建 GitHub 仓库                                                   ║
# ║     2. 推送代码到 GitHub                                                  ║
# ║     3. 创建 Vercel 项目                                                   ║
# ║     4. 配置环境变量                                                       ║
# ║     5. 触发部署                                                           ║
# ║                                                                           ║
# ║     使用前提:                                                             ║
# ║     - GitHub Token (获取: https://github.com/settings/tokens)              ║
# ║     - Vercel Token (获取: https://vercel.com/account/tokens)             ║
# ║                                                                           ║
# ╚═══════════════════════════════════════════════════════════════════════════╝

set -e

# ════════════════════════════════════════════════════════════════════════════
# 颜色定义
# ════════════════════════════════════════════════════════════════════════════
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ════════════════════════════════════════════════════════════════════════════
# 配置
# ════════════════════════════════════════════════════════════════════════════
REPO_NAME="ai-global-platform"
REPO_DESCRIPTION="AI Industrial Platform - Global Laser Equipment E-commerce"
GITHUB_ORG=""

# ════════════════════════════════════════════════════════════════════════════
# 环境变量
# ════════════════════════════════════════════════════════════════════════════
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
VERCEL_TOKEN="${VERCEL_TOKEN:-}"

# ════════════════════════════════════════════════════════════════════════════
# Sanity 配置
# ════════════════════════════════════════════════════════════════════════════
SANITY_PROJECT_ID="t8o1zoqj"
SANITY_DATASET="production"
SANITY_API_VERSION="2024-01-01"
SANITY_API_TOKEN="sklEXEOrg6NEHJAxlkGjTraa9zGXD8fZAukkFMMCTfgOZen4MP22vfe0J02tTy2j7D7WBA4VTk1YXvHIdazdtehkt36xJ8gY6cssqD9DhoWxOSamiVwjB4dEkXjMrRp8hWXTWxcAGNEljU9RcRmu30UhXYentAYhpays7cvat1rOEfY9VlHi"

# ════════════════════════════════════════════════════════════════════════════
# 辅助函数
# ════════════════════════════════════════════════════════════════════════════

print_header() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ════════════════════════════════════════════════════════════════════════════
# 检查前置条件
# ════════════════════════════════════════════════════════════════════════════

check_prerequisites() {
    print_header "检查前置条件"
    
    # 检查 Git
    if command -v git &> /dev/null; then
        print_success "Git 已安装: $(git --version)"
    else
        print_error "Git 未安装，请先安装 Git"
        exit 1
    fi
    
    # 检查 curl
    if command -v curl &> /dev/null; then
        print_success "curl 已安装"
    else
        print_error "curl 未安装"
        exit 1
    fi
    
    # 检查 jq (用于 JSON 解析)
    if command -v jq &> /dev/null; then
        print_success "jq 已安装"
    else
        print_warning "jq 未安装，将尝试安装..."
        if command -v apt-get &> /dev/null; then
            apt-get update && apt-get install -y jq
        elif command -v brew &> /dev/null; then
            brew install jq
        else
            print_warning "无法自动安装 jq，部分功能可能受限"
        fi
    fi
    
    # 检查 Git 仓库
    if [ -d ".git" ]; then
        print_success "Git 仓库已初始化"
    else
        print_error "当前目录不是 Git 仓库"
        exit 1
    fi
    
    # 检查 package.json
    if [ -f "package.json" ]; then
        print_success "package.json 存在"
    else
        print_error "package.json 不存在"
        exit 1
    fi
}

# ════════════════════════════════════════════════════════════════════════════
# 获取 Token
# ════════════════════════════════════════════════════════════════════════════

get_tokens() {
    print_header "获取访问凭证"
    
    # 获取 GitHub Token
    if [ -z "$GITHUB_TOKEN" ]; then
        echo ""
        echo -e "${YELLOW}请提供 GitHub Token${NC}"
        echo -e "获取方式: ${BLUE}https://github.com/settings/tokens${NC}"
        echo -e "需要权限: ${CYAN}repo (完全控制仓库)${NC}"
        echo ""
        read -p "请输入 GitHub Token (ghp_xxx): " GITHUB_TOKEN
    fi
    
    if [ -z "$GITHUB_TOKEN" ]; then
        print_error "GitHub Token 不能为空"
        exit 1
    fi
    
    # 获取 GitHub 用户名
    echo ""
    print_info "获取 GitHub 用户信息..."
    GITHUB_USER=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        https://api.github.com/user | jq -r '.login' 2>/dev/null || echo "")
    
    if [ -z "$GITHUB_USER" ] || [ "$GITHUB_USER" = "null" ]; then
        print_error "无法获取 GitHub 用户信息，请检查 Token"
        exit 1
    fi
    
    print_success "GitHub 用户: $GITHUB_USER"
    
    # 获取 Vercel Token
    if [ -z "$VERCEL_TOKEN" ]; then
        echo ""
        echo -e "${YELLOW}请提供 Vercel Token${NC}"
        echo -e "获取方式: ${BLUE}https://vercel.com/account/tokens${NC}"
        echo ""
        read -p "请输入 Vercel Token: " VERCEL_TOKEN
    fi
    
    if [ -z "$VERCEL_TOKEN" ]; then
        print_error "Vercel Token 不能为空"
        exit 1
    fi
    
    # 验证 Vercel Token
    echo ""
    print_info "验证 Vercel Token..."
    VERCEL_USER=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
        https://api.vercel.com/v1/user | jq -r '.name // .email // .username // "invalid"' 2>/dev/null)
    
    if [ "$VERCEL_USER" = "invalid" ] || [ -z "$VERCEL_USER" ]; then
        print_error "Vercel Token 无效"
        exit 1
    fi
    
    print_success "Vercel 用户: $VERCEL_USER"
}

# ════════════════════════════════════════════════════════════════════════════
# GitHub 操作
# ════════════════════════════════════════════════════════════════════════════

create_github_repo() {
    print_header "创建 GitHub 仓库"
    
    # 检查仓库是否已存在
    REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")
    
    if [ "$REPO_CHECK" = "200" ]; then
        print_warning "仓库 $GITHUB_USER/$REPO_NAME 已存在，跳过创建"
        REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"
    else
        # 创建仓库
        print_info "正在创建 GitHub 仓库..."
        
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Authorization: token $GITHUB_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.github.com/user/repos" \
            -d "{
                \"name\": \"$REPO_NAME\",
                \"description\": \"$REPO_DESCRIPTION\",
                \"private\": false,
                \"auto_init\": false,
                \"has_issues\": true,
                \"has_wiki\": false
            }")
        
        HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
        RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')
        
        if [ "$HTTP_CODE" = "201" ]; then
            REPO_URL=$(echo "$RESPONSE_BODY" | jq -r '.clone_url')
            print_success "GitHub 仓库创建成功!"
            print_info "仓库地址: $REPO_URL"
        else
            ERROR_MSG=$(echo "$RESPONSE_BODY" | jq -r '.message // "Unknown error"')
            print_error "创建仓库失败: $ERROR_MSG"
            exit 1
        fi
    fi
    
    # 配置远程仓库
    print_info "配置 Git 远程仓库..."
    git remote set-url origin "$REPO_URL" 2>/dev/null || \
        git remote add origin "$REPO_URL"
    
    print_success "远程仓库已配置"
}

# ════════════════════════════════════════════════════════════════════════════
# 推送代码
# ════════════════════════════════════════════════════════════════════════════

push_to_github() {
    print_header "推送代码到 GitHub"
    
    # 确保所有更改已提交
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "有未提交的更改，正在自动提交..."
        git add -A
        git commit -m "Auto-commit before deployment - $(date +'%Y-%m-%d %H:%M:%S')"
    fi
    
    # 推送代码
    print_info "正在推送代码..."
    
    # 使用 Token 推送（避免需要输入密码）
    GIT_URL_WITH_TOKEN=$(echo "$REPO_URL" | sed "s|https://|https://$GITHUB_TOKEN@|")
    
    if git push -u "$GIT_URL_WITH_TOKEN" master 2>&1; then
        print_success "代码推送成功!"
    else
        # 尝试使用 SSH 方式
        print_info "尝试 SSH 方式推送..."
        git remote set-url origin "git@github.com:$GITHUB_USER/$REPO_NAME.git"
        if git push -u origin master 2>&1; then
            print_success "SSH 推送成功!"
        else
            print_error "代码推送失败"
            print_info "请手动执行: git push -u origin master"
            exit 1
        fi
    fi
}

# ════════════════════════════════════════════════════════════════════════════
# Vercel 操作
# ════════════════════════════════════════════════════════════════════════════

create_vercel_project() {
    print_header "创建 Vercel 项目"
    
    # 检查项目是否已存在
    print_info "检查 Vercel 项目..."
    
    PROJECT_CHECK=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
        "https://api.vercel.com/v1/projects?name=$REPO_NAME" | jq -r '.projects[0].id // empty')
    
    if [ -n "$PROJECT_CHECK" ]; then
        print_warning "Vercel 项目已存在: $PROJECT_CHECK"
        PROJECT_ID="$PROJECT_CHECK"
    else
        # 创建项目
        print_info "正在创建 Vercel 项目..."
        
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
            -H "Authorization: Bearer $VERCEL_TOKEN" \
            -H "Content-Type: application/json" \
            "https://api.vercel.com/v1/projects" \
            -d "{
                \"name\": \"$REPO_NAME\",
                \"framework\": \"nextjs\",
                \"gitSource\": {
                    \"type\": \"github\",
                    \"repo\": \"$GITHUB_USER/$REPO_NAME\",
                    \"org\": \"$GITHUB_USER\"
                }
            }")
        
        HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
        RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')
        
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
            PROJECT_ID=$(echo "$RESPONSE_BODY" | jq -r '.id')
            print_success "Vercel 项目创建成功!"
            print_info "项目 ID: $PROJECT_ID"
        else
            ERROR_MSG=$(echo "$RESPONSE_BODY" | jq -r '.error.message // .message // "Unknown error"')
            print_error "创建 Vercel 项目失败: $ERROR_MSG"
            print_info "将在手动模式下继续..."
            return 1
        fi
    fi
}

# ════════════════════════════════════════════════════════════════════════════
# 配置环境变量
# ════════════════════════════════════════════════════════════════════════════

configure_env_vars() {
    print_header "配置环境变量"
    
    # 环境变量列表
    ENV_VARS=(
        "NEXT_PUBLIC_SANITY_PROJECT_ID|$SANITY_PROJECT_ID"
        "NEXT_PUBLIC_SANITY_DATASET|$SANITY_DATASET"
        "NEXT_PUBLIC_SANITY_API_VERSION|$SANITY_API_VERSION"
        "NEXT_PUBLIC_SITE_NAME|AI Industrial Platform"
    )
    
    for VAR in "${ENV_VARS[@]}"; do
        KEY="${VAR%%|*}"
        VALUE="${VAR##*|}"
        
        print_info "配置 $KEY..."
        
        # 检查是否已存在
        EXISTS=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
            "https://api.vercel.com/v1/projects/$PROJECT_ID/env?key=$KEY" | \
            jq -r 'if .envs[0] then .envs[0].id else empty end')
        
        if [ -n "$EXISTS" ]; then
            # 更新
            curl -s -X PATCH \
                -H "Authorization: Bearer $VERCEL_TOKEN" \
                -H "Content-Type: application/json" \
                "https://api.vercel.com/v1/projects/$PROJECT_ID/env/$EXISTS" \
                -d "{\"value\": \"$VALUE\"}" > /dev/null
        else
            # 创建
            curl -s -X POST \
                -H "Authorization: Bearer $VERCEL_TOKEN" \
                -H "Content-Type: application/json" \
                "https://api.vercel.com/v1/projects/$PROJECT_ID/env" \
                -d "{
                    \"key\": \"$KEY\",
                    \"value\": \"$VALUE\",
                    \"target\": [\"production\", \"preview\", \"development\"]
                }" > /dev/null
        fi
        
        print_success "$KEY 已配置"
    done
    
    # 配置可选变量（如果提供）
    if [ -n "$SANITY_API_TOKEN" ]; then
        print_info "配置 SANITY_API_TOKEN..."
        EXISTS=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
            "https://api.vercel.com/v1/projects/$PROJECT_ID/env?key=SANITY_API_TOKEN" | \
            jq -r 'if .envs[0] then .envs[0].id else empty end')
        
        if [ -n "$EXISTS" ]; then
            curl -s -X PATCH \
                -H "Authorization: Bearer $VERCEL_TOKEN" \
                -H "Content-Type: application/json" \
                "https://api.vercel.com/v1/projects/$PROJECT_ID/env/$EXISTS" \
                -d "{\"value\": \"$SANITY_API_TOKEN\"}" > /dev/null
        else
            curl -s -X POST \
                -H "Authorization: Bearer $VERCEL_TOKEN" \
                -H "Content-Type: application/json" \
                "https://api.vercel.com/v1/projects/$PROJECT_ID/env" \
                -d "{
                    \"key\": \"SANITY_API_TOKEN\",
                    \"value\": \"$SANITY_API_TOKEN\",
                    \"target\": [\"production\", \"preview\", \"development\"]
                }" > /dev/null
        fi
        print_success "SANITY_API_TOKEN 已配置"
    fi
}

# ════════════════════════════════════════════════════════════════════════════
# 触发部署
# ════════════════════════════════════════════════════════════════════════════

trigger_deployment() {
    print_header "触发部署"
    
    print_info "正在触发部署..."
    
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json" \
        "https://api.vercel.com/v1/projects/$PROJECT_ID/deployments" \
        -d "{
            \"gitSource\": {
                \"type\": \"github\",
                \"repo\": \"$GITHUB_USER/$REPO_NAME\",
                \"ref\": \"master\"
            }
        }")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [[ "$HTTP_CODE" == "200" || "$HTTP_CODE" == "201" ]]; then
        DEPLOYMENT_ID=$(echo "$RESPONSE_BODY" | jq -r '.id')
        DEPLOYMENT_URL=$(echo "$RESPONSE_BODY" | jq -r '.url')
        DEPLOYMENT_URL="https://$DEPLOYMENT_URL"
        
        print_success "部署已触发!"
        print_info "部署 ID: $DEPLOYMENT_ID"
        print_info "部署 URL: $DEPLOYMENT_URL"
        
        # 等待部署完成
        print_info "等待部署完成（最多 3 分钟）..."
        wait_for_deployment "$DEPLOYMENT_ID"
    else
        ERROR_MSG=$(echo "$RESPONSE_BODY" | jq -r '.error.message // .message // "Unknown error"')
        print_warning "触发部署失败: $ERROR_MSG"
        print_info "请手动在 Vercel 仪表板中触发部署"
        print_info "项目地址: https://vercel.com/dashboard"
    fi
}

# ════════════════════════════════════════════════════════════════════════════
# 等待部署完成
# ════════════════════════════════════════════════════════════════════════════

wait_for_deployment() {
    local DEPLOYMENT_ID="$1"
    local MAX_WAIT=180  # 3分钟
    local WAITED=0
    
    while [ $WAITED -lt $MAX_WAIT ]; do
        sleep 10
        WAITED=$((WAITED + 10))
        
        STATUS=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
            "https://api.vercel.com/v1/deployments/$DEPLOYMENT_ID" | \
            jq -r '.readyState // "READY"')
        
        case "$STATUS" in
            "READY"|"SUCCESS")
                print_success "部署完成!"
                print_info "访问地址: https://$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
                    "https://api.vercel.com/v1/deployments/$DEPLOYMENT_ID" | jq -r '.url')"
                return 0
                ;;
            "ERROR"|"FAILED"|"CANCELED")
                print_error "部署失败，请检查 Vercel 日志"
                return 1
                ;;
            *)
                echo -ne "\r${BLUE}⏳ 等待部署中... ${WAITED}s/${MAX_WAIT}s${NC}"
                ;;
        esac
    done
    
    print_warning "等待超时，请在 Vercel 仪表板查看部署状态"
    print_info "部署 ID: $DEPLOYMENT_ID"
}

# ════════════════════════════════════════════════════════════════════════════
# 显示结果
# ════════════════════════════════════════════════════════════════════════════

show_summary() {
    print_header "🎉 部署完成!"
    
    echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "  ${CYAN}📦 项目信息${NC}"
    echo -e "  GitHub 仓库: ${BLUE}https://github.com/$GITHUB_USER/$REPO_NAME${NC}"
    echo -e "  Vercel 项目: ${BLUE}https://vercel.com/dashboard${NC}"
    echo ""
    echo -e "  ${CYAN}🌐 访问地址${NC}"
    echo -e "  Vercel: ${BLUE}https://$REPO_NAME.vercel.app${NC}"
    echo -e "  (部署可能需要几分钟完成)"
    echo ""
    echo -e "  ${CYAN}🔧 下一步操作${NC}"
    echo "  1. 访问 Vercel 仪表板检查部署状态"
    echo "  2. 配置自定义域名（可选）"
    echo "  3. 访问 Sanity Studio 管理内容"
    echo "     npm run sanity"
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
}

# ════════════════════════════════════════════════════════════════════════════
# 主函数
# ════════════════════════════════════════════════════════════════════════════

main() {
    echo ""
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                                           ║${NC}"
    echo -e "${CYAN}║       🚀 AI Industrial Platform - 一键自动化部署脚本                    ║${NC}"
    echo -e "${CYAN}║                                                                           ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    # 1. 检查前置条件
    check_prerequisites
    
    # 2. 获取 Token
    get_tokens
    
    # 3. 创建 GitHub 仓库
    create_github_repo
    
    # 4. 推送代码
    push_to_github
    
    # 5. 创建 Vercel 项目
    create_vercel_project || {
        print_warning "Vercel 项目创建失败，但 GitHub 仓库已准备就绪"
        print_info "请手动在 https://vercel.com/new 创建项目并导入仓库"
        exit 0
    }
    
    # 6. 配置环境变量
    configure_env_vars
    
    # 7. 触发部署
    trigger_deployment
    
    # 8. 显示结果
    show_summary
}

# 运行主函数
main "$@"

# Frontend Skills 使用计划

基于 Claude Skills 和 skillsmp.com 资源，创建多个高质量、好看的网站。

## 🎯 目标

使用 Claude Skills（特别是 frontend-design 和 artifacts-builder）创建一系列独特、美观、有吸引力的网站，避免 "AI slop"。

## 📚 可用的 Frontend Skills

### 已安装
- ✅ **artifacts-builder** - React + Tailwind + shadcn/ui
  - 位置: `.claude/skills/artifacts-builder/`
  - 已用于: DeepCast 项目

### 待安装（推荐）
- 🔲 **frontend-design** - 高质量前端界面设计
  - 来源: anthropics/skills
  - 重点: 排版、主题、动画、背景

### 社区 Skills（skillsmp.com）
- 🔲 **react-modernization** - React 现代化
- 🔲 **modern-javascript-patterns** - ES6+ 最佳实践
- 🔲 **javascript-testing-patterns** - 测试最佳实践

## 🎨 设计原则（避免 AI Slop）

### 1. 排版（Typography）
**避免**:
- ❌ Inter 字体
- ❌ Roboto 字体
- ❌ 单一字体

**推荐**:
- ✅ Playfair Display（优雅衬线）
- ✅ Space Grotesk（现代无衬线）
- ✅ 高对比度字体配对
- ✅ 极端字重变化（thin + black）

### 2. 色彩与主题
**避免**:
- ❌ 紫色渐变 + 白色背景
- ❌ 平均分布的颜色
- ❌ 无主题性的设计

**推荐**:
- ✅ 强烈的主导色 + 锐利的强调色
- ✅ 连贯的美学主题（RPG 风格、编辑风格等）
- ✅ 深思熟虑的配色方案

### 3. 动画与运动
**避免**:
- ❌ 最小化动画
- ❌ 零散的微交互

**推荐**:
- ✅ 精心编排的页面加载序列
- ✅ 交错显示（animation-delay）
- ✅ 高影响力的关键时刻动画

### 4. 背景
**避免**:
- ❌ 纯白色背景
- ❌ 单一颜色

**推荐**:
- ✅ 分层渐变
- ✅ 图案叠加
- ✅ 大气深度感

## 🚀 项目规划

### 项目 1: DeepCast（已完成）✅
- **类型**: 产品宣传页
- **风格**: 苹果现代风格
- **特点**:
  - 清晰的价值主张
  - 交互式演示
  - 邮箱收集表单
- **状态**: 完成 ✅

### 项目 2: 个人作品集网站
**目标**: 展示项目和技能的作品集

**设计方向**:
- **主题**: 编辑/杂志风格
- **排版**: Playfair Display + Inter
- **色彩**: 黑白为主 + 金色强调
- **动画**: 页面切换过渡 + 滚动视差

**页面结构**:
1. Hero - 大字标题 + 照片
2. 项目展示 - 网格布局 + 悬停效果
3. 技能列表 - 标签云
4. 关于我 - 时间线
5. 联系方式 - 简洁表单

**技术栈**:
- artifacts-builder + frontend-design
- React + TypeScript
- Framer Motion（动画）
- 单页应用（SPA）

---

### 项目 3: SaaS 产品登陆页
**目标**: 高转化率的 SaaS 产品页面

**设计方向**:
- **主题**: 科技未来感
- **排版**: Space Grotesk + Courier New（代码）
- **色彩**: 深蓝 + 霓虹青色 + 电光紫
- **动画**: 代码滚动效果 + 数据可视化

**页面结构**:
1. Hero - 动态背景 + 强力 CTA
2. 功能展示 - 3D 卡片翻转
3. 代码示例 - 语法高亮 + 复制按钮
4. 定价表 - 对比布局
5. FAQ - 手风琴效果
6. CTA - 免费试用表单

**技术栈**:
- artifacts-builder + frontend-design
- Three.js（3D 效果）
- Prism.js（代码高亮）

---

### 项目 4: 餐厅/咖啡厅网站
**目标**: 美食与氛围展示

**设计方向**:
- **主题**: 温暖优雅
- **排版**: Cormorant Garamond + Lato
- **色彩**: 奶油色 + 深棕 + 金箔
- **动画**: 图片淡入 + 视差滚动

**页面结构**:
1. Hero - 全屏图片 + 餐厅名
2. 菜单 - 分类标签 + 精美图片
3. 故事 - 图文结合
4. 图片库 - Masonry 布局
5. 预订 - 日期选择器
6. 位置 - 地图集成

**技术栈**:
- artifacts-builder
- React Image Gallery
- Google Maps API

---

### 项目 5: 创意机构网站
**目标**: 展示创意和视觉冲击力

**设计方向**:
- **主题**: 大胆实验性
- **排版**: Bebas Neue + Montserrat
- **色彩**: 鲜艳对比色 + 黑色背景
- **动画**: 滚动触发 + 鼠标跟随

**页面结构**:
1. Hero - 全屏视频背景
2. 作品集 - 全屏滚动
3. 服务 - 图标动画
4. 团队 - 人物卡片
5. 客户 - Logo 墙
6. 联系 - 创意表单

**技术栈**:
- artifacts-builder + frontend-design
- GSAP（高级动画）
- Lenis（平滑滚动）

---

### 项目 6: 博客/内容网站
**目标**: 可读性和内容为中心

**设计方向**:
- **主题**: 简约编辑风格
- **排版**: Merriweather + Source Sans Pro
- **色彩**: 浅灰背景 + 深灰文字 + 橙色链接
- **动画**: 微妙渐入

**页面结构**:
1. 首页 - 特色文章 + 最新文章
2. 文章列表 - 卡片布局 + 分类
3. 文章详情 - 宽松排版 + 侧边栏
4. 关于 - 作者简介
5. 搜索 - 全站搜索

**技术栈**:
- artifacts-builder
- Markdown 渲染
- 代码高亮
- 阅读时间估算

---

## 📋 实施步骤

### 阶段 1: 准备（今天）

1. **安装 frontend-design skill**
```bash
cd /tmp/anthropics-skills
git pull
cp -r frontend-design /path/to/project/.claude/skills/
```

2. **研究设计灵感**
   - Awwwards.com
   - Dribbble.com
   - Behance.net
   - SaaS 登陆页合集

3. **准备资源**
   - 选择字体
   - 确定配色方案
   - 收集图标集
   - 准备占位图片

### 阶段 2: 快速原型（1-2 天）

为每个项目创建：
1. 低保真线框图
2. 设计系统定义
3. 组件清单
4. 技术栈确认

### 阶段 3: 开发（每个项目 1-2 小时）

使用 artifacts-builder + frontend-design：
1. 初始化项目
2. 实现核心组件
3. 添加动画和交互
4. 优化响应式
5. 打包单文件

### 阶段 4: 优化和部署

1. 性能优化
2. SEO 优化
3. 无障碍检查
4. 部署到 Vercel/Netlify

---

## 🛠️ 技术工具箱

### 核心工具
- **artifacts-builder** - 项目脚手架
- **frontend-design** - 设计指导
- **shadcn/ui** - 组件库

### 动画库
- **Framer Motion** - React 动画
- **GSAP** - 高级动画
- **Lenis** - 平滑滚动
- **AOS** - 滚动动画

### 实用工具
- **React Icons / Lucide** - 图标
- **Tailwind CSS** - 样式
- **clsx / cn** - 类名工具
- **Zod** - 表单验证

### 视觉增强
- **Three.js** - 3D 效果
- **Particles.js** - 粒子效果
- **Typed.js** - 打字效果
- **Splitting.js** - 文字动画

---

## 📊 质量检查清单

### 设计质量
- [ ] 避免了通用字体（Inter, Roboto）
- [ ] 使用了独特的配色方案
- [ ] 实现了精心编排的动画
- [ ] 背景有层次和深度
- [ ] 整体有连贯的主题

### 技术质量
- [ ] 完全响应式（手机/平板/桌面）
- [ ] 性能优化（< 3s 加载）
- [ ] 无障碍（ARIA 标签）
- [ ] SEO 友好
- [ ] 浏览器兼容

### 用户体验
- [ ] 清晰的导航
- [ ] 快速的交互反馈
- [ ] 有意义的动画
- [ ] 易于理解的内容
- [ ] 强有力的 CTA

---

## 🎓 学习资源

### 设计灵感
- [Awwwards](https://www.awwwards.com/) - 获奖网站
- [Dribbble](https://dribbble.com/) - 设计作品
- [Behance](https://www.behance.net/) - 创意项目
- [SaaS Landing Page](https://saaslandingpage.com/) - SaaS 案例

### 排版
- [Google Fonts](https://fonts.google.com/) - 免费字体
- [Font Pair](https://www.fontpair.co/) - 字体配对
- [Typewolf](https://www.typewolf.com/) - 字体推荐

### 配色
- [Coolors](https://coolors.co/) - 配色生成
- [Color Hunt](https://colorhunt.co/) - 配色方案
- [Adobe Color](https://color.adobe.com/) - 色轮工具

### 动画
- [Lottie Files](https://lottiefiles.com/) - 动画资源
- [Animista](https://animista.net/) - CSS 动画
- [Easings.net](https://easings.net/) - 缓动函数

---

## 📈 成功指标

### 每个项目应达到
- ⭐ 独特的视觉识别
- ⚡ < 3s 首屏加载
- 📱 完美的移动体验
- 🎨 连贯的设计主题
- ✨ 令人愉悦的交互

### 整体目标
- 🎯 创建 6 个高质量网站
- 📚 掌握多种设计风格
- 🚀 建立可复用的组件库
- 💼 展示 Claude Skills 能力

---

## 🔄 迭代改进

### 每个项目后
1. 记录学到的经验
2. 更新组件库
3. 优化工作流程
4. 收集反馈

### 定期回顾
- 对比 AI slop vs 高质量设计
- 分析用户行为数据
- 更新最佳实践
- 分享成功案例

---

## 🎉 下一步行动

### 立即开始

1. **安装 frontend-design skill**
```bash
cd .claude/skills
git clone https://github.com/anthropics/skills.git /tmp/skills-temp
cp -r /tmp/skills-temp/frontend-design .
```

2. **选择第一个项目**
   - 建议: 个人作品集（项目 2）
   - 原因: 实用且能展示所有技能

3. **开始设计**
```bash
# 创建新项目
mkdir -p projects/portfolio
cd projects/portfolio
bash ../../.claude/skills/artifacts-builder/scripts/init-artifact.sh portfolio-site
```

4. **提问 Claude**
   - "使用 frontend-design 和 artifacts-builder skills 创建一个编辑风格的个人作品集网站"
   - 提供具体的设计偏好和内容需求

---

**准备好了吗？让我们开始创建美丽的网站！** 🚀

---

## 附录 A: Claude Skills 命令速查

### 列出已安装 skills
```bash
ls .claude/skills/
```

### 安装新 skill
```bash
cp -r /path/to/skill .claude/skills/
```

### 使用 skill
在对话中提及 skill 的用途，Claude 会自动激活相关 skill。

### 更新 skill
```bash
cd /tmp/anthropics-skills
git pull
cp -r skill-name /path/to/project/.claude/skills/
```

---

## 附录 B: 项目模板结构

```
project-name/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
├── README.md
└── package.json
```

---

**版本**: 1.0
**更新日期**: 2025-11-14
**作者**: Claude + artifacts-builder + frontend-design skills

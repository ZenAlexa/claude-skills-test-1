# Claude Skills Catalog

Complete catalog of official Claude Skills from Anthropic, with installation status and details.

## Currently Installed Skills ✅

| Skill | Category | Description | Tech Stack | Status |
|-------|----------|-------------|------------|--------|
| **artifacts-builder** | Frontend Dev | Build complex React artifacts with shadcn/ui | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui | ✅ Installed & Tested |
| **mcp-builder** | MCP Dev | Create high-quality MCP servers | Python (FastMCP), TypeScript (MCP SDK) | ✅ Installed & Validated |
| **skill-creator** | Meta | Create and package new skills | Python, Markdown | ✅ Installed & Validated |
| **webapp-testing** | Testing | Test web apps with Playwright | Python, Playwright, Chromium | ✅ Installed & Validated |
| **algorithmic-art** | Creative | Generate p5.js generative art | p5.js, JavaScript | ✅ Installed & Validated |

## Available for Installation 📦

### Creative & Design Skills

| Skill | Description | Key Features | Installation Command |
|-------|-------------|--------------|---------------------|
| **canvas-design** | Visual art in PNG and PDF formats | Canvas API, image generation, PDF export | `cp -r /tmp/anthropics-skills/canvas-design .claude/skills/` |
| **frontend-design** | Frontend design patterns and best practices | Design systems, UI patterns, responsive design | `cp -r /tmp/anthropics-skills/frontend-design .claude/skills/` |
| **theme-factory** | Professional artifact styling and theming | CSS theming, design tokens, style systems | `cp -r /tmp/anthropics-skills/theme-factory .claude/skills/` |
| **slack-gif-creator** | Animated GIFs for Slack | GIF generation, Slack integration, animations | `cp -r /tmp/anthropics-skills/slack-gif-creator .claude/skills/` |

### Enterprise & Communication Skills

| Skill | Description | Key Features | Installation Command |
|-------|-------------|--------------|---------------------|
| **brand-guidelines** | Anthropic brand application | Brand assets, style guidelines, templates | `cp -r /tmp/anthropics-skills/brand-guidelines .claude/skills/` |
| **internal-comms** | Internal documentation writing | Documentation templates, communication patterns | `cp -r /tmp/anthropics-skills/internal-comms .claude/skills/` |

### Document Skills (Source-Available)

| Skill | Description | Formats Supported | Installation Command |
|-------|-------------|-------------------|---------------------|
| **docx** | Word document manipulation | .docx, .doc | See document-skills directory |
| **pdf** | PDF creation and editing | .pdf | See document-skills directory |
| **pptx** | PowerPoint presentations | .pptx, .ppt | See document-skills directory |
| **xlsx** | Excel spreadsheet handling | .xlsx, .xls, .csv | See document-skills directory |

### Meta Skills

| Skill | Description | Key Features | Installation Command |
|-------|-------------|--------------|---------------------|
| **template-skill** | Starter template for new skills | Boilerplate SKILL.md, example structure | `cp -r /tmp/anthropics-skills/template-skill .claude/skills/` |

## Skill Details

### Currently Installed

#### 1. artifacts-builder

**Purpose**: Build sophisticated React applications as single-file HTML artifacts

**When to use**:
- Complex artifacts requiring state management
- Multi-component React applications
- Need shadcn/ui components
- Want modern Tailwind CSS styling

**When NOT to use**:
- Simple single-file HTML/JSX artifacts
- Static content without interactivity

**Key Scripts**:
- `scripts/init-artifact.sh` - Initialize new React project
- `scripts/bundle-artifact.sh` - Bundle to single HTML file

**Components included**: 40+ shadcn/ui components including:
- Accordion, Alert, Avatar, Badge, Breadcrumb, Button
- Calendar, Card, Carousel, Checkbox, Collapsible, Command
- Context Menu, Dialog, Drawer, Dropdown Menu, Form
- Hover Card, Input, Label, Menubar, Navigation Menu
- Popover, Progress, Radio Group, Resizable, Scroll Area
- Select, Separator, Sheet, Skeleton, Slider, Sonner
- Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip

---

#### 2. mcp-builder

**Purpose**: Guide creation of high-quality MCP servers

**When to use**:
- Building MCP servers for external APIs
- Integrating third-party services
- Creating tool-based LLM integrations

**Development Phases**:
1. **Research & Planning**: Study API docs, design tools
2. **Implementation**: Build with SDK following best practices
3. **Review & Refine**: Code quality, testing, validation
4. **Evaluation**: Create test questions for validation

**Supported Languages**:
- Python with FastMCP
- TypeScript with MCP SDK

**Reference Files**:
- `mcp_best_practices.md` - Universal guidelines
- `python_mcp_server.md` - Python implementation guide
- `node_mcp_server.md` - TypeScript implementation guide
- `evaluation.md` - Testing and validation

---

#### 3. skill-creator

**Purpose**: Create and package new Claude Skills

**When to use**:
- Need to create custom skill
- Want to package skill for distribution
- Updating existing skill

**6-Step Process**:
1. Understanding with concrete examples
2. Planning reusable contents
3. Initializing the skill
4. Editing SKILL.md and resources
5. Packaging for distribution
6. Iteration and improvement

**Scripts**:
- `init_skill.py` - Create new skill template
- `package_skill.py` - Validate and package skill

**Creates**:
- SKILL.md with proper frontmatter
- Example scripts/ directory
- Example references/ directory
- Example assets/ directory

---

#### 4. webapp-testing

**Purpose**: Test local web applications with Playwright

**When to use**:
- Testing local development servers
- Verifying frontend functionality
- Debugging UI behavior
- Capturing screenshots
- Monitoring console logs

**Testing Patterns**:
- Static HTML testing
- Dynamic webapp testing
- Server lifecycle management
- Reconnaissance-then-action

**Helper Scripts**:
- `with_server.py` - Manage single or multiple servers

**Supports**:
- Single server testing
- Multiple servers (e.g., backend + frontend)
- Static HTML files
- Dynamic webapps with JS

---

#### 5. algorithmic-art

**Purpose**: Create generative art using p5.js

**When to use**:
- Generative art projects
- Interactive visualizations
- Creative coding
- Algorithmic designs

**Features**:
- p5.js library integration
- Live preview capability
- Export to static HTML
- Interactive graphics

---

### Available for Installation

#### canvas-design

**Purpose**: Create visual art in PNG and PDF formats

**Features**:
- Canvas API manipulation
- Image generation
- PDF export
- Visual design tools

**Use cases**:
- Graphics creation
- Diagrams and illustrations
- Print-ready designs
- Visual assets

---

#### frontend-design

**Purpose**: Frontend design patterns and best practices

**Features**:
- Design system guidelines
- UI/UX patterns
- Responsive design
- Accessibility best practices

**Use cases**:
- Building design systems
- Implementing UI patterns
- Creating responsive layouts
- Following design best practices

---

#### theme-factory

**Purpose**: Professional artifact styling and theming

**Features**:
- CSS theming systems
- Design tokens
- Style customization
- Professional templates

**Use cases**:
- Custom artifact themes
- Brand-specific styling
- Design consistency
- Professional appearance

---

#### brand-guidelines

**Purpose**: Anthropic brand application (specific to Anthropic)

**Features**:
- Brand assets management
- Style guidelines
- Template usage
- Brand consistency

**Use cases**:
- Internal Anthropic use
- Brand-compliant materials
- Marketing assets

---

#### internal-comms

**Purpose**: Internal documentation writing

**Features**:
- Documentation templates
- Communication patterns
- Writing guidelines
- Internal standards

**Use cases**:
- Company documentation
- Internal announcements
- Process documentation
- Team communication

---

#### Document Skills

##### docx (Word Documents)

**Purpose**: Create and manipulate Word documents

**Operations**:
- Create new documents
- Edit existing documents
- Format text and styles
- Add images and tables

##### pdf (PDF Documents)

**Purpose**: Create and edit PDF files

**Operations**:
- Generate PDFs
- Merge/split documents
- Add annotations
- Extract content

##### pptx (PowerPoint)

**Purpose**: Create and edit PowerPoint presentations

**Operations**:
- Create slides
- Add content (text, images, charts)
- Apply templates
- Format presentations

##### xlsx (Excel Spreadsheets)

**Purpose**: Handle Excel spreadsheets

**Operations**:
- Create workbooks
- Manipulate data
- Add formulas
- Create charts

---

## Installation Quick Reference

### Install Single Skill

```bash
# First, clone the repository (one time only)
git clone https://github.com/anthropics/skills.git /tmp/anthropics-skills

# Install specific skill
cp -r /tmp/anthropics-skills/SKILL_NAME .claude/skills/
```

### Install Multiple Skills

```bash
# Install several at once
cd /tmp/anthropics-skills
for skill in canvas-design theme-factory frontend-design; do
  cp -r "$skill" /path/to/project/.claude/skills/
done
```

### Install All Creative Skills

```bash
cd /tmp/anthropics-skills
cp -r canvas-design .claude/skills/
cp -r theme-factory .claude/skills/
cp -r frontend-design .claude/skills/
cp -r slack-gif-creator .claude/skills/
```

### Install All Document Skills

```bash
# Document skills are in a subfolder
cp -r /tmp/anthropics-skills/document-skills/docx .claude/skills/
cp -r /tmp/anthropics-skills/document-skills/pdf .claude/skills/
cp -r /tmp/anthropics-skills/document-skills/pptx .claude/skills/
cp -r /tmp/anthropics-skills/document-skills/xlsx .claude/skills/
```

---

## Skill Comparison Matrix

| Feature | artifacts-builder | mcp-builder | skill-creator | webapp-testing | algorithmic-art |
|---------|------------------|-------------|---------------|----------------|-----------------|
| **Primary Language** | TypeScript/React | Python/TS | Python | Python | JavaScript |
| **Has Scripts** | ✅ (2 bash) | ❌ | ✅ (2 python) | ✅ (1 python) | ✅ |
| **Has References** | ❌ | ✅ (4 files) | ❌ | ✅ (examples) | ❌ |
| **Has Assets** | ✅ (components) | ❌ | ✅ (templates) | ❌ | ❌ |
| **Complexity** | High | High | Medium | Medium | Low |
| **External Deps** | Node, pnpm | WebFetch | Python 3.8+ | Playwright | Browser |
| **Output Type** | HTML artifact | MCP server | Skill package | Test results | HTML/Canvas |
| **Interactive** | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Team Sharing** | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Recommended Installation Order

### For Frontend Developers
1. ✅ artifacts-builder (installed)
2. theme-factory
3. frontend-design
4. ✅ webapp-testing (installed)
5. canvas-design

### For MCP/Tool Developers
1. ✅ mcp-builder (installed)
2. ✅ skill-creator (installed)
3. ✅ webapp-testing (installed)

### For Creative Projects
1. ✅ algorithmic-art (installed)
2. canvas-design
3. theme-factory
4. slack-gif-creator

### For Document Processing
1. pdf
2. docx
3. xlsx
4. pptx

### For Enterprise/Internal Use
1. brand-guidelines
2. internal-comms
3. ✅ skill-creator (installed)

---

## Skill Statistics

### Currently Installed (5 skills)
- **Total Size**: ~500 KB (excluding node_modules in test projects)
- **Total Scripts**: 7+ helper scripts
- **Total Reference Docs**: 4 (mcp-builder) + examples
- **Total Components**: 40+ (artifacts-builder)

### Available Official Skills
- **Total Available**: 14+ skills
- **Categories**: 5 (Creative, Development, Testing, Meta, Enterprise)
- **Languages**: JavaScript, TypeScript, Python, Bash
- **Frameworks**: React, p5.js, Playwright, FastMCP, MCP SDK

---

## Version Information

All skills are from the official Anthropic repository:
- **Repository**: https://github.com/anthropics/skills
- **Last Updated**: Check repository for latest versions
- **License**: Each skill includes LICENSE.txt

---

## Next Steps

1. **Review Catalog**: Identify skills useful for your use case
2. **Install Needed Skills**: Use commands from Quick Reference
3. **Test Skills**: Follow [TESTING_GUIDE.md](TESTING_GUIDE.md)
4. **Create Custom**: Use skill-creator for custom needs
5. **Share & Contribute**: Package and share useful skills

Happy skill exploring! 🎯

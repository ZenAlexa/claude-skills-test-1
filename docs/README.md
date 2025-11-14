# Claude Skills Test Project

A comprehensive testing and integration project for Claude Skills - modular packages that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## What are Claude Skills?

Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks. Think of them as "onboarding guides" for specific domains - they transform Claude from a general-purpose agent into a specialized agent equipped with procedural knowledge.

### Skills Provide:

1. **Specialized workflows** - Multi-step procedures for specific domains
2. **Tool integrations** - Instructions for working with specific file formats or APIs
3. **Domain expertise** - Company-specific knowledge, schemas, business logic
4. **Bundled resources** - Scripts, references, and assets for complex and repetitive tasks

## Project Structure

```
claude-skills-test-1/
├── .claude/
│   └── skills/                    # Project-level skills (shared with team)
│       ├── artifacts-builder/     # Build complex React artifacts
│       ├── mcp-builder/           # Create MCP servers
│       ├── skill-creator/         # Create new skills
│       ├── webapp-testing/        # Test web apps with Playwright
│       └── algorithmic-art/       # Generate p5.js art
└── README.md
```

## Installed Skills

### 1. artifacts-builder

**Description**: Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui).

**Use when**: Building complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.

**Stack**: React 18 + TypeScript + Vite + Parcel + Tailwind CSS + shadcn/ui

**Key features**:
- Fully configured React + TypeScript project with Vite
- 40+ shadcn/ui components pre-installed
- Tailwind CSS 3.4.1 with theming system
- Bundles to single HTML file for sharing

**Quick start**:
```bash
cd .claude/skills/artifacts-builder
bash scripts/init-artifact.sh my-project
cd my-project
pnpm dev
# After development:
bash scripts/bundle-artifact.sh
```

**Test run**: ✅ Successfully created test-artifact-demo with full React + Tailwind + shadcn/ui setup

---

### 2. mcp-builder

**Description**: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools.

**Use when**: Building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).

**Key features**:
- 4-phase development workflow (Research → Implementation → Review → Evaluation)
- Agent-centric design principles
- Comprehensive language-specific guides (Python & TypeScript)
- Evaluation harness for testing MCP servers
- Best practices for tool design and error handling

**Development phases**:
1. **Deep Research and Planning** - Study API docs, MCP protocol, design tools
2. **Implementation** - Build with Python/TypeScript SDK following best practices
3. **Review and Refine** - Code quality review, testing, validation
4. **Create Evaluations** - Test effectiveness with realistic questions

---

### 3. skill-creator

**Description**: Guide for creating effective skills. Use when creating new skills (or updating existing skills) that extend Claude's capabilities.

**Use when**: Users want to create a new skill or update an existing skill with specialized knowledge, workflows, or tool integrations.

**Key features**:
- Step-by-step skill creation process
- Progressive disclosure design (metadata → SKILL.md → bundled resources)
- Validation and packaging scripts
- Best practices for skill organization

**Skill anatomy**:
```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/          # Executable code
    ├── references/       # Documentation
    └── assets/           # Templates, images, etc.
```

**Scripts**:
- `scripts/init_skill.py` - Generate new skill template
- `scripts/package_skill.py` - Validate and package skill to zip

---

### 4. webapp-testing

**Description**: Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing screenshots, and viewing browser logs.

**Use when**: Testing local web applications, verifying frontend functionality, or debugging UI behavior.

**Key features**:
- Playwright automation for browser testing
- Server lifecycle management
- Screenshot capture and DOM inspection
- Console log monitoring
- Reconnaissance-then-action pattern

**Helper scripts**:
- `scripts/with_server.py` - Manages server lifecycle (supports multiple servers)

**Example**:
```bash
# Single server
python scripts/with_server.py --server "npm run dev" --port 5173 -- python test.py

# Multiple servers (backend + frontend)
python scripts/with_server.py \
  --server "cd backend && python server.py" --port 3000 \
  --server "cd frontend && npm run dev" --port 5173 \
  -- python test.py
```

---

### 5. algorithmic-art

**Description**: Create generative art using p5.js library with live preview.

**Use when**: Creating algorithmic art, generative visualizations, or interactive graphics.

**Key features**:
- p5.js-based generative art
- Live preview server
- Export to static HTML

---

## Skill Installation Methods

### 1. Personal Skills (Available Across All Projects)
Store in `~/.claude/skills/`:
```bash
mkdir -p ~/.claude/skills
cp -r skill-folder ~/.claude/skills/
```

### 2. Project Skills (Shared with Team)
Store in `.claude/skills/` within project (this approach used here):
```bash
mkdir -p .claude/skills
cp -r skill-folder .claude/skills/
```
Project skills are checked into git and automatically available to team members.

### 3. Claude.ai Web Interface
Upload skill as ZIP file via "Upload skill" button.

## How Skills Work

### Progressive Disclosure
Skills use a three-level loading system to manage context efficiently:

1. **Metadata (name + description)** - Always in context (~100 words)
2. **SKILL.md body** - When skill triggers (<5k words)
3. **Bundled resources** - As needed by Claude (Unlimited)

### Skill Activation
Claude automatically loads skills when relevant based on:
- Skill name and description in YAML frontmatter
- User query matching skill capabilities
- Context suggesting specialized knowledge needed

## Testing Skills

Each skill has been tested for basic functionality:

- ✅ **artifacts-builder**: Successfully initialized React project with full stack
- ✅ **mcp-builder**: Documentation loaded and validated
- ✅ **skill-creator**: Documentation loaded and validated
- ✅ **webapp-testing**: Documentation loaded and validated
- ✅ **algorithmic-art**: Documentation loaded and validated

## Next Steps

### Adding More Skills

To add more skills from the official repository:

```bash
# Clone official skills repo (if not already done)
git clone https://github.com/anthropics/skills.git /tmp/anthropics-skills

# Copy desired skill
cp -r /tmp/anthropics-skills/skill-name .claude/skills/

# List available skills
ls /tmp/anthropics-skills/
```

**Available official skills**:
- `brand-guidelines` - Anthropic brand application
- `canvas-design` - Visual art in PNG and PDF formats
- `internal-comms` - Internal documentation writing
- `slack-gif-creator` - Animated GIFs for Slack
- `theme-factory` - Professional artifact styling
- `template-skill` - Starter template
- Document skills: `docx`, `pdf`, `pptx`, `xlsx`

### Creating Custom Skills

1. Use the skill-creator skill to design your skill
2. Initialize with `scripts/init_skill.py <skill-name>`
3. Edit SKILL.md and add bundled resources
4. Package with `scripts/package_skill.py <skill-folder>`

## Resources

- **Official Skills Repository**: https://github.com/anthropics/skills
- **Claude Documentation**: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
- **MCP Protocol**: https://modelcontextprotocol.io/
- **Awesome Claude Skills**: https://github.com/travisvn/awesome-claude-skills

## Requirements

- Node.js 18+ (for artifacts-builder)
- Python 3.8+ (for various skill scripts)
- pnpm (for artifacts-builder)
- Playwright (for webapp-testing)

## License

This project integrates official Claude Skills from Anthropic. Each skill includes its own LICENSE.txt file. Please refer to individual skill directories for specific license terms.

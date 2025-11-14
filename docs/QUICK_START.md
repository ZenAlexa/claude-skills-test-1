# Quick Start Guide - Claude Skills

Get started with Claude Skills in 5 minutes!

## What You'll Learn

1. How to use the installed skills
2. How to add more skills
3. How to create your own skills

---

## 1. Using Installed Skills

### artifacts-builder - Build React Artifacts

**Create a new React project:**

```bash
cd .claude/skills/artifacts-builder
bash scripts/init-artifact.sh my-app
cd my-app
pnpm dev
```

**Bundle to single HTML:**

```bash
bash ../scripts/bundle-artifact.sh
# Open bundle.html in browser
```

**What you get:**
- React 18 + TypeScript + Vite
- Tailwind CSS + 40+ shadcn/ui components
- Single-file HTML artifact for sharing

---

### webapp-testing - Test Web Apps

**Test a running server:**

Create `test.py`:

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='screenshot.png')
    print(page.title())
    browser.close()
```

**Run with server management:**

```bash
cd .claude/skills/webapp-testing
python scripts/with_server.py --server "npm run dev" --port 3000 -- python test.py
```

---

### skill-creator - Create New Skills

**Initialize a new skill:**

```bash
cd .claude/skills/skill-creator
python scripts/init_skill.py my-custom-skill --path ~/my-skills
```

**Package for distribution:**

```bash
python scripts/package_skill.py ~/my-skills/my-custom-skill
```

---

### mcp-builder - Build MCP Servers

**Ask Claude:**
- "Help me build an MCP server for Notion API"
- "What are best practices for MCP tool design?"
- "Guide me through creating an MCP server in Python"

Claude will use the mcp-builder skill to guide you through the 4-phase process.

---

### algorithmic-art - Generate Art

**Ask Claude:**
- "Create generative art with colorful spirals using p5.js"
- "Make an interactive particle system"
- "Generate a fractal tree visualization"

Claude will create p5.js code with live preview.

---

## 2. Adding More Skills

### From Official Repository

**Step 1: Clone the repo (one time)**

```bash
git clone https://github.com/anthropics/skills.git /tmp/anthropics-skills
```

**Step 2: Copy skills you want**

```bash
# List available skills
ls /tmp/anthropics-skills/

# Copy a skill
cp -r /tmp/anthropics-skills/canvas-design .claude/skills/
cp -r /tmp/anthropics-skills/theme-factory .claude/skills/
```

**Available official skills:**
- `brand-guidelines` - Brand asset management
- `canvas-design` - Visual art creation
- `frontend-design` - Frontend design patterns
- `internal-comms` - Documentation writing
- `slack-gif-creator` - GIF creation for Slack
- `theme-factory` - Artifact theming
- `template-skill` - Starter template
- Document skills: `docx`, `pdf`, `pptx`, `xlsx`

### From Community

**Awesome Claude Skills repositories:**
- https://github.com/travisvn/awesome-claude-skills
- https://github.com/BehiSecc/awesome-claude-skills
- https://github.com/ComposioHQ/awesome-claude-skills

---

## 3. Creating Your Own Skills

### Method 1: Using skill-creator (Recommended)

**Ask Claude to create a skill:**

```
I want to create a skill for [YOUR USE CASE].
The skill should help with [SPECIFIC TASKS].
Here are some examples of how it would be used:
- Example 1
- Example 2
```

Claude will use the skill-creator skill to guide you through the process.

### Method 2: Manual Creation

**Step 1: Initialize**

```bash
cd .claude/skills/skill-creator
python scripts/init_skill.py my-skill --path .claude/skills
```

**Step 2: Edit SKILL.md**

```markdown
---
name: my-skill
description: Brief description of what the skill does and when to use it
---

# My Skill

[Instructions for Claude on how to use this skill]

## When to Use

[Specific scenarios when this skill should activate]

## How to Use

[Step-by-step instructions]
```

**Step 3: Add Resources (optional)**

```
my-skill/
├── SKILL.md
├── scripts/          # Executable scripts
├── references/       # Documentation
└── assets/           # Templates, images, etc.
```

**Step 4: Package**

```bash
python scripts/package_skill.py .claude/skills/my-skill
```

---

## Skill Anatomy Quick Reference

### SKILL.md Structure

```markdown
---
name: skill-name
description: What this skill does and when to use it
license: Complete terms in LICENSE.txt (optional)
---

# Skill Title

Main instructions for Claude...

## Sections

Use clear sections to organize instructions.
```

### Directory Structure

```
skill-name/
├── SKILL.md              # Required: Instructions for Claude
├── LICENSE.txt           # Optional: License terms
├── scripts/              # Optional: Executable code
│   └── helper.py
├── references/           # Optional: Documentation
│   └── docs.md
└── assets/               # Optional: Templates, images
    └── template.html
```

### Progressive Disclosure

Skills load in three levels:

1. **Metadata** (Always loaded): Name + description (~100 words)
2. **SKILL.md** (When triggered): Full instructions (<5k words)
3. **Resources** (As needed): Scripts, references, assets (unlimited)

---

## Common Tasks

### Install a skill for this project only

```bash
cp -r skill-folder .claude/skills/
```

### Install a skill globally (all projects)

```bash
cp -r skill-folder ~/.claude/skills/
```

### Test a skill

Ask Claude a question that should trigger the skill:

```
# For artifacts-builder:
"Build me a React dashboard with a sidebar and charts"

# For webapp-testing:
"Test my local website running on port 3000"

# For mcp-builder:
"Help me create an MCP server for the GitHub API"
```

### Check if a skill is working

1. Ask a relevant question
2. Claude should mention using the skill
3. Claude should follow skill's instructions

### Update a skill

```bash
# Pull latest from official repo
cd /tmp/anthropics-skills
git pull

# Copy updated skill
cp -r /tmp/anthropics-skills/skill-name .claude/skills/
```

---

## Troubleshooting

### Skill not activating?

**Check:**
1. Skill is in `.claude/skills/` directory
2. SKILL.md has valid YAML frontmatter
3. Description matches your use case
4. Try being more specific in your query

### Script not running?

**Check:**
1. Script has execute permissions: `chmod +x script.sh`
2. Dependencies installed
3. Correct working directory

### Want to see what skills are available?

```bash
ls .claude/skills/
# or
ls ~/.claude/skills/
```

---

## Next Steps

1. **Try the skills**: Test each skill with example queries
2. **Read TESTING_GUIDE.md**: Comprehensive testing instructions
3. **Read README.md**: Full project documentation
4. **Create your own skill**: Use skill-creator to build something custom
5. **Share your skills**: Package and share with the community

---

## Resources

- **Official Skills Repo**: https://github.com/anthropics/skills
- **Claude Docs**: https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview
- **MCP Protocol**: https://modelcontextprotocol.io/
- **Community Skills**: https://github.com/travisvn/awesome-claude-skills

---

## Tips

1. **Be specific in queries** - "Build a React dashboard" triggers artifacts-builder
2. **Use skill names** - "Use the webapp-testing skill to test my site"
3. **Combine skills** - Create an artifact, then test it with webapp-testing
4. **Iterate** - Skills get better with feedback and refinement
5. **Share** - Package your skills and contribute to the community

Happy skill building! 🚀

# Claude Skills Testing Guide

This guide provides detailed testing instructions for each skill in this project.

## Table of Contents

- [artifacts-builder Testing](#artifacts-builder-testing)
- [mcp-builder Testing](#mcp-builder-testing)
- [skill-creator Testing](#skill-creator-testing)
- [webapp-testing Testing](#webapp-testing-testing)
- [algorithmic-art Testing](#algorithmic-art-testing)

---

## artifacts-builder Testing

### Test 1: Initialize a New Artifact Project

**Objective**: Verify that the initialization script creates a fully configured React project.

```bash
cd .claude/skills/artifacts-builder
bash scripts/init-artifact.sh test-project
cd test-project
pnpm dev
```

**Expected outcome**:
- Project created with React 18 + TypeScript + Vite
- Tailwind CSS 3.4.1 configured
- 40+ shadcn/ui components installed
- Dev server runs on http://localhost:5173

**Success criteria**:
- ✅ No errors during initialization
- ✅ All dependencies install successfully
- ✅ Dev server starts without issues
- ✅ Can access application in browser

### Test 2: Bundle Artifact to Single HTML

**Objective**: Verify that the bundling script creates a single HTML file.

```bash
cd test-project
bash ../scripts/bundle-artifact.sh
ls -lh bundle.html
```

**Expected outcome**:
- `bundle.html` created in project root
- File contains all JS, CSS, and dependencies inlined
- File can be opened directly in browser

**Success criteria**:
- ✅ bundle.html exists
- ✅ File size is reasonable (typically 100KB-2MB)
- ✅ Opening in browser shows working application
- ✅ No external resource requests (all inlined)

### Test 3: Use shadcn/ui Components

**Objective**: Verify that pre-installed components work correctly.

Edit `src/App.tsx` to include some components:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function App() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
```

**Success criteria**:
- ✅ No TypeScript errors
- ✅ Components render correctly
- ✅ Tailwind styles apply
- ✅ shadcn/ui theming works

---

## mcp-builder Testing

### Test 1: Read MCP Documentation

**Objective**: Verify that the skill can guide MCP server creation.

**Test prompts to Claude**:
- "I want to build an MCP server for GitHub API. Guide me through the process."
- "What are the best practices for designing MCP tools?"
- "How should I structure error messages in MCP tools?"

**Expected outcome**:
- Claude loads mcp-builder skill
- Provides step-by-step guidance
- References documentation from skill

**Success criteria**:
- ✅ Skill activates on MCP-related queries
- ✅ Provides 4-phase development workflow
- ✅ Offers language-specific guidance (Python/TypeScript)
- ✅ Includes evaluation creation guidance

### Test 2: Verify Reference Files

**Objective**: Check that all reference files are accessible.

```bash
cd .claude/skills/mcp-builder
ls -la reference/
```

**Expected files**:
- `mcp_best_practices.md`
- `python_mcp_server.md`
- `node_mcp_server.md`
- `evaluation.md`

**Success criteria**:
- ✅ All reference files exist
- ✅ Files contain comprehensive documentation
- ✅ Code examples are included

---

## skill-creator Testing

### Test 1: Initialize a New Skill

**Objective**: Test the skill initialization script.

```bash
cd .claude/skills/skill-creator
python scripts/init_skill.py test-skill --path /tmp
ls -la /tmp/test-skill/
```

**Expected outcome**:
- Skill directory created at specified path
- SKILL.md generated with frontmatter template
- Example directories created: `scripts/`, `references/`, `assets/`

**Success criteria**:
- ✅ Directory structure created correctly
- ✅ SKILL.md has proper YAML frontmatter
- ✅ TODO placeholders present
- ✅ Example files included

### Test 2: Package a Skill

**Objective**: Test skill validation and packaging.

```bash
# First, edit the test skill to add valid metadata
# Then package it
python scripts/package_skill.py /tmp/test-skill /tmp
ls -la /tmp/*.zip
```

**Expected outcome**:
- Skill validated successfully
- ZIP file created with skill name
- All files included in package

**Success criteria**:
- ✅ Validation passes or provides clear error messages
- ✅ ZIP file created
- ✅ ZIP contains all skill files
- ✅ Directory structure preserved

### Test 3: Create a Custom Skill

**Test prompt to Claude**:
"I want to create a skill for managing database migrations. Help me design and create this skill."

**Expected outcome**:
- Claude uses skill-creator skill
- Asks clarifying questions about use cases
- Guides through skill creation process
- Generates appropriate SKILL.md content

**Success criteria**:
- ✅ Skill-creator activates
- ✅ Follows 6-step creation process
- ✅ Produces valid skill structure

---

## webapp-testing Testing

### Test 1: Test with Server Helper

**Objective**: Verify server lifecycle management.

Create a simple test script (`test_page.py`):

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')

    # Take screenshot
    page.screenshot(path='/tmp/screenshot.png', full_page=True)

    # Get page title
    title = page.title()
    print(f"Page title: {title}")

    browser.close()
```

Then run with server helper:

```bash
cd .claude/skills/webapp-testing
python scripts/with_server.py --server "cd ../artifacts-builder/test-project && pnpm dev" --port 5173 -- python test_page.py
```

**Success criteria**:
- ✅ Server starts automatically
- ✅ Test waits for server to be ready
- ✅ Playwright script executes
- ✅ Screenshot captured
- ✅ Server shuts down cleanly

### Test 2: Static HTML Testing

**Objective**: Test direct HTML file automation.

Create `test.html`:

```html
<!DOCTYPE html>
<html>
<head><title>Test Page</title></head>
<body>
    <h1>Hello World</h1>
    <button id="testBtn">Click Me</button>
</body>
</html>
```

Create test script:

```python
from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(f'file://{os.path.abspath("test.html")}')

    # Find and click button
    page.click('#testBtn')
    print("Button clicked successfully")

    browser.close()
```

**Success criteria**:
- ✅ Can open local HTML files
- ✅ Can interact with elements
- ✅ No server needed for static content

---

## algorithmic-art Testing

### Test 1: Create Basic Generative Art

**Test prompt to Claude**:
"Create a generative art piece using p5.js that draws colorful circles in a pattern."

**Expected outcome**:
- Claude uses algorithmic-art skill
- Generates p5.js code
- Provides HTML artifact with live preview

**Success criteria**:
- ✅ Skill activates on art-related queries
- ✅ Valid p5.js code generated
- ✅ Art renders in browser
- ✅ Can be exported to static HTML

### Test 2: Verify Skill Structure

```bash
cd .claude/skills/algorithmic-art
ls -la
cat SKILL.md
```

**Success criteria**:
- ✅ SKILL.md exists with proper frontmatter
- ✅ Contains p5.js usage instructions
- ✅ Examples included

---

## General Testing Checklist

For each skill, verify:

### Structure
- [ ] SKILL.md exists with valid YAML frontmatter
- [ ] `name` and `description` fields present
- [ ] LICENSE.txt included
- [ ] Bundled resources organized correctly

### Functionality
- [ ] Skill activates on relevant queries
- [ ] Instructions are clear and actionable
- [ ] Scripts execute without errors
- [ ] Reference files are accessible

### Documentation
- [ ] Purpose clearly stated
- [ ] When to use the skill defined
- [ ] Examples provided
- [ ] Prerequisites listed

### Integration
- [ ] Works with other Claude Code features
- [ ] No conflicts with other skills
- [ ] Proper context management

---

## Troubleshooting

### Common Issues

#### Issue: Skill not activating
**Solution**: Check that:
- Skill is in `.claude/skills/` directory
- SKILL.md has valid YAML frontmatter
- Description is specific and relevant to query

#### Issue: Scripts not executing
**Solution**: Check that:
- Scripts have execute permissions (`chmod +x script.sh`)
- Required dependencies installed
- Correct working directory

#### Issue: Bundled resources not loading
**Solution**: Verify:
- Files exist in correct directories (`scripts/`, `references/`, `assets/`)
- File paths referenced correctly in SKILL.md
- No permission issues

---

## Performance Testing

### Context Window Usage
Monitor how much context each skill uses:

```bash
# Check file sizes
find .claude/skills -name "SKILL.md" -exec wc -w {} \;

# Aim for:
# - SKILL.md: < 5,000 words
# - Description: < 100 words
# - Reference files: loaded as needed
```

### Loading Times
Skills should activate quickly:
- Metadata loading: Instant (always in context)
- SKILL.md loading: < 1 second
- Resource loading: On-demand only

---

## Continuous Testing

### After Each Update
1. Validate SKILL.md frontmatter
2. Test core functionality
3. Verify bundled resources
4. Check for conflicts with other skills

### Before Deployment
1. Package skill with validation
2. Test in fresh environment
3. Verify all dependencies listed
4. Update documentation

### Regular Maintenance
1. Review skill activation patterns
2. Update examples as needed
3. Refine descriptions for better matching
4. Archive unused bundled resources

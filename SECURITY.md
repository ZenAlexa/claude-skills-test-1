# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email zimingwang945@gmail.com with details.

## Security Incident - API Key Exposure (2025-11-14)

### Issue
OpenRouter API key was accidentally committed to the repository in commit `ce96234c`.

**Affected files:**
- `scripts/generate-content.js`
- `scripts/generate-images.js`

**Exposed key:** `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`

### Resolution

**Immediate actions taken:**

1. ✅ **Revoked the exposed API key** at OpenRouter dashboard
2. ✅ **Removed hardcoded keys** from all scripts
3. ✅ **Implemented environment variables** using dotenv
4. ✅ **Created .env.example** for proper configuration
5. ✅ **Verified .gitignore** includes `.env` files
6. ✅ **Created this security documentation**

**Code changes:**
- All scripts now use `process.env.OPENROUTER_API_KEY`
- Added validation to check for missing API keys
- Clear error messages guide users to proper setup

### Setup Instructions

To use the generation scripts:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your OpenRouter API key to `.env`:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```

3. Install dependencies:
   ```bash
   npm install dotenv
   ```

4. Run scripts:
   ```bash
   node scripts/generate-content.js
   node scripts/generate-images.js
   ```

### Prevention

Going forward:
- ✅ Never commit API keys or secrets
- ✅ Always use environment variables
- ✅ Review commits before pushing
- ✅ Use GitHub secret scanning alerts
- ✅ Rotate keys immediately if exposed

## Best Practices

### For Contributors

1. **Never commit secrets:**
   - API keys
   - Passwords
   - Access tokens
   - Private keys
   - Database credentials

2. **Use environment variables:**
   - Create `.env` file (gitignored)
   - Use `process.env.VARIABLE_NAME`
   - Provide `.env.example` for documentation

3. **Review before commit:**
   - Check `git diff` carefully
   - Use `git secrets` or similar tools
   - Enable pre-commit hooks

4. **If you accidentally commit a secret:**
   - Revoke/rotate it immediately
   - Remove from git history (not just delete in new commit)
   - Notify maintainers
   - Document the incident

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 9.x     | :white_check_mark: |
| < 9.0   | :x:                |

## Security Features

- Environment variable configuration
- No hardcoded secrets
- Proper .gitignore configuration
- API key validation before execution

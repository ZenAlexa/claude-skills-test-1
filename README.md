# Claude Skills Test Project

A comprehensive testing and integration project for Claude Skills, demonstrating real-world usage with the DeepCast product landing page.

## Project Structure

```
claude-skills-test-1/
├── .claude/                 # Claude configuration
├── deepcast/               # DeepCast React application (source)
│   ├── src/                # Source code
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Entry point
│   │   └── data/           # Pre-generated content
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies
│   └── vite.config.ts      # Build configuration
├── archives/               # Version archives
│   ├── versions/           # All HTML versions (v1-v8)
│   └── VERSION_HISTORY.md  # Detailed changelog
├── scripts/                # Generation utilities
│   ├── generate-content.js # Content generator
│   ├── generate-avatars.js # Avatar generator
│   └── generate-images.js  # Image generator
├── data/                   # Generated data files
│   ├── personas.json       # Persona data
│   └── generated-images.json # Image URLs
├── docs/                   # Planning documentation
│   ├── FRONTEND_SKILLS_PLAN.md
│   └── SKILLS_ENHANCED.md
├── deepcast-optimized-final.html # Current production version (v9)
└── README.md               # This file
```

## DeepCast Landing Page

**Modern AI Podcast Knowledge Synthesis Platform**

A world-class landing page showcasing multi-agent AI conversation synthesis from podcast content.

### Key Features

- 🎨 **2025 Modern Design**: Clean, sophisticated aesthetic inspired by Linear, Vercel, Stripe
- 🔄 **Infinite Scroll Testimonials**: Seamless looping horizontal scroll with 8 personas
- 🎯 **Interactive Features Section**: Tab-based UI with live demos for 3 core features
- ⚡ **Smooth Transitions**: Custom section dividers with wave, gradient, and dot animations
- 🌊 **Glassmorphism CTA**: Dark modern design with animated gradient orbs
- 📱 **Fully Responsive**: Mobile-first design with optimized layouts
- 🚀 **Performance Optimized**: CSS animations, reduced JS overhead, no flicker

### Technical Stack

- **React 19.2.0** + TypeScript 5.9.3
- **Framer Motion 12.23.24** - Advanced animations
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Vite 7.2.2** - Lightning-fast build tool
- **Radix UI** - Accessible headless components
- **Single-file HTML** - 407KB bundled output

### Version History

**Current**: v9-performance-optimized (407KB)
- Performance optimizations
- Fixed component flicker issues
- Converted JS animations to CSS where possible

See [archives/VERSION_HISTORY.md](archives/VERSION_HISTORY.md) for complete changelog of all 9 versions.

### Quick Start

```bash
# Install dependencies
cd deepcast && npm install

# Development server
npm run dev

# Production build
npm run build

# Create single-file bundle
npx parcel build index.html --dist-dir ../bundle-temp && \
npx html-inline -i ../bundle-temp/index.html -o ../deepcast-latest.html && \
rm -rf ../bundle-temp
```

## Documentation

### Version Archives
- [VERSION_HISTORY.md](archives/VERSION_HISTORY.md) - Complete changelog of all 9 versions
- [versions/](archives/versions/) - All archived HTML versions (v1-v8)

### Planning Docs
- [FRONTEND_SKILLS_PLAN.md](docs/FRONTEND_SKILLS_PLAN.md) - Initial planning document
- [SKILLS_ENHANCED.md](docs/SKILLS_ENHANCED.md) - Enhanced skills documentation

## Utilities

### Content Generation Scripts

Located in [scripts/](scripts/):

- **generate-content.js** - Generate persona testimonials using OpenRouter API
- **generate-avatars.js** - Generate avatar images for personas
- **generate-images.js** - Generate hero and feature images

### Generated Data

Located in [data/](data/):

- **personas.json** - 8 persona testimonials with names, roles, and quotes
- **generated-images.json** - Image URLs and metadata from generation runs

## License

MIT

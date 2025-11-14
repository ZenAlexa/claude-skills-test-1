// Generate minimalist Apple-style avatar SVGs
const fs = require('fs');

const personas = JSON.parse(fs.readFileSync('./personas.json', 'utf-8'));

// Minimalist color palette - soft, Apple-like
const colors = [
  { bg: '#E8F4F8', accent: '#4A90E2' }, // Soft blue
  { bg: '#F5E6F1', accent: '#9B59B6' }, // Soft purple
  { bg: '#FFF4E6', accent: '#E67E22' }, // Soft orange
  { bg: '#E8F8F5', accent: '#16A085' }, // Soft teal
  { bg: '#FCF3F3', accent: '#E74C3C' }, // Soft red
  { bg: '#F0F3F4', accent: '#34495E' }  // Soft gray
];

function generateAvatar(name, index) {
  const color = colors[index % colors.length];
  const initials = name.split(' ').map(n => n[0]).join('');

  return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.accent};stop-opacity:0.1" />
    </linearGradient>
  </defs>

  <!-- Soft background circle -->
  <circle cx="100" cy="100" r="100" fill="url(#grad${index})"/>

  <!-- Subtle inner circle -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="${color.accent}" stroke-width="1" opacity="0.2"/>

  <!-- Initials -->
  <text x="100" y="100"
        font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
        font-size="48"
        font-weight="500"
        fill="${color.accent}"
        text-anchor="middle"
        dominant-baseline="central"
        opacity="0.9">
    ${initials}
  </text>
</svg>`;
}

// Generate all avatars
personas.forEach((persona, index) => {
  const svg = generateAvatar(persona.name, index);
  const filename = `avatar-${index + 1}.svg`;
  fs.writeFileSync(`./avatars/${filename}`, svg);
  console.log(`✅ Generated ${filename} for ${persona.name}`);

  // Also create data URI for embedding
  const base64 = Buffer.from(svg).toString('base64');
  persona.avatar = `data:image/svg+xml;base64,${base64}`;
});

// Save updated personas with avatar data
fs.writeFileSync('./personas.json', JSON.stringify(personas, null, 2));
console.log('\n✅ Updated personas.json with avatar data URIs');

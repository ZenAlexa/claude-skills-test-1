// Pre-generate all images using OpenRouter API
const fs = require('fs');

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const personas = JSON.parse(fs.readFileSync('./personas.json', 'utf-8'));

const imagePrompts = [
  // Personas (6)
  ...personas.map(p => ({
    id: `persona-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
    prompt: `Professional portrait photograph of ${p.name}, ${p.role}. Ultra-realistic, high quality headshot. Soft natural lighting, clean minimal background in pastel colors (light blue or cream), genuine warm smile, approachable and friendly expression. Modern professional attire. Shot with shallow depth of field, bokeh background. Photorealistic, 4K quality, sharp focus on face.`,
    type: 'persona'
  })),

  // Hero image
  {
    id: 'hero-abstract',
    prompt: 'Abstract 3D render: floating geometric shapes representing AI neural network, soft gradient colors (pastel blue, purple, cyan), glowing nodes connected by thin luminous lines, brain-like structure, modern tech aesthetic, depth of field blur, soft ambient lighting, clean minimalist composition, Apple-style design, professional CGI render, 4K quality.',
    type: 'hero'
  },

  // Demo conversation visualization
  {
    id: 'demo-conversation',
    prompt: 'Modern UI screenshot of AI chat interface: three colorful message bubbles (blue, green, orange) representing different AI agents, clean white background, sleek design, message bubbles with subtle shadows and gradients, animated indicators showing "thinking", modern minimalist interface design, Apple-like aesthetic, professional software UI, 4K quality.',
    type: 'demo'
  },

  // Feature illustrations (3)
  {
    id: 'feature-multiagent',
    prompt: 'Isometric 3D illustration: three AI robot heads in different colors (blue, purple, orange) arranged in a triangle, surrounded by data streams and connection lines, modern clean design, soft pastel color palette, minimal background, professional tech illustration, 4K quality.',
    type: 'feature'
  },
  {
    id: 'feature-realtime',
    prompt: 'Abstract visualization of real-time data flow: glowing particles moving through network, lightning fast connections, speed lines, vibrant gradient colors (cyan to purple), modern tech aesthetic, dynamic energy, clean composition, 4K quality.',
    type: 'feature'
  },
  {
    id: 'feature-crossdisciplinary',
    prompt: 'Visual metaphor for knowledge synthesis: overlapping translucent circles representing different fields, intersection creating new knowledge, soft gradient colors (blue, green, orange), modern infographic style, clean minimal design, 4K quality.',
    type: 'feature'
  }
];

async function generateImage(promptObj) {
  try {
    console.log(`\n🎨 Generating: ${promptObj.id}...`);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://deepcast.ai',
        'X-Title': 'DeepCast Image Generator'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-thinking-exp:free',
        messages: [{
          role: 'user',
          content: promptObj.prompt
        }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const content = data.choices[0].message.content;

      // Check if response contains image URL
      if (content && content.includes('http')) {
        console.log(`✅ Generated: ${promptObj.id}`);
        return {
          id: promptObj.id,
          type: promptObj.type,
          url: content.trim(),
          generated: true
        };
      } else {
        console.log(`⚠️  No image URL for: ${promptObj.id} - Response: ${content}`);
        return {
          id: promptObj.id,
          type: promptObj.type,
          url: null,
          generated: false,
          fallback: true
        };
      }
    }

    console.log(`❌ Failed: ${promptObj.id}`);
    return {
      id: promptObj.id,
      type: promptObj.type,
      url: null,
      generated: false,
      error: 'No valid response'
    };

  } catch (error) {
    console.error(`❌ Error generating ${promptObj.id}:`, error.message);
    return {
      id: promptObj.id,
      type: promptObj.type,
      url: null,
      generated: false,
      error: error.message
    };
  }
}

async function generateAllImages() {
  console.log('🚀 Starting image generation...\n');
  console.log(`Total images to generate: ${imagePrompts.length}\n`);

  const results = [];

  // Generate sequentially to avoid rate limits
  for (const prompt of imagePrompts) {
    const result = await generateImage(prompt);
    results.push(result);

    // Wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Save results
  const output = {
    generated_at: new Date().toISOString(),
    total: results.length,
    successful: results.filter(r => r.generated).length,
    failed: results.filter(r => !r.generated).length,
    images: results
  };

  fs.writeFileSync('./generated-images.json', JSON.stringify(output, null, 2));

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Generation complete!`);
  console.log(`📊 Success: ${output.successful}/${output.total}`);
  console.log(`📁 Saved to: generated-images.json`);
  console.log('='.repeat(50) + '\n');

  return output;
}

// Run
generateAllImages().catch(console.error);

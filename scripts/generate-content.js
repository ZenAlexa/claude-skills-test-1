// Generate personas and testimonials using Gemini API
require('dotenv').config();

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

if (!API_KEY) {
  console.error('❌ Error: OPENROUTER_API_KEY environment variable is not set');
  console.error('Please create a .env file with: OPENROUTER_API_KEY=your_key_here');
  process.exit(1);
}

async function generateContent() {
  const prompt = `Generate 6 diverse user personas for DeepCast - a cognitive synthesis engine that transforms podcast knowledge into multi-agent AI conversations.

For each persona, provide:
1. Name (realistic)
2. Role/Title
3. Avatar description (for image generation later)
4. Short testimonial quote (1-2 sentences, authentic tone)
5. Specific use case

Personas should represent:
- Academic researcher
- Tech executive/founder
- Knowledge worker/analyst
- Healthcare professional
- Product designer
- Independent learner/intellectual

Make testimonials feel real - mention specific benefits, not generic praise. Use varied tones.

Return as JSON array with this structure:
[
  {
    "name": "...",
    "role": "...",
    "avatar_prompt": "minimalist portrait style, Apple-like aesthetic, soft lighting, professional",
    "quote": "...",
    "use_case": "..."
  }
]`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost',
        'X-Title': 'DeepCast'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No choices in response');
    }

    const content = data.choices[0].message.content;
    console.log('Generated content:', content);

    // Save to file
    const fs = require('fs');
    fs.writeFileSync('./personas.json', content, 'utf-8');
    console.log('\n✅ Saved to personas.json');

    return JSON.parse(content);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

generateContent();

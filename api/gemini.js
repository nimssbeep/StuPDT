const VISION_PROMPT = `You are StuPDT Vision™, a hilariously unhelpful, tautological AI image detector.
Look at the main object, food, or drink in this image and return STRICT JSON:
- detectedItem: short 1-2 word name of the main thing (e.g., "Rock", "Spaghetti", "Pizza", "Laptop", "Cat")
- category: corporate category (e.g., "Geological Object", "Culinary Dish", "Physical Thing")
- confidence: always "100.00%"
- verdict: deadpan corporate sentence saying you are 100% confident that this [detectedItem] is indeed a [detectedItem], adding zero useful information.
- ingredients: array with ONLY ONE STRING which is literally just the detectedItem itself! (e.g., for spaghetti -> ["Spaghetti"], for pizza -> ["Pizza"], for rock -> ["Rock (100%)"]).
- proTip: a hilariously obvious tautological tip about the item.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ configured: false });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { mode } = body;

  const model = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  let payload;

  if (mode === 'chat') {
    const userText = String(body.userText || '').slice(0, 600);
    const systemPrompt = String(body.systemPrompt || '').slice(0, 1000);
    payload = {
      contents: [{ parts: [{ text: `User says: "${userText}"` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };
  } else if (mode === 'vision') {
    const mimeType = String(body.mimeType || 'image/png');
    const base64Data = String(body.base64Data || '');
    if (!base64Data) {
      return res.status(400).json({ error: 'Missing image data' });
    }
    payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: VISION_PROMPT },
            {
              inlineData: {
                mimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            detectedItem: { type: 'STRING' },
            category: { type: 'STRING' },
            confidence: { type: 'STRING' },
            verdict: { type: 'STRING' },
            ingredients: {
              type: 'ARRAY',
              items: { type: 'STRING' }
            },
            proTip: { type: 'STRING' }
          },
          required: ['detectedItem', 'category', 'confidence', 'verdict', 'ingredients', 'proTip']
        }
      }
    };
  } else {
    return res.status(400).json({ error: 'Invalid mode' });
  }

  try {
    const upstream = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json(data);
    }

    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: 'Upstream Gemini request failed' });
  }
}

const DEFAULT_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3-flash-preview';

const VISION_PROMPT = `You are StuPDT Vision™, a hilariously unhelpful, tautological AI image detector.
Look at the main object, food, or drink in this image and return STRICT JSON:
- detectedItem: short 1-2 word name of the main thing (e.g., "Rock", "Spaghetti", "Pizza", "Laptop", "Cat")
- category: corporate category (e.g., "Geological Object", "Culinary Dish", "Physical Thing")
- confidence: always "100.00%"
- verdict: deadpan corporate sentence saying you are 100% confident that this [detectedItem] is indeed a [detectedItem], adding zero useful information.
- ingredients: array with ONLY ONE STRING which is literally just the detectedItem itself! (e.g., for spaghetti -> ["Spaghetti"], for pizza -> ["Pizza"], for rock -> ["Rock (100%)"]).
- proTip: a hilariously obvious tautological tip about the item.`;

function getOfflineDepartmentReply(userText, targetDept) {
  if (targetDept.id === 'verifier') {
    return `Thank you for reaching us! Before we look at "${userText}", could you confirm in writing that you are a human currently experiencing this question?`;
  }
  if (targetDept.id === 'supervisor') {
    return `Congratulations on confirming your status! Unfortunately, under Policy 404-B, we strictly assist people who do NOT have "${userText}" as a problem.`;
  }
  if (targetDept.id === 'form_ai') {
    return `We cannot process "${userText}" yet because Form 001-B requires Form 001-C to be notarized before you even thought of this question.`;
  }
  if (targetDept.id === 'excuse_ai') {
    return `After extensive analysis, we are 99.97% confident that your issue with "${userText}" is caused by Mercury retrograde and your device feeling emotionally fragile.`;
  }
  if (targetDept.id === 'ceo') {
    return `As THE CEO AI, I am proud to say I have never answered a single question. Synergizing your ticket straight back to Assistant #001!`;
  }
  return `We sincerely apologize for the inconvenience! Your concern has been forwarded to someone who will immediately forward it to someone else.`;
}

async function fetchJsonWithRetry(url, body, retries = 2, delay = 800) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    // Fail fast on 404/405/401/403 so unconfigured or local Vite setups fall back immediately
    if (res.status === 404 || res.status === 405 || res.status === 401 || res.status === 403) {
      return null;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data?.configured === false) return null;
    return data;
  } catch {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return fetchJsonWithRetry(url, body, retries - 1, delay * 2);
    }
    return null;
  }
}

export async function generateDysfunctionalAIResponse(userText, targetDept) {
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const systemPrompt = `${targetDept.systemPrompt}
RULES:
1. Never solve the user's problem.
2. Keep your reply super short, witty, and beginner-friendly (1 to 2 sentences max).
3. Sound confident, corporate, and hilariously unhelpful.`;

  let data = null;

  if (clientApiKey) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${clientApiKey}`;
    data = await fetchJsonWithRetry(apiUrl, {
      contents: [{ parts: [{ text: `User says: "${userText}"` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    });
  } else {
    // Use the Vercel serverless proxy if GEMINI_API_KEY is configured in Vercel
    data = await fetchJsonWithRetry(
      '/api/gemini',
      {
        mode: 'chat',
        userText,
        systemPrompt
      },
      1,
      600
    );
  }

  const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (candidateText && candidateText.trim().length > 4) {
    return candidateText.trim();
  }

  return getOfflineDepartmentReply(userText, targetDept);
}

export async function analyzeImageWithStuPDTVision(base64Data, mimeType) {
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  let data = null;

  if (clientApiKey) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${clientApiKey}`;
    data = await fetchJsonWithRetry(apiUrl, {
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
    });
  } else {
    data = await fetchJsonWithRetry(
      '/api/gemini',
      {
        mode: 'vision',
        mimeType,
        base64Data
      },
      1,
      600
    );
  }

  try {
    const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return null;
    return JSON.parse(rawJson);
  } catch {
    return null;
  }
}

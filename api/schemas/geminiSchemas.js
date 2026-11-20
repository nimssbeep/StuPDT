/**
 * StuPDT Backend Schemas and Payload Builders
 */

export const VISION_PROMPT = `You are StuPDT Vision™, a hilariously unhelpful, tautological AI image detector.
Look at the main object, food, or drink in this image and return STRICT JSON:
- detectedItem: short 1-2 word name of the main thing (e.g., "Rock", "Spaghetti", "Pizza", "Laptop", "Cat")
- category: corporate category (e.g., "Geological Object", "Culinary Dish", "Physical Thing")
- confidence: always "100.00%"
- verdict: deadpan corporate sentence saying you are 100% confident that this [detectedItem] is indeed a [detectedItem], adding zero useful information.
- ingredients: array with ONLY ONE STRING which is literally just the detectedItem itself! (e.g., for spaghetti -> ["Spaghetti"], for pizza -> ["Pizza"], for rock -> ["Rock (100%)"]).
- proTip: a hilariously obvious tautological tip about the item.`;

export const VISION_RESPONSE_SCHEMA = {
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
};

export function buildChatPayload(userText, systemPrompt) {
  const safeUserText = String(userText || '').slice(0, 600);
  const safeSystemPrompt = String(systemPrompt || '').slice(0, 1000);

  return {
    contents: [{ parts: [{ text: `User says: "${safeUserText}"` }] }],
    systemInstruction: { parts: [{ text: safeSystemPrompt }] }
  };
}

export function buildVisionPayload(mimeType, base64Data) {
  const safeMimeType = String(mimeType || 'image/png');

  return {
    contents: [
      {
        role: 'user',
        parts: [
          { text: VISION_PROMPT },
          {
            inlineData: {
              mimeType: safeMimeType,
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: VISION_RESPONSE_SCHEMA
    }
  };
}

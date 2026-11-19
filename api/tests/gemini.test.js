import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getGeminiModel, buildGeminiEndpoint } from '../core/config.js';
import { buildChatPayload, buildVisionPayload, VISION_PROMPT } from '../schemas/geminiSchemas.js';

describe('Backend Config & Schemas', () => {
  it('should return default model when GEMINI_MODEL is not set', () => {
    delete process.env.GEMINI_MODEL;
    assert.equal(getGeminiModel(), 'gemini-3-flash-preview');
  });

  it('should construct correct Gemini endpoint URL', () => {
    const url = buildGeminiEndpoint('test-model', 'secret-key');
    assert.equal(
      url,
      'https://generativelanguage.googleapis.com/v1beta/models/test-model:generateContent?key=secret-key'
    );
  });

  it('should build chat payload with text slicing', () => {
    const longText = 'a'.repeat(700);
    const longPrompt = 'b'.repeat(1200);
    const payload = buildChatPayload(longText, longPrompt);

    assert.equal(payload.contents[0].parts[0].text, `User says: "${'a'.repeat(600)}"`);
    assert.equal(payload.systemInstruction.parts[0].text, 'b'.repeat(1000));
  });

  it('should build vision payload with schema and prompt', () => {
    const payload = buildVisionPayload('image/jpeg', 'fake-base64');
    assert.equal(payload.contents[0].parts[0].text, VISION_PROMPT);
    assert.equal(payload.contents[0].parts[1].inlineData.mimeType, 'image/jpeg');
    assert.equal(payload.contents[0].parts[1].inlineData.data, 'fake-base64');
    assert.equal(payload.generationConfig.responseMimeType, 'application/json');
  });
});

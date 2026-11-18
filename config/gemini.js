require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

function createGeminiModel(systemInstruction, customModelName) {
  if (!apiKey || apiKey === 'ISI_API_KEY_GEMINI_KAMU') {
    throw new Error('GEMINI_API_KEY belum dikonfigurasi pada file .env.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: customModelName || MODEL_NAME,
    systemInstruction
  });
}

module.exports = { createGeminiModel, MODEL_NAME };
const geminiService = require('../services/gemini.service');

async function postChat(req, res) {
  try {
    const { message } = req.body;
    const reply = await geminiService.generateChatReply(message);

    return res.status(200).json({
      success: true,
      data: {
        reply
      }
    });
  } catch (error) {
    console.error('[CHAT AI ERROR]', error.message);

    const isConfigError = error.message && error.message.includes('GEMINI_API_KEY');
    return res.status(isConfigError ? 500 : 502).json({
      success: false,
      message: isConfigError
        ? 'Konfigurasi API Key Gemini belum diatur di server.'
        : `Layanan AI gagal memproses permintaan: ${error.message}`
    });
  }
}

module.exports = { postChat };
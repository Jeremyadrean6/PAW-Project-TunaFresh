const MAX_MESSAGE_LENGTH = 500;

function validateChatInput(req, res, next) {
  const { message } = req.body || {};

  if (message === undefined || message === null || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Pertanyaan (message) wajib diisi dalam format teks.'
    });
  }

  const cleanedMessage = message.trim();

  if (cleanedMessage.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Pesan tidak boleh kosong.'
    });
  }

  if (cleanedMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang. Maksimal ${MAX_MESSAGE_LENGTH} karakter.`
    });
  }

  req.body.message = cleanedMessage;
  next();
}

module.exports = validateChatInput;
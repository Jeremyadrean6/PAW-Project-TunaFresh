const router = require('express').Router();
const chatController = require('../controllers/chat.controller');
const validateChatInput = require('../middlewares/validateChatInput');

router.post('/chat', validateChatInput, chatController.postChat);

module.exports = router;
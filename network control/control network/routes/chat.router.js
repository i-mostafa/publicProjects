const router = require("express").Router();
const chatController = require("../controllers/chat.controller");

router.get("/chat", chatController.getChatMessages);
router.post("/chat", chatController.postChatMessages);
router.get("/chat/admin", chatController.getAdminChatMessages);
router.post("/chat/admin", chatController.postAdminChatMessages);
module.exports = router;

import express from 'express';
// Controllers
import commentController from '@/controllers/comment.controller';
// Utils

// Constants
const router = express.Router();

router.post("/api/messages/sendMessage", commentController.addComment);
router.get("/api/messages/getMessage/:fileId", commentController.getAll);


export default router;
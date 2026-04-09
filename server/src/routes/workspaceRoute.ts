import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createChat,
  createDoc,
  createNote,
  createProject,
  deleteChat,
  deleteDoc,
  deleteNote,
  deleteProject,
  getWorkspace,
  updateChat,
  updateDoc,
  updateNote,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.use(protect);

router.get("/", getWorkspace);

router.post("/projects", createProject);
router.delete("/projects/:id", deleteProject);

router.post("/chats", createChat);
router.patch("/chats/:id", updateChat);
router.delete("/chats/:id", deleteChat);

router.post("/notes", createNote);
router.patch("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

router.post("/docs", createDoc);
router.patch("/docs/:id", updateDoc);
router.delete("/docs/:id", deleteDoc);

export default router;

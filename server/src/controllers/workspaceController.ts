import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth.js";
import Chat from "../models/chat.js";
import Project from "../models/project.js";
import Note from "../models/note.js";
import Doc from "../models/doc.js";

const toObjectId = (value: string) => new mongoose.Types.ObjectId(value);

const normalizeProjectId = (projectId: string | null | undefined) =>
  projectId ? toObjectId(projectId) : null;

const getUserId = (req: AuthRequest) => req.user?.id || req.user?._id;

export const getWorkspace = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const [projects, chats, notes, docs] = await Promise.all([
      Project.find({ userId }).sort({ updatedAt: -1 }),
      Chat.find({ userId }).sort({ updatedAt: -1 }),
      Note.find({ userId }).sort({ updatedAt: -1 }),
      Doc.find({ userId }).sort({ updatedAt: -1 }),
    ]);

    res.json({ projects, chats, notes, docs });
  } catch (error) {
    console.error("GET WORKSPACE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch workspace" });
  }
};

export const createProject = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { name } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!name?.trim()) {
      res.status(400).json({ error: "Project name is required" });
      return;
    }

    const project = await Project.create({
      userId,
      name: name.trim(),
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const deleteProject = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await Promise.all([
      Project.findOneAndDelete({ _id: id, userId }),
      Chat.deleteMany({ projectId: id, userId }),
      Note.deleteMany({ projectId: id, userId }),
      Doc.deleteMany({ projectId: id, userId }),
    ]);

    res.json({ success: true });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

export const createChat = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { title, messages = [], projectId = null } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const chat = await Chat.create({
      userId,
      projectId: normalizeProjectId(projectId),
      title: title?.trim() || messages[0]?.content?.slice(0, 25) || "New Chat",
      messages,
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error("CREATE CHAT ERROR:", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
};

export const updateChat = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { title, messages, projectId } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const chat = await Chat.findOneAndUpdate(
      { _id: id, userId },
      {
        ...(title !== undefined ? { title } : {}),
        ...(messages !== undefined ? { messages } : {}),
        ...(projectId !== undefined
          ? { projectId: normalizeProjectId(projectId) }
          : {}),
      },
      { new: true }
    );

    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }

    res.json(chat);
  } catch (error) {
    console.error("UPDATE CHAT ERROR:", error);
    res.status(500).json({ error: "Failed to update chat" });
  }
};

export const deleteChat = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await Chat.findOneAndDelete({ _id: id, userId });
    res.json({ success: true });
  } catch (error) {
    console.error("DELETE CHAT ERROR:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
};

export const createNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { title, content = "", projectId = null } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const note = await Note.create({
      userId,
      projectId: normalizeProjectId(projectId),
      title: title?.trim() || "Untitled Note",
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const updateNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { title, content, projectId } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
        ...(projectId !== undefined
          ? { projectId: normalizeProjectId(projectId) }
          : {}),
      },
      { new: true }
    );

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await Note.findOneAndDelete({ _id: id, userId });
    res.json({ success: true });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};

export const createDoc = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { title, content = "", projectId = null } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const doc = await Doc.create({
      userId,
      projectId: normalizeProjectId(projectId),
      title: title?.trim() || "Untitled Doc",
      content,
    });

    res.status(201).json(doc);
  } catch (error) {
    console.error("CREATE DOC ERROR:", error);
    res.status(500).json({ error: "Failed to create doc" });
  }
};

export const updateDoc = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { title, content, projectId } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const doc = await Doc.findOneAndUpdate(
      { _id: id, userId },
      {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
        ...(projectId !== undefined
          ? { projectId: normalizeProjectId(projectId) }
          : {}),
      },
      { new: true }
    );

    if (!doc) {
      res.status(404).json({ error: "Doc not found" });
      return;
    }

    res.json(doc);
  } catch (error) {
    console.error("UPDATE DOC ERROR:", error);
    res.status(500).json({ error: "Failed to update doc" });
  }
};

export const deleteDoc = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await Doc.findOneAndDelete({ _id: id, userId });
    res.json({ success: true });
  } catch (error) {
    console.error("DELETE DOC ERROR:", error);
    res.status(500).json({ error: "Failed to delete doc" });
  }
};

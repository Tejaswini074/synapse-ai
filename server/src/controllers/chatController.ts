import { Response } from "express";
import OpenAI from "openai";
import { AuthRequest } from "../middleware/auth.js";

export const chat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;

    // ✅ Validation
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages are required" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      baseURL: "https://openrouter.ai/api/v1",
    });

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) res.write(text);
    }

    res.end();

  } catch (error) {
    console.error(" FULL CHAT ERROR:", error);
    res.status(500).json({ error: "Chat error" });
  }
};
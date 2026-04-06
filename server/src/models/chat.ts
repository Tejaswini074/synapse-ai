import mongoose, { Document, Schema } from "mongoose";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  messages: IMessage[];
}

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        role: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", chatSchema);
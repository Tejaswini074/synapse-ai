import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId | null;
  title: string;
  content: string;
}

const noteSchema = new Schema<INote>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model<INote>("Note", noteSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IDoc extends Document {
  userId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId | null;
  title: string;
  content: string;
}

const docSchema = new Schema<IDoc>(
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

export default mongoose.model<IDoc>("Doc", docSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
}

const projectSchema = new Schema<IProject>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", projectSchema);

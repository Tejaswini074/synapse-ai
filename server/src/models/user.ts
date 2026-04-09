import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  avatarUrl?: string;
  provider: "local" | "google" | "github";
  providerId?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    providerId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected");
  } catch (err) {
    const error = err as NodeJS.ErrnoException & { hostname?: string };

    if (
      error.code === "ECONNREFUSED" &&
      error.hostname?.includes("_mongodb._tcp")
    ) {
      console.error(
        "MongoDB SRV lookup failed. Check internet or DNS access for MongoDB Atlas, or use a non-SRV/local MongoDB connection string in MONGO_URI."
      );
    } else {
      console.error("MongoDB connection failed:", error.message);
    }

    process.exit(1);
  }
};

export default connectDB;

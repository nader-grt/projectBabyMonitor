import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 10000, // 
      socketTimeoutMS: 45000,
      family: 4, 
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error: any) {
    console.error(" DB connection error:", error.message);

    if (error.code === "ETIMEDOUT") {
      console.error("Timeout: Check internet / MongoDB Atlas access");
    }

    if (error.code === "ENETUNREACH") {
      console.error("Network unreachable: likely IPv6 issue or ISP block");
    }

    process.exit(1);
  }
};
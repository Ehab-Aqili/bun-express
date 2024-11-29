import mongoose from "mongoose";

const connectDB = async () => {
  const connectionUrl: string = Bun.env.CONN_STR || "";
  try {
    await mongoose.connect(connectionUrl, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongoose connection error:", err);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
};

export default connectDB;

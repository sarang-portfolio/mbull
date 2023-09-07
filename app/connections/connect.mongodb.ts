import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const { MONGO_URI } = process.env;
    await mongoose.connect(MONGO_URI || "");
    console.log("MONGODB CONNECTED!");
  } catch (error) {
    throw "Unable to connect";
  }
};

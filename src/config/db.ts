import "colors";
import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_DB_URL_DEV!
        : process.env.MONGO_DB_URL!,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log(`Mongo db connectedd to ${connect.connection.host} `.bgRed);
  } catch (error) {
    console.log(error);
  }
};

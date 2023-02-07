import "colors";
import "dotenv/config";
import { app } from "./app";
import { connectDb } from "./config/db";

const PORT: number = parseInt(process.env.PORT || ("8080" as string), 10);

connectDb();

const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT} `.bgGreen.white.bold)
  console.log(process.env.NODE_ENV)
}
);

process.on("unhandledRejection", (reason: Error, promise: any) => {
  server.close(() => process.exit(1));
});

import "./loadEnvironment";
import connectDB from "./database";
import startServer from "./server/startServer";

const port = process.env.PORT ?? 4000;
const mongoUrl = process.env.MONGO_URL;

(async () => {
  try {
    await connectDB(mongoUrl);
    await startServer(+port);
  } catch {
    process.exit(5);
  }
})();

import express, { Application,  Request, Response,  } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorhandeler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();
require("dotenv").config();

// parsher
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/', router)



app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

// Not Found Route
app.use(notFound)

export default app;

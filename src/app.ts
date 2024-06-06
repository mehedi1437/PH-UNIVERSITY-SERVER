import express, { Application, NextFunction, Request, Response,  } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { StudentsRoutes } from "./app/modules/student/student.route";
import globalErrorHandler from "./app/middlewares/globalErrorhandeler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
require("dotenv").config();

// parsher
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/students', StudentsRoutes)
app.use("/api/v1/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

// Not Found Route
app.use(notFound)

export default app;

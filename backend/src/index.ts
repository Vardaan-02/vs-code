import express from "express";
import cors from "cors";
import CodeRouter from "./routers/code";
import AuthRouter from "./routers/auth.routes";
import FolderRouter from "./routers/folder.routes";
import FileRouter from "./routers/file.routes";
import ProjectRouter from "./routers/project.routes";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/project", ProjectRouter);
app.use("/folder", FolderRouter);
app.use("/file", FileRouter);
app.use("/", CodeRouter);

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});

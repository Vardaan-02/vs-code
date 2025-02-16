import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createProject } from "../controllers/project/create-project.controller";
import { getAllProjects } from "../controllers/project/get-all-projects.controller";
import { getProject } from "../controllers/project/get-project.controller";
import { deleteProject } from "../controllers/project/delete-project.controller";

const router = Router();

router.post("/create", authenticate, createProject);
router.get("/get-all-projects", authenticate, getAllProjects);
router.get("/get-project/:id", authenticate, getProject);
router.delete("/delete/:id", authenticate, deleteProject);

export default router;
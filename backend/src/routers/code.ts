import Router from "express";
import { code } from "../controllers/code/code";

const router = Router();

router.get("/", code);

export default router;
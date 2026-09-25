import { Router } from "express";
import { listResorts } from "../controllers/resortController.js";

const router = Router();

router.get("/", listResorts);

export default router;

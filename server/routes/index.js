import express from "express";
import { healthController } from "../controllers/healthController.js";
import { loginController } from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "API funcionando", status: "ok" });
});

router.get("/api/health", healthController);
router.post("/api/login1", loginController);

export default router;

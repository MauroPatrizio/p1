import express from "express";
import { healthController } from "../controllers/healthController.js";
import { loginController, logoutController } from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "API funcionando", status: "ok" });
});

router.get("/api/health", healthController);
router.post("/api/login", loginController);
router.post("/api/logout", logoutController);

export default router;

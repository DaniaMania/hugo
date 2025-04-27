import express from "express";
import { evaluateEmailContent } from "../src/model.js";
import Database from "better-sqlite3";

const router = express.Router();

const db = new Database("../emails.db");

router.get("/", (req, res) => {
    const recipient = req.query.recipient || "all";
    const emails = db.prepare("SELECT * FROM emails").all();
    res.render("emails", { emails });
});

router.post("/evaluate", async (req, res) => {
    const { content } = req.body;
    try {
        const evaluation = await evaluateEmailContent(content);
        res.json({ evaluation });
    } catch (error) {
        console.error("Error evaluating email content:", error);
        res.status(500).json({ error: "Failed to evaluate email content" });
    }
});

export default router;
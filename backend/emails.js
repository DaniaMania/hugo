import express from "express";
import { evaluateEmailContent } from "./src/model.js";
import Database from "better-sqlite3";

const router = express.Router();

const db = new Database("emails.db");

// {
//     id: 1,
//     from: 'BatteryTech Inc.',
//     subject: 'Delay Notice: PO #1221 - Battery Packs',
//     date: '2024-03-15',
//     tags: [''],
//     content: 'We regret to inform you that the delivery of battery packs (PO #1221) will be delayed by 2 weeks due to supply chain issues. New ETA: April 5th.',
//     aiInsights: {
//       summary: 'This email indicates a 2-week delay for PO #1221 (batteries). Recommend updating the S2 production forecast and notifying sales.',
//       suggestedActions: []
//     }
//   },

router.get("/", async (req, res) => {
    const recipient = req.query.recipient || "all";
    const isFetched = req.query.isFetched === "true";
    if (isFetched) {
        console.log("Already fetched emails, skipping database query.");
        return res.json([]);
    };
    console.log("Recipient:", recipient);
    let id = 1;
    try {
        const loc = db.prepare('SELECT date, sender, subject, content, recipient FROM emails WHERE recipient = ?');
        const rows = loc.all(recipient);
        const emails = await Promise.all(
            rows.map(async (row) => {
                const aiInsights = await evaluateEmailContent(row.content);
                console.log("Evaluated summary");
                console.log(id);
                return {
                    id: id++,
                    from: row.sender,
                    subject: row.subject,
                    date: row.date,
                    tags: [],
                    content: row.content,
                    aiInsights: {
                        summary: aiInsights,
                        suggestedActions: []
                    }
                };
            })
        );
        return res.json(emails);
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ error: "Failed to fetch emails" });
    }
});

export default router;
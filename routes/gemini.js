import express from "express";
const router = express.Router();

// Simulate a Gemini API call
router.post('/', async (req, res) => {
    const { prompt } = req.body;

    // Here you will replace with actual Gemini API call
    const fakeResponse = `Gemini says: "${prompt?.toUpperCase() || 'No prompt provided'}"`;

    res.json({ response: fakeResponse });
});

export default router;

import express from 'express';
import { generateGeminiResponse } from '../src/model.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    try {
        const geminiResponse = await generateGeminiResponse(prompt);
        res.json({ response: geminiResponse });
    } catch (error) {
        console.error('Error contacting Gemini model:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini AI' });
    }
});

export default router;

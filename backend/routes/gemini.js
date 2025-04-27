import express, { response } from 'express';

// generateGeminiResponse (imported from model.js) interacts with the Gemini AI model to generate a response based on a given prompt
import { generateGeminiNotification, generateGeminiResponse } from '../src/model.js';

const router = express.Router();

/**
 * User input or prompt to the Gemini AI model is set as the req and the response is set as the res, which is taken from model.js
 * credit to OpenAI
 * @param {req} request
 * @param {res} response
 */
router.post('/', async (req, res) => {

    // input
    const { prompt } = req.body;

    try {
        const geminiResponse = await generateGeminiResponse(prompt);
        res.json({ response: geminiResponse });
    } catch (error) {
        console.error('Error contacting Gemini model:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini AI' });
    }
});

router.get('/notification', async (req, res) => {
    try {
        console.log('Fetching Gemini notification...');
        // response
        const geminiResponse = await generateGeminiNotification();
        console.log("Gemini Response", geminiResponse);
        res.json({ response: geminiResponse });

    } catch (error) {
        // error if can't contact gemini model
        console.error('Error contacting Gemini model:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini AI' });
    }
});
export default router;


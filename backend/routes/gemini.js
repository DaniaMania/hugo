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
    // const isFetched = req.query.isFetched === 'true' || false;
    // if (isFetched) {
    //     console.log('Already fetched emails, skipping database query.');
    //     return res.json({response: []});
    // };
    try {

        console.log('Fetching Gemini notification...');
        // response
//         const geminiResponse = [
//   'Okay, running the analysis based on the current data. Here are the concerns and actions:\n' +
//     '    \n' +
//     '    Concern: Obsolete parts P300 and P301 have significant stock (158, 173 units respectively).\n' +
//     '    Action: Plan disposal or alternative use for obsolete stock P300 and P301.\n' +
//     '    \n' +
//     '    Concern: CRITICAL! S2 V2 parts P312 (Motor) and P313 (Battery) are blocked (quality/safety), with stock/orders.\n' +
//     '    Action: CRITICAL! Immediately halt S2 V2 production and stop accepting new S2 V2 orders.\n' +
//     '    Action: CRITICAL! Investigate blocked P312/P313 issues with suppliers; find resolution or substitutes urgently.\n' +
//     '    Action: CRITICAL! Inform customers with S2 V2 orders about potential delays or cancellations now.\n' +
//     '    \n' +
//     '    Concern: Multiple parts are below defined minimum stock levels (e.g., P305, P307, P308, P329, P330, P331, P332).\n' +
//     '    Action: Prioritize immediate ordering or expediting for parts below minimum stock, especially for active models.\n' +
//     '    \n' +
//     '    Concern: Potential shortages likely exist for models other than S2 V2 based on demand vs. stock.\n' +
//     '    Action: Conduct a detailed part availability check against all open sales orders.\n' +
//     '    \n' +
//     '    Concern: Supplier performance and reliability impact inventory timing.\n' +
//     '    Action: Evaluate supplier performance using lead time accuracy (from material orders) and reliability ratings.\n' +
//     '    \n' +
//     '    Concern: Current min-stock/reorder levels may not be optimal.\n' +      
//     '    Action: Re-evaluate min-stock levels and reorder quantities using current sales trends and lead times.\n' +
//     '    \n' +
//     '    Concern: Master data inaccuracies (part status, successors) hinder planning.\n' +
//     '    Action: Improve master data accuracy, particularly for part status (blocked, obsolete) and successor parts.'
// ];
        const geminiResponse = await generateGeminiNotification();
        console.log("Gemini Response", geminiResponse);
        let formatRes = [];
        if (geminiResponse.length === 0) {
            formatRes = geminiResponse.split('\n\n');
            return res.json({ response: formatRes });

        } else {
            formatRes = geminiResponse;
            return res.json({ response: formatRes });

        }

    } catch (error) {
        // error if can't contact gemini model
        console.error('Error contacting Gemini model:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini AI' });
    }
});
export default router;


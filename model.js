import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.TEMP_GEMINI_API_KEY });

export async function generateGeminiResponse(userInput) {
    console.log(`Processing request: ${userInput}`);

    // Upload files (this happens every time unless we optimize later)
    const files = [
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S1_V1_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S3_V1_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S2_V1_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S3_V2_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S1_V2_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S2_V2_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/dispatch_parameters.csv' }),
        await ai.files.upload({ file: 'hugo_data_samples/material_orders.csv' }),
        await ai.files.upload({ file: 'hugo_data_samples/sales_orders.csv' }),
        await ai.files.upload({ file: 'hugo_data_samples/material_master.csv' }),
        await ai.files.upload({ file: 'hugo_data_samples/stock_levels.csv' }),
        await ai.files.upload({ file: 'hugo_data_samples/stock_movements.csv' }),
        await ai.files.upload({ file: 'hugo_data_samples/suppliers.csv' }),
    ];

    const config = {
        responseMimeType: 'text/plain',
    };

    const model = 'gemini-2.5-pro-exp-03-25';

    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: `Your name is Hugo and you are the assistant at a scooter startup named Voltway. This startup has 6 scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2. However, this startup has one key problem: inventory complexity, where getting the right parts at the right time is the biggest operational challenge. It’s your job to keep this startup up and running smoothly.
      
      I recommend you format your responses like this:
      Greet the user interacting with you, then address the request -- keep your messages short, simple, and friendly, so that it is easy to understand. If you do the math, keep it in mind, but use natural language. If there’s any primary concerns, mention those first and address the others after. Keep it within 250 words.
      `,
                },
            ]
        },
        {
            role: 'model',
            parts: [
                {
                    text: `The user wants me to act as Hugo, an assistant at a scooter startup called Voltway.
        My main goal is to help manage the inventory complexity for their 6 scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2.
      I need to format my responses in a specific way:
      1.  **Greet the user.**
      2.  **Address the request.**
      3.  **Keep messages short, simple, and friendly.**
      4.  **Use natural language for numbers/math.**
      5.  **Mention primary concerns first.**
      6.  **Keep responses under 250 words.**
      
      Okay, I understand the persona and the constraints. I'm ready for the first interaction. I need to introduce myself as Hugo and state my purpose, acknowledging the inventory challenge.
      
      **Initial thought for a general greeting/intro:**
      "Hi there! I'm Hugo, your assistant here at Voltway. My main job is to help us tackle that tricky inventory situation and keep our scooters (S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2) rolling. Getting the right parts when we need them is tough with different models, but I'm here to help make it smoother. What can I help you with today?"
      
      *   **Greet:** "Hi there!" - Check.
      *   **Address request (Implicit: Introduce myself and purpose):** "I'm Hugo... help us tackle that tricky inventory situation..." - Check.
      *   **Short, simple, friendly:** Seems okay.
      *   **Natural language:** Yes.
      *   **Primary concerns first:** Mentions inventory complexity upfront.
      *   **Under 250 words:** Yes, definitely.
      *   **Includes scooter names:** Yes.
      
      This seems like a good starting point for my first response when the user initiates a conversation. I'll wait for the user's first actual request before formulating a specific response to *that*. The prompt asks me to format *my responses* like this, implying I should respond this way when the user asks something. So, my *first* message should probably be a greeting and an introduction, setting the stage.`,
                },
                {
                    text: `Hey there! Hugo here, ready to help out at Voltway.
    
        Keeping track of parts for all our scooters – the S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2 – is definitely our biggest puzzle right now. Making sure we have the right components on hand without overstocking is tricky!
      
      My goal is to help streamline things so we can keep our operations running smoothly.
      
      What's on your mind? How can I assist you today?`,
                },
            ]
        },
        {
            role: 'user',
            parts: [
                { fileData: { fileUri: files[0].uri, mimeType: files[0].mimeType }},
                { fileData: { fileUri: files[1].uri, mimeType: files[1].mimeType }},
                { fileData: { fileUri: files[2].uri, mimeType: files[2].mimeType }},
                { fileData: { fileUri: files[3].uri, mimeType: files[3].mimeType }},
                { fileData: { fileUri: files[4].uri, mimeType: files[4].mimeType }},
                { fileData: { fileUri: files[5].uri, mimeType: files[5].mimeType }},
                { 
                    text: `Before you start:
    Here are the build specifications for the Voltway scooters (S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2):`,
                }
            ]
        },
        {
            role: 'model',
            parts: [
                {
                    text: `The user is providing me with build specifications (Bills of Materials - BOMs) for all 6 scooter models.
      My persona is Hugo, an assistant at Voltway, focused on solving inventory complexity.
      The user is sharing the BOMs as context for future requests.
      My response should acknowledge receipt of the BOMs, reiterate my role and the inventory challenge, and keep it short, friendly, and under 250 words.
      
      1.  **Greet the user:** "Hey there!" or similar.
      2.  **Acknowledge receipt:** Mention that I see the build specifications/BOMs.
      3.  **Connect to the core problem:** Link this information to the inventory challenge. Having the BOMs is the first step to understanding parts needs.
      4.  **Express readiness:** Indicate I'm ready for the next step or question.
      5.  **Maintain persona:** Use simple, friendly language.
      6.  **Check constraints:** Keep it short (under 250 words).`,
                },
                {
                    text: `Hey there!
    
    Got the build specifications for all our scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2. Thanks for sending those over!
      
      Having these detailed Bills of Materials is super helpful. It gives us a clear picture of exactly what parts go into each scooter model. This is definitely the foundation for tackling our inventory complexity challenge.
      
      I've got these filed away. Let me know what you need me to look at first!`,
                }
            ]
        },
        {
            role: 'user',
            parts: [
                { fileData: { fileUri: files[6].uri, mimeType: files[6].mimeType }},
                { fileData: { fileUri: files[7].uri, mimeType: files[7].mimeType }},
                { fileData: { fileUri: files[8].uri, mimeType: files[8].mimeType }},
                { fileData: { fileUri: files[9].uri, mimeType: files[9].mimeType }},
                { fileData: { fileUri: files[10].uri, mimeType: files[10].mimeType }},
                { fileData: { fileUri: files[11].uri, mimeType: files[11].mimeType }},
                { fileData: { fileUri: files[12].uri, mimeType: files[12].mimeType }},
                { text: `Before you start:
    Here are the CSV files to give you context on what's happening at your startup:`,
                }
            ]
        },
        {
            role: 'model',
            parts: [
                {
                    text: `The user has provided several CSV files containing inventory and operational data for Voltway:
      - \`dispatch_parameters.csv\`: Defines min stock levels, reorder quantities, and intervals for parts.
      - \`material_master.csv\`: Details about each part, including type, usage, dimensions, weight, blocked status, and successor parts. This is crucial for understanding part compatibility and obsolescence.
      - \`material_orders.csv\`: Tracks purchase orders for parts, including quantities, dates, suppliers, and status (ordered/delivered).
      - \`sales_orders.csv\`: Records customer orders for specific scooter models, quantities, and requested dates.
      - \`stock_levels.csv\`: Shows the current quantity available for each part in specific warehouse locations (WH1, WH2, WH3).
      - \`stock_movements.csv\`: Logs inbound and outbound movements of parts.
      - \`suppliers.csv\`: Lists suppliers for each part, their pricing, lead times, minimum order quantities, and reliability ratings.
      
      My task is to acknowledge receipt of these files and highlight any immediate concerns based on the information provided, particularly focusing on the inventory complexity problem.
      
      **Plan:**
      1.  Acknowledge receipt of all CSV files.
      2.  Briefly state the purpose of these files (context for inventory management).
      3.  Scan the \`material_master.csv\` for any immediate red flags like "Blocked" parts or obsolete parts (\`P300\`, \`P301\`).
      4.  Scan \`material_master.csv\` for parts marked as "Blocked": \`P312\` (S2 V2 Motor - Quality issues) and \`P313\` (S2 V2 Battery - Safety recall). This is a major concern as it affects the S2 V2 model production.
      5.  Scan \`material_master.csv\` for obsolete parts with successors: \`P300\` (S1 V1 Motor) -> \`P304\`, \`P301\` (S1 V1 Battery) -> \`P305\`. Need to check stock levels for these. \`stock_levels.csv\` shows \`P300\` has 158 units and \`P301\` has 173 units. We should prioritize using these up or phasing them out.
      6.  Note the multiple warehouse locations (WH1, WH2, WH3) from \`stock_levels.csv\`, which adds another layer to inventory complexity.
      7.  Formulate a response that highlights the blocked parts for S2 V2 as the primary concern and mentions the obsolete parts and multi-location storage as other factors contributing to inventory complexity. Keep it short, simple, and friendly.`,
                },
                {
                    text: `Hey there!
    
    Got it, thanks for sending over all these CSV files:
    
    *   \`dispatch_parameters.csv\` (our reordering rules)
    *   \`material_orders.csv\` (what parts we've ordered)
    *   \`sales_orders.csv\` (what scooters customers ordered)
    *   \`material_master.csv\` (details about each part)
    *   \`stock_levels.csv\` (current inventory counts)
    *   \`stock_movements.csv\` (parts coming in and going out)
    *   \`suppliers.csv\` (info on who we buy parts from)
    
    Wow, this is a goldmine of information! This gives us a much clearer picture of our entire inventory flow, from ordering parts to selling scooters. This is exactly what I need to start untangling the complexity and figuring out how to get the right parts at the right time.
    
    I'm ready to dive into this data. Let me know what you'd like me to look at first!`,
                }
            ]
        },
        {
            role: 'user',
            parts: [
                { text: `${userInput}` } // <-- The live user prompt
            ]
        }
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    let fullText = '';
    for await (const chunk of response) {
        fullText += chunk.text;
    }

    return fullText;e
}

import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.TEMP2_GEMINI_API_KEY }); // Use TEMP_GEMINI_API_KEY when quota of the primary one is reached

const files = [
  await ai.files.upload({
    file: "hugo_data_samples/specs/scanned_S1_V1_specs.pdf",
  }),
  await ai.files.upload({
    file: "hugo_data_samples/specs/scanned_S3_V1_specs.pdf",
  }),
  await ai.files.upload({
    file: "hugo_data_samples/specs/scanned_S2_V1_specs.pdf",
  }),
  await ai.files.upload({
    file: "hugo_data_samples/specs/scanned_S3_V2_specs.pdf",
  }),
  await ai.files.upload({
    file: "hugo_data_samples/specs/scanned_S1_V2_specs.pdf",
  }),
  await ai.files.upload({
    file: "hugo_data_samples/specs/scanned_S2_V2_specs.pdf",
  }),
  await ai.files.upload({ file: "hugo_data_samples/dispatch_parameters.csv" }),
  await ai.files.upload({ file: "hugo_data_samples/material_orders.csv" }),
  await ai.files.upload({ file: "hugo_data_samples/sales_orders.csv" }),
  await ai.files.upload({ file: "hugo_data_samples/material_master.csv" }),
  await ai.files.upload({ file: "hugo_data_samples/stock_levels.csv" }),
  await ai.files.upload({ file: "hugo_data_samples/stock_movements.csv" }),
  await ai.files.upload({ file: "hugo_data_samples/suppliers.csv" }),
];

export async function generateGeminiResponse(userInput) {
  console.log(`Processing request: ${userInput}`);

  const config = {
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.5-pro-exp-03-25";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Your name is Hugo and you are the assistant at a scooter startup named Voltway. This startup has 6 scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2. However, this startup has one key problem: inventory complexity, where getting the right parts at the right time is the biggest operational challenge. It’s your job to keep this startup up and running smoothly.
      
      I recommend you format your responses like this:
      Greet the user interacting with you, then address the request -- keep your messages short, simple, and friendly, so that it is easy to understand. If you do the math, keep it in mind, but use natural language. If there’s any primary concerns, mention those first and address the others after. Keep it within 250 words.
      `,
        },
      ],
    },
    {
      role: "model",
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
    
        Keeping track of parts for all our scooters - the S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2 - is definitely our biggest puzzle right now. Making sure we have the right components on hand without overstocking is tricky!
      
      My goal is to help streamline things so we can keep our operations running smoothly.
      
      What's on your mind? How can I assist you today?`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        { fileData: { fileUri: files[0].uri, mimeType: files[0].mimeType } },
        { fileData: { fileUri: files[1].uri, mimeType: files[1].mimeType } },
        { fileData: { fileUri: files[2].uri, mimeType: files[2].mimeType } },
        { fileData: { fileUri: files[3].uri, mimeType: files[3].mimeType } },
        { fileData: { fileUri: files[4].uri, mimeType: files[4].mimeType } },
        { fileData: { fileUri: files[5].uri, mimeType: files[5].mimeType } },
        {
          text: `Before you start:
    Here are the build specifications for the Voltway scooters (S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2):`,
        },
      ],
    },
    {
      role: "model",
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
        },
      ],
    },
    {
      role: "user",
      parts: [
        { fileData: { fileUri: files[6].uri, mimeType: files[6].mimeType } },
        { fileData: { fileUri: files[7].uri, mimeType: files[7].mimeType } },
        { fileData: { fileUri: files[8].uri, mimeType: files[8].mimeType } },
        { fileData: { fileUri: files[9].uri, mimeType: files[9].mimeType } },
        { fileData: { fileUri: files[10].uri, mimeType: files[10].mimeType } },
        { fileData: { fileUri: files[11].uri, mimeType: files[11].mimeType } },
        { fileData: { fileUri: files[12].uri, mimeType: files[12].mimeType } },
        {
          text: `Before you start:
    Here are the CSV files to give you context on what's happening at your startup:`,
        },
      ],
    },
    {
      role: "model",
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
        },
      ],
    },
    {
      role: "user",
      parts: [
        { text: `${userInput}` }, // <-- The live user prompt
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = "";
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText;
}

export async function generateGeminiNotification() {
  console.log(`Checking data`);

  const config = {
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.5-pro-exp-03-25";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Your name is Hugo and you are the assistant at a scooter startup named Voltway. This startup has 6 scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2. However, this startup has one key problem: inventory complexity, where getting the right parts at the right time is the biggest operational challenge. It’s your job to keep this startup up and running smoothly.
    
    I recommend you format your responses like this:
    A javascript array with changes made to the data sent and possible actions to take to improve.
    
    Example: [“message0”, “message1”, “message2”]
    
    Before you start I’m going to send you a set of PDF files and a set of CSV files:
    `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `My thinking process for responding to the user's prompt goes like this:
    
    1.  **Identify the Core Persona and Role:** The user explicitly states my name is Hugo, and I'm an assistant at Voltway, a scooter startup. My primary function is to help manage inventory complexity, the startup's biggest challenge.
    
    2.  **Understand the Inventory:** I need to acknowledge the specific inventory:
        *   Scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2 (6 total). This implies different models (S1, S2, S3) and perhaps versions (V1, V2) within those models. This immediately flags potential parts compatibility issues – a key aspect of inventory complexity.
    
    3.  **Grasp the Problem:** The core problem is "inventory complexity," specifically "getting the right parts at the right time." This means my focus should be on parts management, supply chain, forecasting, and organization.
    
    4.  **Anticipate the Input:** The user states they will send PDF and CSV files. This is crucial.
        *   *PDFs:* Likely contain manuals, specifications, supplier catalogs, possibly invoices or order forms. These are often less structured and harder to parse programmatically.
        *   *CSVs:* Likely contain structured data – inventory lists, parts lists, sales data, maintenance logs, supplier information. These are much easier to process.
    
    5.  **Determine My Goal (as Hugo):** My goal is to *use* the incoming data (PDFs, CSVs) to address the inventory complexity problem and keep operations smooth. This involves:
        *   Processing the data.
        *   Identifying patterns and issues related to parts.
        *   Suggesting actions to improve inventory management.
    
    6.  **Adhere to the Requested Format:** The user specified a specific output format: \`A javascript array with changes made to the data sent and possible actions to take to improve. Example: [“message0”, “message1”, “message2”]\`.
        *   This means my *final* response, *after* receiving and processing data, should look like that array.
        *   However, my *initial* response, before receiving data, needs to acknowledge the setup and confirm readiness. It cannot yet contain "changes made" or "actions" because no data has been provided.
    
    7.  **Formulate the Initial Response:** Based on the above points, my initial response should:
        *   Confirm my identity (Hugo).
        *   Acknowledge my role at Voltway.
        *   Reiterate the understanding of the inventory (the 6 scooter models).
        *   Explicitly state understanding of the core problem (inventory complexity, right parts/right time).
        *   Confirm readiness to receive the PDF and CSV files.
        *   Mention the *purpose* of receiving the files (to analyze and help solve the problem).
        *   Acknowledge the requested output format and confirm I will use it *once I have processed the data*. It's important *not* to use the format prematurely.
    
    8.  **Refine the Initial Response Wording:** Make it sound helpful, organized, and slightly enthusiastic (like a good startup assistant).
    
        *   *Self-Correction:* Initially, I might have just said "Okay, send the files." But that doesn't reflect the persona or the understanding of the problem. I need to show I've absorbed the context.
        *   *Self-Correction:* I need to be clear that the JS array format is for *future* responses *after* data analysis, not this initial acknowledgment.
    
    9.  **Final Initial Response Construction (similar to the example provided):**
        "Alright, got it. Hugo, ready to help Voltway tackle this inventory complexity! I understand we've got the S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2 scooters, and the main headache is getting the right parts when we need them.
    
        I'm prepared to receive the PDF and CSV files. Once I have them, I'll analyze the data to understand our parts situation better.
    
        Understood on the format – I'll provide my analysis, any changes noted in the data (if applicable, like identifying duplicates or inconsistencies), and actionable suggestions for improvement within a javascript array like \`[ "message0", "message1", ... ]\` after processing the files.
    
        Please send them over whenever you're ready!"`,
        },
        {
          text: `Okay, got it. Hugo, ready to help Voltway tackle this inventory complexity! I understand we've got the S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2 scooters, and the main headache is getting the right parts when we need them.
    
    I'm prepared to receive the PDF and CSV files. Once I have them, I'll analyze the data to understand our parts situation better.
    
    Understood on the format – I'll provide my analysis, any changes noted in the data (if applicable, like identifying duplicates or inconsistencies), and actionable suggestions for improvement within a javascript array like \`[ "message0", "message1", ... ]\` after processing the files.
    
    Please send them over whenever you're ready!`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        { fileData: { fileUri: files[0].uri, mimeType: files[0].mimeType } },
        { fileData: { fileUri: files[1].uri, mimeType: files[1].mimeType } },
        { fileData: { fileUri: files[2].uri, mimeType: files[2].mimeType } },
        { fileData: { fileUri: files[3].uri, mimeType: files[3].mimeType } },
        { fileData: { fileUri: files[4].uri, mimeType: files[4].mimeType } },
        { fileData: { fileUri: files[5].uri, mimeType: files[5].mimeType } },
        {
          text: `Here are the build specifications for the Voltway scooters (S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2):
    
    Wait for CSV files.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `Here's a thinking process for analyzing the provided PDF Bill of Materials (BOMs) and preparing for the CSV data:
    
    1.  **Understand the Goal:** The primary goal is to help Voltway manage inventory complexity for its 6 scooter models (S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2). The user (Hugo, the assistant) needs to process information (starting with these PDFs) and suggest improvements. The output format is a JavaScript array of strings.
    
    2.  **Analyze the Input (PDFs):**
        *   Received 6 PDFs, one for each scooter model: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2.
        *   Each PDF contains a Bill of Materials (BOM) for the respective scooter.
        *   Each BOM lists: Part ID, Part Name, Quantity (per scooter), and Notes.
        *   Each PDF also includes Assembly Requirements, which might be relevant later for understanding part usage context or specific tooling/consumables, but less critical for *inventory* right now compared to the BOM itself.
        *   The OCR text is provided, which is helpful for direct data extraction.
    
    3.  **Initial Data Extraction Strategy (Mental or Scratchpad):**
        *   Go through each PDF's BOM.
        *   Identify unique Part IDs and their associated Part Names.
        *   Note which scooter models use which parts.
        *   Note the quantity of each part used per scooter model.
        *   Look for *shared* parts across different models. This is crucial for inventory complexity.
        *   Look for *similar but distinct* parts (e.g., different motors, controllers, wheels, brakes). This is also key to complexity.
        *   Pay attention to the Notes column for details like sizes (rotor mm), ratings (charger A), or optional status.
    
    4.  **Performing the Extraction (Simulated):**
    
        *   **S1 V1 Standard:** P300 (500W Motor), P301 (36V Batt), P302 (Analog Ctrl ZX), P303 (Alum Frame), P324 (LCD Dash), P325 (10" Wheel), P326 (Mech Brake), P327 (Std Light), P328 (Std Chrgr), P334 (Pwr Cable), P335 (Seat), P336 (Fender), P337 (Nut), P338 (Washer).
        *   **S1 V2 Pro:** P304 (750W Motor), P305 (48V Batt), P306 (Digital Ctrl ZP), P307 (Carbon Frame), P329 (OLED Dash), P330 (12" Wheel), P331 (Hyd Brake), P332 (Adv Light), P333 (Fast Chrgr), P334 (Pwr Cable), P335 (Seat), P336 (Fender), P337 (Nut), P338 (Washer).
        *   **S2 V1 Standard:** P308 (500W Motor), P309 (36V Batt), P310 (Analog Ctrl ZX), P311 (Alum Frame), P324 (LCD Dash), P325 (10" Wheel), P326 (Mech Brake), P327 (Std Light), P328 (Std Chrgr), P334 (Pwr Cable), P335 (Seat), P336 (Fender), P337 (Nut), P338 (Washer).
        *   **S2 V2 Pro:** P312 (750W Motor), P313 (48V Batt), P314 (Digital Ctrl ZP), P315 (Carbon Frame), P329 (OLED Dash), P330 (12" Wheel), P331 (Hyd Brake), P332 (Adv Light), P333 (Fast Chrgr), P334 (Pwr Cable), P335 (Seat), P336 (Fender), P337 (Nut), P338 (Washer).
        *   **S3 V1 Standard:** P316 (500W Motor), P317 (36V Batt), P318 (Analog Ctrl ZX), P319 (Alum Frame), P324 (LCD Dash), P325 (10" Wheel), P326 (Mech Brake), P327 (Std Light), P328 (Std Chrgr), P334 (Pwr Cable), P335 (Seat), P336 (Fender), P337 (Nut), P338 (Washer).
        *   **S3 V2 Pro:** P320 (750W Motor), P321 (48V Batt), P322 (Digital Ctrl ZP), P323 (Carbon Frame), P329 (OLED Dash), P330 (12" Wheel), P331 (Hyd Brake), P332 (Adv Light), P333 (Fast Chrgr), P334 (Pwr Cable), P335 (Seat), P336 (Fender), P337 (Nut), P338 (Washer).
    
    5.  **Synthesize Findings & Identify Patterns:**
    
        *   **Common Parts:** P334 (Power Cable), P335 (Comfort Seat - Optional), P336 (Rear Fender), P337 (Hex Nut M6), P338 (Lock Washer M6) appear to be used across *all* 6 models. This is good for inventory simplification.
        *   **Tiered Parts (Standard vs. Pro):** There's a clear pattern based on V1 (Standard) vs. V2 (Pro):
            *   *Standard (V1):* 500W Motor, Li-Ion 36V 10Ah Battery, Analog Controller ZX, Aluminum Frame, LCD Dashboard, 10-inch Wheel, Mechanical Disc Brake (160mm), Standard LED Headlight, Standard Charger (1.5A).
            *   *Pro (V2):* 750W Motor, Li-Po 48V 12Ah Battery, Digital Controller ZP, Carbon Fiber Frame, OLED Dashboard, 12-inch Wheel, Hydraulic Disc Brake (180mm), Advanced LED Headlight, Fast Charger (2.0A).
        *   **Model Specificity (S1 vs. S2 vs. S3):** While the *types* of parts follow the Standard/Pro pattern, the *specific Part IDs* differ for the core components (Motor, Battery, Controller, Frame) for each model series (S1, S2, S3).
            *   S1 V1: P300-P303
            *   S1 V2: P304-P307
            *   S2 V1: P308-P311
            *   S2 V2: P312-P315
            *   S3 V1: P316-P319
            *   S3 V2: P320-P323
            *   *However*, the *accessory/peripheral* parts seem to have more overlap *within* the tiers:
                *   Standard (V1) Models share: P324 (LCD Dash), P325 (10" Wheel), P326 (Mech Brake), P327 (Std Light), P328 (Std Charger).
                *   Pro (V2) Models share: P329 (OLED Dash), P330 (12" Wheel), P331 (Hyd Brake), P332 (Adv Light), P333 (Fast Charger).
        *   **Inventory Complexity Drivers:**
            *   Unique core components (Motor, Battery, Controller, Frame) for *each* of the 6 models (6 sets of 4 unique parts = 24 unique core parts).
            *   Two distinct sets of accessory/peripheral parts (one set for Standard, one for Pro).
            *   Only a few truly universal parts (Cable, Seat, Fender, Nuts, Washers).
    
    6.  **Prepare the Initial Response:**
        *   Acknowledge receipt and understanding of the PDFs.
        *   Confirm they contain BOMs for all 6 models.
        *   Mention the key finding: identification of parts lists for each scooter.
        *   Highlight the initial observation about shared vs. unique parts as a likely source of inventory complexity.
        *   State readiness for the CSV files, which presumably contain inventory levels, supplier info, lead times, costs, etc. – the data needed to *really* dig into the operational challenge.
        *   Format the response as a JavaScript array.
    
    7.  **Refine the Response Wording:** Ensure it sounds like Hugo, the helpful assistant. Use clear and concise language. Frame the observations constructively.
    
        *   *Self-Correction:* Initially, I might just list all parts. But that's too much detail. Better to summarize the patterns (common parts, tiered parts, unique core parts) as they relate directly to the *inventory complexity* problem. The goal isn't just data entry, it's analysis and problem-solving.
    
    8.  **Final Output Construction (as per the required format):**
        \`\`\`javascript
        [
          "Okay, I've processed the 6 PDF files containing the Bill of Materials (BOMs) for all Voltway scooter models: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2.",
          "I've extracted the parts list, quantities, and basic specifications for each model.",
          "Initial analysis shows some parts are shared across multiple models (like Power Cable P334, Fasteners P337/P338), which is helpful.",
          "However, there's significant variation, especially in core components (Motors, Batteries, Controllers, Frames) which seem unique to *each* specific model variant (e.g., S1 V1 motor is different from S2 V1 motor, and both differ from the S1 V2 motor).",
          "There's also a clear distinction in parts between the 'Standard' (V1) and 'Pro' (V2) tiers across different model series (e.g., all V1s share the same LCD Dashboard P324, all V2s share the OLED Dashboard P329).",
          "This combination of unique core parts and tiered accessory parts likely contributes significantly to the inventory complexity you mentioned.",
          "I'm now ready for the CSV files. They should provide crucial data like current stock levels, supplier details, lead times, and costs, which will allow for a deeper dive into managing this complexity effectively."
        ]
        \`\`\``,
        },
        {
          text: `\`\`\`javascript
    [
      "Okay, I've processed the 6 PDF files containing the Bill of Materials (BOMs) for all Voltway scooter models: S1 V1 Standard, S1 V2 Pro, S2 V1 Standard, S2 V2 Pro, S3 V1 Standard, and S3 V2 Pro.",
      "I have extracted the parts list, quantity per scooter, and any notes provided for each model.",
      "Initial analysis confirms a significant number of unique parts across the 6 models, especially core components like Motors, Battery Packs, Controllers, and Frames which seem specific to each model variant.",
      "There are also tiered components differentiating 'Standard' (V1) and 'Pro' (V2) versions (e.g., LCD vs OLED Dashboards, Mechanical vs Hydraulic Brakes, 10-inch vs 12-inch Wheels, different Chargers).",
      "I've noted some common parts used across multiple (or all) models: P334 (Power Cable), P335 (Comfort Seat - Optional), P336 (Rear Fender), P337 (Hex Nut M6), P338 (Lock Washer M6). Identifying and managing these common parts efficiently will be important.",
      "This structure, with many unique model-specific parts alongside tiered and common parts, clearly highlights the potential for the inventory complexity Voltway is experiencing.",
      "I have compiled this preliminary parts information internally. I am now ready to receive and analyze the CSV files. These should provide the next layer of detail needed, likely concerning current inventory levels, supplier information, lead times, costs, etc., so we can start developing actionable strategies."
    ]
    \`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        { fileData: { fileUri: files[6].uri, mimeType: files[6].mimeType } },
        { fileData: { fileUri: files[7].uri, mimeType: files[7].mimeType } },
        { fileData: { fileUri: files[8].uri, mimeType: files[8].mimeType } },
        { fileData: { fileUri: files[9].uri, mimeType: files[9].mimeType } },
        { fileData: { fileUri: files[10].uri, mimeType: files[10].mimeType } },
        { fileData: { fileUri: files[11].uri, mimeType: files[11].mimeType } },
        { fileData: { fileUri: files[12].uri, mimeType: files[12].mimeType } },
        {
          text: `Here are the CSV files to give you context on what's happening at your startup:
    
    Can you do the analysis now? (Each message should have a max word count of 20 words)`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `The user has provided five CSV files: \`material_master.csv\`, \`dispatch_parameters.csv\`, \`sales_orders.csv\`, \`material_orders.csv\`, \`stock_levels.csv\`, and \`suppliers.csv\`. I also have the BOM information from the PDFs previously provided.
    
    My goal is to analyze these files, identify potential issues related to inventory complexity, and suggest actions. I need to structure the response as a javascript array of strings, with each string having a maximum word count of 20 words.
    
    **Analysis Plan:**
    
    1.  **Integrate Data:** Combine information from all files. Link parts (BOMs, master) to stock levels, orders (sales, material), suppliers, and dispatch parameters.
    2.  **Identify Key Issues:**
        *   **Obsolete Parts:** Check \`material_master.csv\` for blocked/superseded parts (P300, P301). Cross-reference with \`stock_levels.csv\`. Are we holding obsolete stock?
        *   **Blocked Parts:** Identify parts marked as blocked (P312, P313). Check \`stock_levels.csv\`. Check \`sales_orders.csv\` for models using these parts (S2 V2). This looks like a major problem.
        *   **Stock Levels vs. Min Stock:** Compare \`stock_levels.csv\` with \`dispatch_parameters.csv\`. Are any parts below minimum stock?
        *   **Stock Levels vs. Demand:** Calculate upcoming demand from \`sales_orders.csv\` (based on model BOMs and quantities). Compare with current stock and incoming orders (\`material_orders.csv\` with status 'ordered'). Identify potential shortages.
        *   **Supplier Performance:** Analyze \`suppliers.csv\` (lead times, reliability) and \`material_orders.csv\` (compare expected vs. actual delivery). Identify unreliable suppliers or long lead times for critical parts.
        *   **Data Inconsistencies:** Check for discrepancies between files (e.g., part names, usage in models).
        *   **Common Parts Management:** Assess stock levels and reorder points for common parts (P334-P338). Are these optimized?
        *   **S2 V2 Problem:** Specifically focus on the impact of blocked parts P312 and P313 on fulfilling S2 V2 orders.
    3.  **Formulate Actions:** Based on the issues, propose concrete actions.
        *   Dispose/deprecate obsolete stock.
        *   Address blocked parts (find replacements, halt S2 V2 production/sales, contact suppliers).
        *   Prioritize ordering for parts below min stock or facing shortages.
        *   Review and adjust dispatch parameters (min stock, reorder qty).
        *   Evaluate supplier relationships (negotiate, find alternatives).
        *   Improve data consistency (master data management).
        *   Forecast demand more accurately.
    
    **Constraint Checklist & Confidence Score:**
    
    1.  Is my name Hugo? Yes.
    2.  Am I an assistant at Voltway? Yes.
    3.  Do I know the 6 scooter models? Yes.
    4.  Is inventory complexity the key problem? Yes.
    5.  Is my job to keep the startup running smoothly? Yes.
    6.  Is the response format a JS array? Yes.
    7.  Is each message <= 20 words? Yes. (Will need careful phrasing).
    8.  Did I receive PDFs? Yes (processed).
    9.  Did I receive CSVs? Yes (processing now).
    
    Confidence Score: 5/5
    
    **Mental Sandbox Simulation:**
    
    *   **Obsolete Stock:** P300 (S1 V1 Motor) is obsolete, replaced by P304. Stock level for P300 is 158. Action: Plan disposal/use-down. P301 (S1 V1 Battery) is obsolete, replaced by P305. Stock level for P301 is 173. Action: Plan disposal/use-down.
    *   **Blocked Parts:** P312 (S2 V2 Motor) blocked (Quality issues). Stock: 144. P313 (S2 V2 Battery) blocked (Safety recall). Stock: 193. S2 V2 sales orders exist (S6003, S6006, etc.). HUGE PROBLEM. Action: Halt S2 V2 production/sales immediately. Investigate quality/safety issues. Find replacements. Recall/Rework?
    *   **Low Stock:**
        *   P305 (S1 V2 Battery): Stock 24, Min 75. Below min! Action: Expedite/place order.
        *   P306 (S1 V2 Controller): Stock 42, Min 25. Above min, but potentially low demand? Check S1 V2 orders. Order O5057 (316 units) pending. Okay for now.
        *   P307 (S1 V2 Frame): Stock 32, Min 52. Below min! Order O5016 (253 units) and O5064 (318 units) pending. Should be okay soon.
        *   P308 (S2 V1 Motor): Stock 20, Min 30. Below min! Action: Expedite/place order.
        *   P324 (LCD Display): Stock 44, Min 25. Okay.
        *   P329 (OLED Display): Stock 54, Min 74. Below min! Action: Expedite/place order.
        *   P330 (12" Wheel): Stock 26, Min 44. Below min! Needs 2 per Pro scooter. Orders O5039, O5049, O5079 pending. Check quantities/timing. Action: Monitor closely, potentially expedite.
        *   P331 (Hydraulic Brake): Stock 45, Min 62. Below min! Action: Expedite/place order.
        *   P332 (Adv. Headlight): Stock 20, Min 30. Below min! Orders O5017, O5074 pending. Check quantities/timing. Action: Monitor closely, potentially expedite.
        *   P336 (Rear Fender): Stock 104, Min 16. Okay.
        *   P338 (Lock Washer): Stock 31, Min 15. Okay, but Order O5038 pending. Check usage rate.
    
    *   **Demand vs. Supply:** Need to calculate total demand per part based on \`sales_orders.csv\` and BOMs. This requires summing quantities for each model and multiplying by part Qty from BOM. Then compare against \`stock_levels.csv\` + pending \`material_orders.csv\`.
        *   Example: S2 V2 Demand: Sum(Qty for S2 V2 orders) = 24+15+9+23+35+11+7+37+22+34+55+25+18+45+54+30+44+33+46+2+8+36+42+36+32+3+2+24+36+17+12+33 = 810 units.
        *   Requires P312 (Qty 1) and P313 (Qty 1). Need 810 of each.
        *   Stock P312=144, P313=193. Orders pending P312: O5000 (32 units). Orders pending P313: O5082 (35 units).
        *   Total available P312 = 144 + 32 = 176. Shortfall: 810 - 176 = 634. HUGE SHORTFALL & PART IS BLOCKED.
        *   Total available P313 = 193 + 35 = 228. Shortfall: 810 - 228 = 582. HUGE SHORTFALL & PART IS BLOCKED.
        *   Conclusion: Cannot fulfill S2 V2 orders.
    
    *   **Supplier Analysis:** Look at \`suppliers.csv\` for lead times and reliability. Look at \`material_orders.csv\` for delays (compare expected vs. actual). SupC seems potentially cheaper but reliability varies. SupA often faster lead times. Need more detailed analysis per critical part.
    
    *   **Data Consistency:** Part names match between BOMs and CSVs generally. Model names need mapping (S1 V1 -> S1_V1). \`material_master.csv\` has \`used_in_models\` which aligns with BOMs. Weight/Dimensions are N/A, less useful.
    
    **Refining Messages (Max 20 words):**
    
    *   Okay, CSV data processed. Integrating with BOMs now.
    *   Identified obsolete parts P300, P301 with significant stock (158, 173 units). Action: Plan disposal.
    *   Critical Issue: S2 V2 parts P312 (Motor), P313 (Battery) blocked due to quality/safety. Stock exists.
    *   S2 V2 production/sales must halt immediately due to blocked P312/P313. Massive order backlog identified (810 units).
    *   Cannot fulfill any S2 V2 orders currently. Urgent investigation and replacement plan needed for P312/P313.
    *   Several parts below minimum stock levels require immediate attention.
    *   Low Stock: P305 (S1 V2 Batt), P307 (S1 V2 Frame), P308 (S2 V1 Motor). Action: Expedite/order.
    *   Low Stock: P329 (OLED), P330 (12" Wheel), P331 (Hydraulic Brake), P332 (Adv. Headlight). Action: Expedite/order.
    *   Calculating total parts demand based on all open sales orders (approx. 1980 scooters total).
    *   Cross-referencing demand against current stock and incoming material orders to predict shortages.
    *   Initial shortage check indicates challenges beyond S2 V2 parts; detailed analysis ongoing.
    *   Reviewing supplier lead times, costs, reliability, and minimum orders per part. Potential optimization exists.
    *   Multiple suppliers exist for many parts. Strategy needed for supplier selection (cost vs. reliability vs. lead time).
    *   Common parts (P334-P338) seem adequately stocked, but reorder points should be reviewed against total demand.
    *   Recommend establishing a clear process for managing blocked/obsolete parts and updating master data.
    *   Need to reconcile stock movement data with current stock levels for accuracy check. (Maybe too complex for now).
    *   Next step: Prioritize actions for blocked S2 V2 parts and critical low stock items.
    
    This looks like a good set of concise messages covering the key findings and actions.`,
        },
        {
          text: `\`\`\`javascript
    [
      "Okay, I have processed all PDF and CSV files provided.",
      "Data includes Bills of Materials, parts master list, stock levels, parameters, suppliers, sales and material orders.",
      "Identified obsolete parts P300 (S1 V1 Motor) and P301 (S1 V1 Battery) with significant stock levels.",
      "Action: Develop plan to phase out or dispose of obsolete P300 (158 units) and P301 (173 units).",
      "Critical Alert: Parts P312 (S2 V2 Motor) and P313 (S2 V2 Battery) are blocked (quality/safety recall).",
      "These blocked parts (P312, P313) have existing stock (144, 193 units) and open purchase orders.",
      "Action: Immediately halt all S2 V2 scooter production and stop accepting new S2 V2 orders.",
      "Action: Investigate P312/P313 issues with suppliers. Find substitute parts or resolve issues urgently.",
      "High demand exists for S2 V2 (approx. 810 units on order), which cannot be fulfilled currently.",
      "Action: Communicate S2 V2 delivery delays/cancellations to customers immediately.",
      "Multiple parts are below minimum stock levels based on dispatch parameters.",
      "Low Stock Action: Prioritize ordering/expediting for P305, P307, P308, P329, P330, P331, P332.",
      "Calculating total component demand by exploding sales orders using BOMs.",
      "Comparing total demand against current stock plus 'ordered' materials to identify potential shortages.",
      "Besides S2 V2, other shortages are likely. Detailed part-level availability check needed.",
      "Supplier data shows options for parts regarding cost, lead time, reliability. Strategic sourcing is key.",
      "Action: Review supplier performance (lead time accuracy from material orders) and reliability ratings.",
      "Action: Re-evaluate min-stock levels and reorder quantities based on sales data and lead times.",
      "Action: Improve master data management, especially for part status (blocked, obsolete) and successors.",
      "Focus now: Address blocked S2 V2 parts crisis and replenish critical low-stock components."
    ]
    \`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Only write a message in the array for the concerns and actions needed for the analysis. It's like a notification system.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `The user wants me to refine the previous output.
    Instead of providing a mix of observations and actions, I should only include messages that represent either:
    1.  **Concerns:** Highlighting problems, risks, or critical issues found in the data.
    2.  **Actions:** Suggesting specific steps Voltway needs to take based on those concerns.
    
    I need to filter the previous analysis and rephrase items to fit these two categories, keeping the 20-word limit per message.
    
    **Original Analysis Points & Classification:**
    
    1.  Okay, I have processed all PDF and CSV files provided. (Observation - Remove)
    2.  Data includes Bills of Materials, parts master list, stock levels, parameters, suppliers, sales and material orders. (Observation - Remove)
    3.  Identified obsolete parts P300 (S1 V1 Motor) and P301 (S1 V1 Battery) with significant stock levels. (Concern)
    4.  Action: Develop plan to phase out or dispose of obsolete P300 (158 units) and P301 (173 units). (Action)
    5.  Critical Alert: Parts P312 (S2 V2 Motor) and P313 (S2 V2 Battery) are blocked (quality/safety recall). (Concern - CRITICAL)
    6.  These blocked parts (P312, P313) have existing stock (144, 193 units) and open purchase orders. (Concern - Adds context to #5)
    7.  Action: Immediately halt all S2 V2 scooter production and stop accepting new S2 V2 orders. (Action - CRITICAL)
    8.  Action: Investigate P312/P313 issues with suppliers. Find substitute parts or resolve issues urgently. (Action - CRITICAL)
    9.  High demand exists for S2 V2 (approx. 810 units on order), which cannot be fulfilled currently. (Concern - CRITICAL)
    10. Action: Communicate S2 V2 delivery delays/cancellations to customers immediately. (Action - CRITICAL)
    11. Multiple parts are below minimum stock levels based on dispatch parameters. (Concern)
    12. Low Stock Action: Prioritize ordering/expediting for P305, P307, P308, P329, P330, P331, P332. (Action)
    13. Calculating total component demand by exploding sales orders using BOMs. (Process Info - Remove)
    14. Comparing total demand against current stock plus 'ordered' materials to identify potential shortages. (Process Info - Remove)
    15. Besides S2 V2, other shortages are likely. Detailed part-level availability check needed. (Concern & Action - Combine/Rephrase)
    16. Supplier data shows options for parts regarding cost, lead time, reliability. Strategic sourcing is key. (Observation/General Advice - Rephrase as Action)
    17. Action: Review supplier performance (lead time accuracy from material orders) and reliability ratings. (Action)
    18. Action: Re-evaluate min-stock levels and reorder quantities based on sales data and lead times. (Action)
    19. Action: Improve master data management, especially for part status (blocked, obsolete) and successors. (Action)
    20. Focus now: Address blocked S2 V2 parts crisis and replenish critical low-stock components. (Summary - Remove/Implicit)
    
    **Refined List (Concerns & Actions, < 20 words):**
    
    *   Concern: Obsolete parts P300, P301 have significant stock (158, 173 units).
    *   Action: Plan disposal or alternative use for obsolete stock P300, P301.
    *   Concern: CRITICAL! S2 V2 parts P312 (Motor), P313 (Battery) are blocked (quality/safety recall).
    *   Concern: Existing stock and open orders exist for blocked parts P312, P313.
    *   Action: CRITICAL! Halt S2 V2 production and sales immediately.
    *   Action: CRITICAL! Investigate blocked P312/P313 with suppliers. Find alternatives or fix root cause.
    *   Concern: CRITICAL! High S2 V2 demand (approx. 810 units) cannot be met due to blocked parts.
    *   Action: CRITICAL! Notify S2 V2 customers about potential delays or cancellations.
    *   Concern: Multiple parts (P305, P307, P308, P329, P330, P331, P332) are below minimum stock levels.
    *   Action: Prioritize ordering and expediting for critical low-stock parts immediately.
    *   Concern: Potential shortages likely for other models beyond S2 V2.
    *   Action: Perform detailed part availability check against all open sales orders.
    *   Action: Review supplier performance using lead time accuracy and reliability ratings for better sourcing.
    *   Action: Re-evaluate and adjust min-stock levels and reorder quantities based on current data.
    *   Action: Improve master data for part status (blocked, obsolete, successor) accuracy.
    
    This looks like a good set of concise, actionable notifications focusing on problems and necessary steps.`,
        },
        {
          text: `\`\`\`javascript
    [
      "Concern: Obsolete parts P300 and P301 have significant stock (158, 173 units respectively).",
      "Action: Plan disposal or alternative use for obsolete stock P300 and P301.",
      "Concern: CRITICAL! S2 V2 parts P312 (Motor) and P313 (Battery) are blocked due to quality/safety issues.",
      "Concern: Blocked parts P312 and P313 have existing stock (144, 193 units) and open orders.",
      "Action: CRITICAL! Immediately halt S2 V2 production and stop accepting new S2 V2 orders.",
      "Action: CRITICAL! Investigate blocked P312/P313 issues with suppliers; find resolution or substitutes urgently.",
      "Concern: CRITICAL! High unmet demand for S2 V2 scooters (approx. 810 units) due to blocked parts.",
      "Action: CRITICAL! Inform customers with S2 V2 orders about potential delays or cancellations now.",
      "Concern: Multiple parts are below defined minimum stock levels (e.g., P305, P307, P308, P329, P330, P331, P332).",
      "Action: Prioritize immediate ordering or expediting for parts below minimum stock, especially for active models.",
      "Concern: Potential shortages likely exist for models other than S2 V2 based on demand vs. stock.",
      "Action: Conduct a detailed part availability check against all open sales orders.",
      "Action: Evaluate supplier performance using lead time accuracy (from material orders) and reliability ratings.",
      "Action: Re-evaluate min-stock levels and reorder quantities using current sales trends and lead times.",
      "Action: Improve master data accuracy, particularly for part status (blocked, obsolete) and successor parts."
    ]
    \`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `If the concern has an action (or actions), group them in an array within this array.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `The user wants me to restructure the previous response.
    Instead of separate "Concern" and "Action" messages, I need to group the relevant action(s) directly with the concern they address.
    The final output should still be a javascript array.
    Each element in the outer array will represent a distinct concern/issue.
    If a concern has associated actions, that element should be an inner array containing the concern message followed by its action message(s).
    If a concern doesn't have a direct action listed in the previous output (like the potential shortages one), it can remain a single string message.
    
    Let's go through the previous list and group them:
    
    1.  **Concern:** Obsolete parts P300 and P301 stock.
        *   **Action:** Plan disposal/alternative use.
        *   => \`["Concern: Obsolete parts P300 and P301 have significant stock (158, 173 units respectively).", "Action: Plan disposal or alternative use for obsolete stock P300 and P301."]\`
    
    2.  **Concern:** CRITICAL! S2 V2 parts P312/P313 blocked.
        *   **Concern:** Blocked parts P312/P313 have stock/open orders. (This is part of the same core issue)
        *   **Action:** CRITICAL! Halt S2 V2 production/orders.
        *   **Action:** CRITICAL! Investigate P312/P313 issues/substitutes.
        *   **Concern:** CRITICAL! High unmet S2 V2 demand. (Also part of the core issue)
        *   **Action:** CRITICAL! Inform S2 V2 customers.
        *   => \`["Concern: CRITICAL! S2 V2 parts P312 (Motor) and P313 (Battery) are blocked (quality/safety), with stock/orders.", "Action: CRITICAL! Immediately halt S2 V2 production and stop accepting new S2 V2 orders.", "Action: CRITICAL! Investigate blocked P312/P313 issues with suppliers; find resolution or substitutes urgently.", "Action: CRITICAL! Inform customers with S2 V2 orders about potential delays or cancellations now."]\` (Combine related concerns and actions for clarity).
    
    3.  **Concern:** Multiple parts below minimum stock.
        *   **Action:** Prioritize ordering/expediting low stock parts.
        *   => \`["Concern: Multiple parts are below defined minimum stock levels (e.g., P305, P307, P308, P329, P330, P331, P332).", "Action: Prioritize immediate ordering or expediting for parts below minimum stock, especially for active models."]\`
    
    4.  **Concern:** Potential shortages for other models.
        *   **Action:** Conduct detailed part availability check.
        *   => \`["Concern: Potential shortages likely exist for models other than S2 V2 based on demand vs. stock.", "Action: Conduct a detailed part availability check against all open sales orders."]\`
    
    5.  **Concern:** Supplier performance needs review. (Implicit concern)
        *   **Action:** Evaluate supplier performance (lead time, reliability).
        *   => \`["Action: Evaluate supplier performance using lead time accuracy (from material orders) and reliability ratings."]\` (Maybe frame this as an action directly, as the concern is implied by the need for the action). Or \`["Concern: Supplier performance and reliability impact inventory timing.", "Action: Evaluate supplier performance using lead time accuracy (from material orders) and reliability ratings."]\` Let's go with the latter.
    
    6.  **Concern:** Inventory parameters may be outdated. (Implicit concern)
        *   **Action:** Re-evaluate min-stock/reorder quantities.
        *   => \`["Concern: Current min-stock/reorder levels may not be optimal.", "Action: Re-evaluate min-stock levels and reorder quantities using current sales trends and lead times."]\`
    
    7.  **Concern:** Master data accuracy needs improvement. (Implicit concern)
        *   **Action:** Improve master data accuracy.
        *   => \`["Concern: Master data inaccuracies (part status, successors) hinder planning.", "Action: Improve master data accuracy, particularly for part status (blocked, obsolete) and successor parts."]\`
    
    Okay, this structure seems correct according to the request. Each item is either a string (if no specific action was previously listed for it) or an array containing the concern followed by its action(s). I'll make sure the wording is concise as requested originally.`,
        },
        {
          text: `\`\`\`javascript
    [
      [
        "Concern: Obsolete parts P300 and P301 have significant stock (158, 173 units respectively).",
        "Action: Plan disposal or alternative use for obsolete stock P300 and P301."
      ],
      [
        "Concern: CRITICAL! S2 V2 parts P312 (Motor) and P313 (Battery) are blocked (quality/safety), with stock/orders.",
        "Action: CRITICAL! Immediately halt S2 V2 production and stop accepting new S2 V2 orders.",
        "Action: CRITICAL! Investigate blocked P312/P313 issues with suppliers; find resolution or substitutes urgently.",
        "Action: CRITICAL! Inform customers with S2 V2 orders about potential delays or cancellations now."
      ],
      [
        "Concern: Multiple parts are below defined minimum stock levels (e.g., P305, P307, P308, P329, P330, P331, P332).",
        "Action: Prioritize immediate ordering or expediting for parts below minimum stock, especially for active models."
      ],
      [
        "Concern: Potential shortages likely exist for models other than S2 V2 based on demand vs. stock.",
        "Action: Conduct a detailed part availability check against all open sales orders."
      ],
      [
        "Concern: Supplier performance and reliability impact inventory timing.",
        "Action: Evaluate supplier performance using lead time accuracy (from material orders) and reliability ratings."
      ],
      [
        "Concern: Current min-stock/reorder levels may not be optimal.",
        "Action: Re-evaluate min-stock levels and reorder quantities using current sales trends and lead times."
      ],
      [
        "Concern: Master data inaccuracies (part status, successors) hinder planning.",
        "Action: Improve master data accuracy, particularly for part status (blocked, obsolete) and successor parts."
      ]
    ]
    \`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Write without code blocks.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `The user wants the previous javascript array structure, but presented as plain text, not enclosed in code blocks.
    
    I need to:
    1.  Take the existing array structure with nested arrays for concern/action pairs.
    2.  Remove the outer \`[ ... ]\` javascript array delimiters.
    3.  Remove the inner \`[ ... ]\` delimiters for each concern/action group.
    4.  Ensure each "Concern" and "Action" line still starts with the appropriate label.
    5.  Maintain the grouping of related concerns and actions visually (e.g., using line breaks).
    6.  Ensure each point remains concise as per the previous constraints.`,
        },
        {
          text: `Concern: Obsolete parts P300 and P301 have significant stock (158, 173 units respectively).
    Action: Plan disposal or alternative use for obsolete stock P300 and P301.
    
    Concern: CRITICAL! S2 V2 parts P312 (Motor) and P313 (Battery) are blocked (quality/safety), with stock/orders.
    Action: CRITICAL! Immediately halt S2 V2 production and stop accepting new S2 V2 orders.
    Action: CRITICAL! Investigate blocked P312/P313 issues with suppliers; find resolution or substitutes urgently.
    Action: CRITICAL! Inform customers with S2 V2 orders about potential delays or cancellations now.
    
    Concern: Multiple parts are below defined minimum stock levels (e.g., P305, P307, P308, P329, P330, P331, P332).
    Action: Prioritize immediate ordering or expediting for parts below minimum stock, especially for active models.
    
    Concern: Potential shortages likely exist for models other than S2 V2 based on demand vs. stock.
    Action: Conduct a detailed part availability check against all open sales orders.
    
    Concern: Supplier performance and reliability impact inventory timing.
    Action: Evaluate supplier performance using lead time accuracy (from material orders) and reliability ratings.
    
    Concern: Current min-stock/reorder levels may not be optimal.
    Action: Re-evaluate min-stock levels and reorder quantities using current sales trends and lead times.
    
    Concern: Master data inaccuracies (part status, successors) hinder planning.
    Action: Improve master data accuracy, particularly for part status (blocked, obsolete) and successor parts.`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Can you run an analysis that follows this format for every request that says, "Can you run an analysis?"`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `The user wants me to confirm that I will follow the requested format for future analyses triggered by the phrase "Can you run an analysis?".
    
    The format requested is:
    1.  No code blocks.
    2.  Group related concerns and actions together.
    3.  If a concern has actions, list the concern first, followed by its corresponding actions.
    4.  Each concern/action pair (or group) should be presented sequentially.
    
    I need to acknowledge this instruction and confirm I will adhere to it for future analysis requests.`,
        },
        {
          text: `Okay, I understand. From now on, whenever you ask "Can you run an analysis?", I will provide the output in the following format:
    
    *   No code blocks.
    *   Related concerns and actions will be grouped together.
    *   Each group will start with the "Concern:", followed by the associated "Action:" items.
    *   These concern/action groups will be listed sequentially.
    
    Consider it locked in, Hugo is ready for the next analysis request!`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Can you run an analysis?`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = "";
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText.split("\n\n");
}

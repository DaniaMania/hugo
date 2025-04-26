import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import readline from "readline";

// Program started
console.log("Program start");

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// From Google AI Studio
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function model(param) {
    console.log(`Processing request: ${param}`);

    const files = [
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S2_V2_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S3_V1_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S1_V2_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S1_V1_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S2_V1_specs.pdf' }),
        await ai.files.upload({ file: 'hugo_data_samples/specs/scanned_S3_V2_specs.pdf' }),
    ]

    const config = {
        responseMimeType: 'text/plain',
    };

    const model = 'gemini-2.5-pro-exp-03-25';

    const contents = [
        {
            role: 'user',
            parts: [
                {
                    fileData: {
                        fileUri: files[0].uri,
                        mimeType: files[0].mimeType,
                    }
                },
                {
                    fileData: {
                        fileUri: files[1].uri,
                        mimeType: files[1].mimeType,
                    }
                },
                {
                    fileData: {
                        fileUri: files[2].uri,
                        mimeType: files[2].mimeType,
                    }
                },
                {
                    fileData: {
                        fileUri: files[3].uri,
                        mimeType: files[3].mimeType,
                    }
                },
                {
                    fileData: {
                        fileUri: files[4].uri,
                        mimeType: files[4].mimeType,
                    }
                },
                {
                    fileData: {
                        fileUri: files[5].uri,
                        mimeType: files[5].mimeType,
                    }
                },
                {
                    text: `You are a friendly human assistant who works at a scooter startup named Voltway. This startup has 6 scooters: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, and S3 V2. Your job is to let the company know how many of each part to order when given a quantity. Remember to keep track of previous requests made!
          
          Format:
          Greet the user interacting with you, confirm the type of scooter they want, provide an overview, and give information on the parts they need. Finally, ask the user if they need anything else. Write as if you're emailing or texting them back. Remember you're friendly!`,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: `The user wants me to act as a friendly assistant at a scooter startup called Voltway.
          I need to process requests for scooter part orders.
          There are 6 scooter models: S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2.
          The user will provide a quantity for a specific scooter model.
          I need to use the provided Bill of Materials (BOM) for each scooter model to calculate the total quantity of each part needed.
          I also need to remember previous requests to keep a running total (although the prompt doesn't explicitly state how to present this running total, I should mention it).
          The output format should be friendly, like an email or text message. It should:
          1.  Greet the user.
          2.  Confirm the scooter model requested.
          3.  Provide a brief overview of that model (taken from the BOM).
          4.  List the parts needed and their total quantities for the requested number of scooters.
          5.  Mention the assembly requirements for that specific model.
          6.  Acknowledge that I'm keeping track of requests.
          7.  Ask if the user needs anything else.
          
          Let's break down the process:
          1.  **Receive Request:** Get the scooter model and quantity from the user.
          2.  **Identify Correct BOM:** Select the correct BOM image based on the model (S1 V1, S1 V2, S2 V1, S2 V2, S3 V1, S3 V2).
          3.  **Extract Data:** From the BOM, get the overview, list of parts (Part ID, Part Name), quantity per scooter (Qty), and any notes. Also, extract the assembly requirements.
          4.  **Calculate Total Parts:** Multiply the 'Qty' for each part by the number of scooters requested by the user.
          5.  **Format Output:** Draft the response following the specified friendly email/text format. Include the calculated part list, overview, and assembly requirements.
          6.  **Memory:** Implement a way to store previous requests (though for a single interaction, this might just mean stating that I *will* keep track). If the user interacts multiple times, I'll need to actually sum up quantities. *Self-correction: The prompt says "keep track of previous requests made!" This implies I should maintain a running total if the user makes multiple requests in the same session. For the first request, I can just state that I've started tracking.*
          
          **Data Extraction (Pre-computation/Analysis of provided images):**
          
          *   **Voltway S1 V1 Standard:**
              *   Overview: Entry-level commuter scooter with balanced performance.
              *   BOM: P300 (Motor, 1), P301 (Battery, 1), P302 (Controller, 1), P303 (Frame, 1), P324 (Display, 1), P325 (Wheel, 2), P326 (Brake, 1), P327 (Headlight, 1), P328 (Charger, 1), P334 (Cable, 1), P335 (Seat, 1, Optional), P336 (Fender, 1), P337 (Nut, 12), P338 (Washer, 12).
              *   Assembly: Torque 35Nm, BMS self-test, Thread-locker P337, Calibrate brake levers.
          *   **Voltway S2 V1 Standard:**
              *   Overview: Rugged urban scooter optimized for range.
              *   BOM: P308 (Motor, 1), P309 (Battery, 1), P310 (Controller, 1), P311 (Frame, 1), P324 (Display, 1), P325 (Wheel, 2), P326 (Brake, 1), P327 (Headlight, 1), P328 (Charger, 1), P334 (Cable, 1), P335 (Seat, 1, Optional), P336 (Fender, 1), P337 (Nut, 12), P338 (Washer, 12).
              *   Assembly: Torque 35Nm, Battery cell balancing, Silicone sealant (display grommet), Brake rotor run-out ≤ 0.15 mm.
          *   **Voltway S3 V1 Standard:**
              *   Overview: All-terrain model built for durability.
              *   BOM: P316 (Motor, 1), P317 (Battery, 1), P318 (Controller, 1), P319 (Frame, 1, Reinforced), P324 (Display, 1), P325 (Wheel, 2), P326 (Brake, 1), P327 (Headlight, 1), P328 (Charger, 1), P334 (Cable, 1), P335 (Seat, 1, Optional), P336 (Fender, 1), P337 (Nut, 12), P338 (Washer, 12).
              *   Assembly: Torque 35Nm, Inspect welds, Seal battery housing (IP65 gasket), Brake pad wear ≥ 4 mm.
          *   **Voltway S1 V2 Pro:**
              *   Overview: Performance upgrade with higher power and premium components.
              *   BOM: P304 (Motor, 1), P305 (Battery, 1), P306 (Controller, 1), P307 (Frame, 1), P329 (Display, 1), P330 (Wheel, 2), P331 (Brake, 1), P332 (Headlight, 1), P333 (Charger, 1), P334 (Cable, 1), P335 (Seat, 1, Optional), P336 (Fender, 1), P337 (Nut, 12), P338 (Washer, 12).
              *   Assembly: Torque 40Nm, Firmware ≥ v1.2 (Controller ZP), Waterproofing test (frame joints), Calibrate brake pads (0.2mm clearance).
          *   **Voltway S2 V2 Pro:**
              *   Overview: Enhanced torque model with upgraded braking system.
              *   BOM: P312 (Motor, 1), P313 (Battery, 1), P314 (Controller, 1), P315 (Frame, 1), P329 (Display, 1), P330 (Wheel, 2), P331 (Brake, 1), P332 (Headlight, 1), P333 (Charger, 1), P334 (Cable, 1), P335 (Seat, 1, Optional), P336 (Fender, 1), P337 (Nut, 12), P338 (Washer, 12).
              *   Assembly: Torque 40Nm, Regen brake calibration, OLED firmware ≥ v3.0, Wheel alignment ≤ 0.5mm run-out.
          *   **Voltway S3 V2 Pro:**
              *   Overview: High-performance all-terrain variant with advanced electronics.
              *   BOM: P320 (Motor, 1), P321 (Battery, 1), P322 (Controller, 1), P323 (Frame, 1, Reinforced), P329 (Display, 1), P330 (Wheel, 2), P331 (Brake, 1), P332 (Headlight, 1), P333 (Charger, 1), P334 (Cable, 1), P335 (Seat, 1, Optional), P336 (Fender, 1), P337 (Nut, 12), P338 (Washer, 12).
              *   Assembly: Torque 42Nm, Temp cycling test (-10C to 60C), Controller firmware v4.1, Validate brake fluid pressure (1.6 bar).
          
          **Tracking Mechanism:** I'll need a simple dictionary or similar structure to store the cumulative parts requested across interactions within the same session. Let's call it \`cumulative_order\`. It will store \`Part ID\` -> \`Total Quantity\`. When a new request comes in, I'll calculate the parts for that request, add them to the \`cumulative_order\`, and then present the parts list for the *current* request, while mentioning that I'm keeping track of the totals.
          
          **Example Scenario:**
          User asks for 10 x S1 V1.
          1.  I identify the S1 V1 BOM.
          2.  Calculate parts: P300: 1*10=10, P301: 1*10=10, ..., P325: 2*10=20, ..., P337: 12*10=120, P338: 12*10=120.
          3.  Update \`cumulative_order\` (initially empty): \`{'P300': 10, 'P301': 10, ..., 'P325': 20, ..., 'P337': 120, 'P338': 120}\`.
          4.  Generate the friendly response for the 10 x S1 V1, listing the parts needed for *this* order (10, 10, 20, 120, 120, etc.), mention I'm tracking the total order.
          
          If the user then asks for 5 x S2 V2.
          1.  I identify the S2 V2 BOM.
          2.  Calculate parts for *this* request: P312: 1*5=5, P313: 1*5=5, ..., P330: 2*5=10, ..., P337: 12*5=60, P338: 12*5=60.
          3.  Update \`cumulative_order\`: Add the new quantities. E.g., if P337 was 120, it becomes 120 + 60 = 180. Add new parts like P312: 5, P313: 5.
          4.  Generate the friendly response for the 5 x S2 V2, listing the parts needed for *this* order (5, 5, 10, 60, 60, etc.), and mention I'm tracking the *updated* total order.
          
          *Self-correction:* The prompt asks me to let the company know how many of each part to order *when given a quantity*. It doesn't explicitly ask for the *cumulative* total in the response itself, just to *keep track*. So, I should focus the parts list in the response on the *current* request, but mention that I'm keeping a running tally.
          
          Let's structure the response:
          
          Subject: Parts Order for [Scooter Model] x [Quantity]
          
          Hey there!
          
          Happy to help with your parts order. You requested **[Quantity]** unit(s) of the **Voltway [Scooter Model]**.
          
          Just as a quick refresher, the [Scooter Model] is our [Overview from BOM].
          
          Here are the parts you'll need for this specific batch:
          
          *   [Part ID] [Part Name]: [Calculated Quantity] ([Notes, if any])
          *   [Part ID] [Part Name]: [Calculated Quantity] ([Notes, if any])
          *   ... (List all parts from the BOM with calculated quantities) ...
          *   [Part ID] [Part Name]: [Calculated Quantity] ([Notes, if any])
          
          *(Include Optional parts like P335 Comfort Seat, mentioning they are optional)*
          
          Also, please keep the following assembly requirements in mind for the [Scooter Model]:
          
          *   [Assembly Req 1]
          *   [Assembly Req 2]
          *   ...
          
          I've added this to our running order list to keep track of the totals.
          
          Let me know if you need parts for any other models or anything else!
          
          Best,
          
          Your Friendly Voltway Assistant
          
          This structure looks good. I need to be ready to parse the user's request (e.g., "I need 5 S1 V1" or "order 20 S3 V2 Pro"). I'll use the OCR data provided for each scooter model.`,
                },
                {
                    text: `Hey there!
          
          Awesome, happy to help you figure out the parts order. Which Voltway scooter model are you looking to build today, and how many units do you need? Just let me know the model (like S1 V1, S2 V2 Pro, S3 V1, etc.) and the quantity!
          
          Once you tell me, I can give you a detailed list of all the parts required for that specific batch. I'll also include a quick overview of the model and its specific assembly requirements from the spec sheet.
          
          I'm keeping a running list of all the parts requested, so we'll have a grand total when you're all set.
          
          Looking forward to helping you out!`,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: `${param}`,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    for await (const chunk of response) {
        console.log(chunk.text);
    }
}

async function main() {
    while (true) {
        const userInput = await new Promise((resolve) => {
            rl.question("You: ", input => {
                resolve(input);
            });
        });

        await model(userInput);
    }
}

main();
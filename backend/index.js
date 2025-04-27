import express, { json } from 'express';
import cors from 'cors'; // Make sure cors is imported
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const app = express();

const db = new Database('emails.db');

/**
 * Creates the 'emails' table if it does not exist.
 * stores emails with fields: date, sender, recipient, subject, and content.
 * Credit to https://www.youtube.com/watch?v=OqvzvrXWLU0&t=517s
 * Credit to https://www.youtube.com/watch?v=SccSCuHhOw0&t=220s
 * Credit to OpenAI
 */
db.prepare(`
CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(date, sender, recipient, subject)
)
`).run();


// --- CORS Configuration --- START
// Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000', // Primary: Env Var or Localhost fallback
  'https://hugo-client-nine.vercel.app'                 // Explicitly allow your deployed frontend
  // Add any other origins you need to allow (e.g., other dev environments)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests) OR origins in our allowed list
    // || !origin is important for server-to-server requests or tools like Postman
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
    } else {
        console.error('CORS blocked origin:', origin); // Log blocked origins for easier debugging
        callback(new Error(`Origin ${origin} not allowed by CORS`)); // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'], // Explicitly list allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly list allowed headers (add others like 'X-Requested-With' if needed)
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 204 // Return 204 for successful preflight requests
};

// --- Apply CORS Middleware FIRST ---
// It's generally best practice to apply CORS early
app.use(cors(corsOptions));

// --- CORS Configuration --- END


// --- Other Middleware ---
// Place logger after CORS if you want to log requests that passed CORS checks
// Define logger function (hoisted)
function logger(req, res, next) {
    console.log(req.method, req.originalUrl); // Log method too for clarity
    next();
}
app.use(logger);

// Body parsers after CORS and logger, but before routes
app.use(json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded requests


// Set view engine to EJS (usually relevant for server-rendered pages, not APIs)
app.set('view engine', 'ejs');


// --- Routes --- (Ensure these are defined AFTER all middleware)
import router from './routes/gemini.js';
import authRoutes from './routes/auth.js';
app.use('/api/gemini', router);
// Ensure your login route is defined within authRoutes, e.g., POST /api/auth/login
app.use('/api/auth', authRoutes);


/**
 * Formats a JS Date object into a date time string
 * @param {Date} date The JavaScript Date object
 * @returns {string} Formatted date string
 */
function formatDateToMySQL(date) {
    const pad = (n) => n < 10 ? '0' + n : n;
    return date.getFullYear() + '-' +
           pad(date.getMonth() + 1) + '-' +
           pad(date.getDate()) + ' ' +
           pad(date.getHours()) + ':' +
           pad(date.getMinutes()) + ':' +
           pad(date.getSeconds());
}

/**
 * read .eml files from the 'hugo_data_samples/emails' folder,
 * parses the content, and inserts them into the email table
 */
async function loadEmailsIntoDatabase() {
    // Check if directory exists to prevent error on startup if missing
    const emailsDir = path.join(process.cwd(), 'hugo_data_samples/emails');
    if (!fs.existsSync(emailsDir)) {
        console.warn(`Emails directory not found: ${emailsDir}. Skipping email load.`);
        return;
    }

    const files = fs.readdirSync(emailsDir).filter(file => file.endsWith('.eml'));
    if (files.length === 0) {
        console.log("No .eml files found to load into database.");
        return;
    }

    const insert = db.prepare(`
    INSERT INTO emails (date, sender, recipient, subject, content)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(date, sender, recipient, subject) DO NOTHING -- Use ON CONFLICT instead of try/catch for duplicates
    `); // Added ON CONFLICT for better duplicate handling

    // Use transaction for bulk inserts for better performance
    const insertMany = db.transaction((emails) => {
        for (const email of emails) {
            insert.run(email.formattedDate, email.sender, email.recipient, email.subject, email.content);
        }
    });

    let emailsToInsert = [];

    for (const file of files) {
        const filePath = path.join(emailsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Basic parsing logic (consider a dedicated library like 'mailparser' for robustness)
        const headerEndIndex = fileContent.indexOf('\n\n'); // Find first double newline
        if (headerEndIndex === -1) {
            console.error(`Could not parse headers in file ${file}, skipping.`);
            continue;
        }

        const headerPart = fileContent.substring(0, headerEndIndex);
        const bodyPart = fileContent.substring(headerEndIndex + 2); // Get content after headers

        const headerLines = headerPart.split('\n');
        let sender = null, recipient = null, subject = null, date = null;

        for (const line of headerLines) {
            if (line.toLowerCase().startsWith('from:') && sender === null) {
                sender = line.substring(5).trim();
            } else if (line.toLowerCase().startsWith('to:') && recipient === null) {
                recipient = line.substring(3).trim();
            } else if (line.toLowerCase().startsWith('subject:') && subject === null) {
                subject = line.substring(8).trim();
            } else if (line.toLowerCase().startsWith('date:') && date === null) {
                 try {
                    date = new Date(line.substring(5).trim());
                    if (isNaN(date.getTime())) { // Check for invalid date
                        date = null; // Reset if parsing failed
                        console.warn(`Invalid date found in ${file}: ${line.substring(5).trim()}`);
                    }
                } catch (e) {
                    date = null; // Reset on error
                    console.warn(`Error parsing date in ${file}: ${line.substring(5).trim()}`);
                }
            }
        }

        if (sender && recipient && subject && date && bodyPart) {
            const formattedDate = formatDateToMySQL(date);
            emailsToInsert.push({ formattedDate, sender, recipient, subject, content: bodyPart });
        } else {
            console.error(`Missing required fields (From, To, Subject, Date, or Body) in file ${file}, skipping.`);
        }
    }

    if (emailsToInsert.length > 0) {
        try {
            insertMany(emailsToInsert);
            console.log(`Processed ${files.length} files. Inserted or found ${emailsToInsert.length} valid emails into local database.`);
        } catch (err) {
            console.error(`Error during bulk email insertion:`, err);
        }
    } else {
        console.log("No valid emails found to insert after parsing.");
    }
}

// Load emails on startup (consider if this should run every time or only once)
loadEmailsIntoDatabase().catch(err => {
    console.error("Error loading emails into database:", err);
});


// Start the server
const PORT = process.env.PORT || 4000; // Use PORT env var (common for deployments) or fallback
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
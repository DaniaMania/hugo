import express, { json } from 'express';
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

function logger(req, res, next) {
    console.log(req.method, req.originalUrl);
    next();
}
app.use(logger);

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

import router from './routes/gemini.js';
import authRoutes from './routes/auth.js';
app.use('https://hugo-lovat-tau.vercel.app/api/gemini', router);
app.use('https://hugo-lovat-tau.vercel.app/api/auth', authRoutes);


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
    `);

    const insertMany = db.transaction((emails) => {
        for (const email of emails) {
            insert.run(email.formattedDate, email.sender, email.recipient, email.subject, email.content);
        }
    });

    let emailsToInsert = [];

    for (const file of files) {
        const filePath = path.join(emailsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

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

loadEmailsIntoDatabase().catch(err => {
    console.error("Error loading emails into database:", err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
import express, { json } from 'express';
import cors from 'cors';
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

// Middleware
app.use(json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
import router from './routes/gemini.js';
import authRoutes from './routes/auth.js';
app.use('/gemini', router);
app.use('/auth', authRoutes);

/**
 * Logs each incoming request's original URL to the console.
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 * @param {express.NextFunction} next Next middleware function
 */
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

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
    const emailsDir = path.join(process.cwd(), 'hugo_data_samples/emails');
    const files = fs.readdirSync(emailsDir).filter(file => file.endsWith('.eml'));

    const insert = db.prepare(`
    INSERT INTO emails (date, sender, recipient, subject, content)
    VALUES (?, ?, ?, ?, ?)
    `);

    for (const file of files) {
        const filePath = path.join(emailsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const [headerPart, bodyPart] = fileContent.split(/\r?\n\r?\n/, 2);
        const headerLines = headerPart.split(/\r?\n/);

        let sender = null;
        let recipient = null;
        let subject = null;
        let date = null;

        for (const line of headerLines) {
            if (line.startsWith('From:') && sender === null) {
                sender = line.replace('From:', '').trim();
            } else if (line.startsWith('To:') && recipient === null) {
                recipient = line.replace('To:', '').trim();
            } else if (line.startsWith('Subject:') && subject === null) {
                subject = line.replace('Subject:', '').trim();
            } else if (line.startsWith('Date:') && date === null) {
                date = new Date(line.replace('Date:', '').trim());
            }
        }

        const lines = fileContent.split('\n');
        const headers = {};
        let i = 0;
        while (i < lines.length && lines[i].trim() !== '') {
            const line = lines[i];
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.slice(0, colonIndex).trim();
                const value = line.slice(colonIndex + 1).trim();
                headers[key] = value;
            }
            i++;
        }

        const content = lines.slice(i + 1).join('\n');

        if (sender && recipient && subject && date && content) {
            const formattedDate = formatDateToMySQL(date);

            try {
                insert.run(formattedDate, sender, recipient, subject, content);
                console.log(`Inserted ${file} into local SQLite database.`);
            } catch (err) {
                if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                    console.log(`Skipped duplicate email from file: ${file}`);
                } else {
                    console.error(`Failed to insert ${file}:`, err);
                }
            }
        } else {
            console.error(`Missing fields in file ${file}, skipping.`);
        }
    }

    console.log('All emails loaded into local database!');
}

loadEmailsIntoDatabase();

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

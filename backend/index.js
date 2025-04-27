import { evaluateEmailContent } from "./src/model.js";
import Database from 'better-sqlite3';

const db = new Database('emails.db');

const contents = db.prepare('SELECT content FROM emails').all();

for await (const content of contents) {
    const x = await evaluateEmailContent(content['content']);
    console.log(x);
}
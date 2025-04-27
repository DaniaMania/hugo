import { evaluateEmailContent } from "./src/model.js";
import Database from 'better-sqlite3';

const db = new Database('emails.db');

// const contents = db.prepare('SELECT content FROM emails').all();

// console.log(contents[0]['content']);

// const uniqueEmails = new Set();
// contents.forEach(entry => {
//     uniqueEmails.add(entry.sender);
//     uniqueEmails.add(entry.recipient);
// });
// const users = Array.from(uniqueEmails).map(email => ({ user: email }));
// console.log(users)
// for await (const content of contents) {
//     const x = await evaluateEmailContent(content['content']);
//     console.log(x);
// }

// const test = async (contents) => {
//     const x = await evaluateEmailContent(contents[0]['content']);
//     console.log(x);
// }

// test(contents).then(() => {
//     console.log("done")
// }).catch((err) => {
//     console.log(err)
// })
const recipient = "engineering@voltway.co";
const loc = db.prepare('SELECT date, sender, subject, content, recipient FROM emails WHERE recipient = ?', recipient);
const rows = loc.all(recipient);
console.log(rows);

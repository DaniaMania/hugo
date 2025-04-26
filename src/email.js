import fs from "fs";

export function extractEml(filePath) {
    const emailContent = fs.readFileSync(filePath, 'utf8');

    const lines = emailContent.split('\n')

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

    const sender = headers['From'] || 'Unknown';
    const recipient = headers['To'] || 'Unknown';
    const subject = headers['Subject'] || 'No Subject';
    const time = headers['Date'] || 'Unknown';

    return { sender, recipient, subject, time, content };
}
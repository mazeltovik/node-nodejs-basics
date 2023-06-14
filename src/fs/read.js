import { readdir } from 'node:fs/promises';
import { open } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');


const read = async () => {
    try {
        const fd = await open(filePath);
        const readable = fd.createReadStream().setEncoding('utf-8');
        readable.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
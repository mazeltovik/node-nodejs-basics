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
        let data = '';
        readable.on('data', (chunk) => {
            data += `${chunk}\n`;
        });
        readable.on('end',()=>{
            process.stdout.write(data);
        })
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
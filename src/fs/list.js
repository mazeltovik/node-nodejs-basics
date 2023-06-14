import { readdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesPath = path.join(__dirname, 'files');

const list = async () => {
    try{
        const files = await readdir(filesPath);
        let data = '';
        files.forEach(file=>data+=`${file}\n`);
        process.stdout.write(data);
    } catch{
        throw new Error('FS operation failed');
    }
};

await list();
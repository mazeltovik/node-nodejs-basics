import { readdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesPath = path.join(__dirname, 'files');
const fileName = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    try {
        const files = await readdir(filesPath);
        if (files.includes('fresh.txt')) {
            throw new Error('FS operation failed');
        } else {
            const writable = await createWriteStream(fileName).setDefaultEncoding('utf-8');
            writable.write('I am fresh and young');
        }

    } catch (err) {
        console.log(err);
    }
};

await create();
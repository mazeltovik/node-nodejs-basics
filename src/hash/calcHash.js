import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    try {
        let data = await readFile(fileName, { encoding: 'utf8' });
        console.log(createHash('SHA256').update(data).digest('hex'));
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await calculateHash();
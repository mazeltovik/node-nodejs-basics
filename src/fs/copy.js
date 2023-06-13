import { readdir } from 'node:fs/promises';
import { createReadStream, createWriteStream} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { mkdir, stat, access } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesInput = path.join(__dirname, 'files');
const filesOutput = path.join(__dirname, 'files_copy');


const copy = async () => {
    try {
        await access(filesInput);
        await mkdir(filesOutput);
        const files = await readdir(filesInput);
        files.forEach(file=>{
            let filePathInput = path.join(__dirname,'files',file);
            let filePathOutput = path.join(__dirname,'files_copy',file);
            let readable = createReadStream(filePathInput,'utf8');
            readable.on('open',()=>{
                let writable = createWriteStream(filePathOutput).setDefaultEncoding('utf-8');
                readable.pipe(writable);
            })
        })
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();

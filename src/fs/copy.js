import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { mkdir, stat, access } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesInput = path.join(__dirname, 'files');
const filesOutput = path.join(__dirname, 'files_copy');


const copy = async () => {
    await access(filesInput).catch(() => {
        throw new Error('FS operation failed');
    })
    await mkdir(filesOutput).catch(() => {
        throw new Error('FS operation failed');
    })
    const files = await readdir(filesInput);
    while (files.length != 0) {
        let file = files.shift();
        let filePathInput = path.join(__dirname, 'files', file);
        if ((await stat(filePathInput)).isFile()) {
            let filePathOutput = path.join(__dirname, 'files_copy', file);
            let readableData = await readFile(filePathInput, 'utf-8');
            await writeFile(filePathOutput, readableData);
        } else {
            let filesFolder = await readdir(filePathInput);
            await mkdir(path.join(__dirname, 'files_copy', file));
            filesFolder.forEach(v => {
                files.push(`${file}\\${v}`)
            })
        }
    }
};

await copy();

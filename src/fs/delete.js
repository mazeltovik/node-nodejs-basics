import path from 'node:path';
import { fileURLToPath } from 'url';
import { unlink } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deleteFilePath = path.join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
    try {
        await unlink(deleteFilePath);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
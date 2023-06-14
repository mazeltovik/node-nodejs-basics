import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    try {
        const writable = createWriteStream(filePath,{
            flags:'a'
        });
        process.stdin.on('data', function (input) {
            
            if (input.toString().trim() == 'exit') {
                process.exit();
            } else {
                writable.write(input);
            }
        });
    } catch (err) {
        console.log(err);
    }
};

await write();
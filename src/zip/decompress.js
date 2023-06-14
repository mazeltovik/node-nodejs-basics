import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileCompressPath = path.join(__dirname, 'files', 'archive.gz');
const fileDecompressPath = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const readable = createReadStream(fileCompressPath);
    const writable = createWriteStream(fileDecompressPath,{flags:'a'});
    let chunks = [];
    readable.on('data', (chunk) => {
        chunks.push(chunk);
    })
    readable.on('end', () => {
        let buf = Buffer.concat(chunks);
        zlib.unzip(buf, (err, res) => {
            if (err) {
                throw new Error('Decompress operation failed');
            } else {
                writable.write(res);
            }
        })
    })
};

await decompress();
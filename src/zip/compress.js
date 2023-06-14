import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileCompressPath = path.join(__dirname, 'files','fileToCompress.txt');
const fileNameAcrhivePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    await pipeline(
        fs.createReadStream(fileCompressPath),
        zlib.createGzip(),
        fs.createWriteStream(fileNameAcrhivePath),
      ).catch(()=>{
        throw new Error('Compress operation failed');
      })
};

await compress();
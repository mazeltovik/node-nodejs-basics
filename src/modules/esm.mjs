import path from 'node:path';
import { release, version } from 'os';
import {createServer as createServerHttp } from 'http';
import './files/c.js';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileA = path.join(__dirname, 'files','a.json');
const fileB = path.join(__dirname, 'files','b.json');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = await readFile(fileA);
} else {
    unknownObject = await readFile(fileB);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);


const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject.toString());

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};


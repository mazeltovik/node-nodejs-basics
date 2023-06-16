import { fork } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = fork(
        filePath,
        args,
        {
            stdio: [process.stdin, process.stdout, process.stderr, 'ipc'],
            encoding: 'utf-8'
        });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['--some-arg value1', '--other 1337', '--arg2 42']);

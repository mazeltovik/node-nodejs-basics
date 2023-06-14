import { Transform } from 'node:stream'

const transform = async () => {
    const reverseData = new Transform({
        transform(chunk, _, callback) {
            callback(null, [...chunk.toString()].reverse().join(''));
        },
    });
    process.stdin.pipe(reverseData).pipe(process.stdout);
};

await transform();


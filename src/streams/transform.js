import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises';

const transform = async () => {
    const reverseData = new Transform({
        transform(chunk, _, callback) {
            callback(null, [...chunk.toString()].reverse().join(''));
        },
    });
    await pipeline(
        process.stdin,
        reverseData,
        process.stdout
    ).catch(()=>{
        throw new Error('Transform operation failed');
    });
};

await transform();


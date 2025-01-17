import {parentPort,workerData} from 'node:worker_threads'
// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    parentPort.postMessage(nthFibonacci(workerData));
    // This function sends result of nthFibonacci computations to main thread
};

sendResult();

// Or
// parentPort.once('message', (value) => {
//     assert(value.hereIsYourPort instanceof MessagePort);
//     value.hereIsYourPort.postMessage(
//         nthFibonacci(value.nth)
//     );
//     value.hereIsYourPort.close();
// });
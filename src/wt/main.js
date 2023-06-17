import path from "node:path";
import os from "node:os"
import { fileURLToPath } from "url";
import { Worker } from "node:worker_threads";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "worker.js");

class WorkerPool{
    constructor(filePath,cores){
        this.filePath = filePath;
        this.cores = cores;
        this.workers = [];
        this.init();
    }
    init(){
        for(let i = 0,nth=10;i<this.cores;i++,nth++){
            this.workers[i] = new Promise((resolve, reject) => {
                const worker = new Worker(filePath, {
                    workerData: nth,
                });
                worker.on('message', resolve);
                worker.on('error', reject);
            });
        }
    }
    transformResults(data){
        return data.map(v=>{
            return {
                status: v.status == "fulfilled" ? "resolved" : "error",
                data: v.status == "fulfilled" ? v.value : null
            }
        })
    }
}

const performCalculations = async () => {
    const pool = new WorkerPool(filePath,os.availableParallelism());
    Promise.allSettled(pool.workers).then(data=>{
        console.log(pool.transformResults(data));
    });
}

await performCalculations();



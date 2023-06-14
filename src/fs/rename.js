import path from 'node:path';
import { fileURLToPath } from 'url';
import { stat, access,rename as fsRename } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const oldFile = path.join(__dirname, 'files','wrongFilename.txt');
const newFile = path.join(__dirname, 'files','properFilename.md');

const rename = async () => {
    await access(oldFile).catch(()=>{
        throw new Error('FS operation failed');
    });
    try{
        await access(newFile);
        throw new Error('FS operation failed');
    } catch(err){
        console.log(err);
        await fsRename(oldFile,newFile)
    }

    // await access(newFile).then(()=>{
    //     throw new Error('FS operation failed');
    // }).catch(async err=>{
    //     await fsRename(oldFile,newFile)
    //     console.log('hi');
    // })
    // const existFile = await stat(newFile)
    // existFile.catch(()=>{
    //     return
    // })
    // if(existFile.isFile()){
    //     throw new Error('FS operation failed');
    // }
    // await fsRename(oldFile,newFile)
};

await rename();
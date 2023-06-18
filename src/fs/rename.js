import path from "node:path";
import { fileURLToPath } from "url";
import { access, rename as fsRename, readdir } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesPath = path.join(__dirname, "files");
const oldFile = path.join(__dirname, "files", "wrongFilename.txt");
const newFile = path.join(__dirname, "files", "properFilename.md");

const rename = async () => {
  await access(oldFile).catch(() => {
    throw new Error("FS operation failed");
  });
  let files = await readdir(filesPath);
  if (files.includes("properFilename.md")) {
    throw new Error("FS operation failed");
  } else {
    await fsRename(oldFile, newFile);
  }
};

await rename();

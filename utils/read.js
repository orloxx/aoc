import fs from "node:fs";
import path from "node:path";
import "./polyfills.js";

const [, dirPath] = process.argv;
const day = path.basename(dirPath);

export default function read(filename) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join("./days", day, filename);

    fs.readFile(fullPath, "utf8", (error, data) => {
      if (error) reject(error);
      const list = data.split("\n");
      list.splice(list.length - 1);
      resolve(list);
    });
  });
}

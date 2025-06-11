import fg from "fast-glob";
import fs from "fs";

export async function globFiles(pattern: string) {
  return await fg(pattern)
}

export async function readFile(path: string) {
  return fs.readFileSync(path).toString();
}

export async function writeFile(path: string, content: string) {
  const dir = path.split("/").slice(0, -1).join("/");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path, content);
}
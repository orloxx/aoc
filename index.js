import { spawn } from "node:child_process";
import { readdir } from "node:fs/promises";

function run(day) {
  const p = spawn(`node --import ./loader.js ./days/${day}`, {
    shell: true,
    stdio: "inherit",
  });
  p.on("close", () => {
    console.log(`Day ${day} finished.`);
  });
}

async function getLastDay() {
  const daysDone = (await readdir("./days", { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => Number(dirent.name))
    .sort((a, b) => a - b);

  return daysDone.pop();
}

async function start() {
  try {
    const [, , day] = process.argv;
    const lastDay = await getLastDay();

    if (day && day === "all") {
      for (let i = 1; i <= lastDay; i += 1) {
        run(i);
      }
    } else if (day) {
      run(day);
    } else {
      run(lastDay);
    }
  } catch (error) {
    console.error(error);
  }
}

start();

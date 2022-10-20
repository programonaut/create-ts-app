#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx create-ts-app my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/programonaut/create-ts-app.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);

    process.chdir(projectPath);

    console.log("Removing useless files");
    fs.rmSync(path.join(projectPath, ".git"), { recursive: true, force: true });
    fs.rmSync(path.join(projectPath, "bin"), { recursive: true, force: true });

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("The installation is done!");
    console.log("You can now run your app with:");
    console.log(`    cd ${projectName}`);
    console.log(`    npm run dev`);
  } catch (error) {
    console.log(error);
  }
}
main();

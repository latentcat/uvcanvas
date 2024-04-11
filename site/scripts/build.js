const { exec } = require("node:child_process");

function runCommand(command) {
  exec(command, (error, stdout, stderr) => {
    console.log(`Run: ${command}`);
    if (error) {
      console.error(error);
      return;
    }
    if (stderr) {
      console.error(stderr);
      return;
    }
    console.log(stdout);
  });
}

[
  "yarn --cwd ../packages/core install && yarn --cwd ../packages/core build",
  "yarn --cwd ../packages/react install && yarn --cwd ../packages/react build",
  "yarn --cwd ../packages/uvslides install && yarn --cwd ../packages/uvslides build",
].forEach(runCommand);

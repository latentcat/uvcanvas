const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function runCommand(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.error(stderr);
  } catch (err) {
    console.error(err);
  }
}

async function build() {
  const modules = [
    "../packages/core",
    "../packages/react",
    "../packages/uvslides",
  ];

  for (const module of modules) {
    await runCommand(
      `yarn --cwd ${module} install && yarn --cwd ${module} build`,
    );
  }
}

build();

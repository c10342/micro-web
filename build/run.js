const childProcess = require("child_process");

const path = require("path");

const appPath = {
  vue3: path.resolve(__dirname, "../vue3"),
  react18: path.resolve(__dirname, "../react18"),
  main: path.resolve(__dirname, "../main"),
};

function runChild() {
  Object.values(appPath).forEach((item) => {
    childProcess.spawn(`cd ${item} && npm start`, {
      stdio: "inherit",
      shell: true,
    });
  });
}

runChild();

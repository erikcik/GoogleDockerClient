import { exec } from "child_process";

const hadi = () => {
  const navigatedMultiple = 30;

  exec(`sh bruh.sh ${navigatedMultiple}`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};
hadi();

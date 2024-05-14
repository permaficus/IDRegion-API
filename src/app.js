import { 
    serverInit, 
    SERVICE_LOCAL_PORT, 
    httpServer,
    NODE_ENV
} from "./libs/service.init.js";
import chalk from "chalk";

const main = (portNumber) => {
    serverInit();
    httpServer.listen(portNumber, () => {
        console.log(
            `-----------------------------------------
            \n${chalk.black.bgGreenBright(`🚀  IDRegion API is up and running!\n`
            )}\nMode: ${chalk.blueBright(
              `${NODE_ENV}`
            )}\nURL: ${chalk.blueBright(
              `http://localhost:${portNumber}`
            )}\nDOCS: ${chalk.blackBright(
              `http://localhost:${portNumber}/api-docs`
            )}\nTime: ${chalk.blueBright(
                `${new Date(Date.now())}`
            )}\n\n-----------------------------------------`
          );
    })
    .on("error", error => {
      if (/development/gi.test(NODE_ENV)) {
        if (error.code === 'EADDRINUSE') {
          console.error(`${chalk.green('[http-server]')} ${chalk.redBright(`Port ${portNumber} already in use`)}. Retrying on port: ${portNumber++ + 1}`);
          main(portNumber);
          return;
        }
      }
      console.error(`${chalk.redBright(error.message)}`)
    })
}

main(+SERVICE_LOCAL_PORT)
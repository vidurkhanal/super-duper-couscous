import Express from "express";
import { __PORT__, __PROD__ } from "./constants";
import morgan from "morgan";

const main = async () => {
  const app = Express();

  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.get("/", (_, res) => {
    return __PROD__
      ? res.send("<b>Hello THERE</b>")
      : res.send("<b>CONSTRUCTION GOING ON...</b>");
  });

  app.listen(__PORT__, () => {
    console.log("Server has been initialized in port", __PORT__);
  });
};

main().catch((e) => console.log(e));

import morgan from "morgan";
import cors from "cors";
function setGlobalMiddleware(app) {
  app.use(morgan("dev"));
  app.use(cors());
}

export default setGlobalMiddleware;

import express from "express";
import setGlobalMiddleware from "./middleware";
import shipmentRouter from "./resources/shipment/shipmentRouter";

var app = express();
setGlobalMiddleware(app);

app.use("/api", shipmentRouter);

export default app;

import express from "express";
import setGlobalMiddleware from "./middleware";
import shipmentRouter from "./resources/shipment/shipmentRouter";
import eventRouter from "./resources/event/router";

var app = express();
setGlobalMiddleware(app);

app.use("/api", shipmentRouter);
app.use("/event", eventRouter);

export default app;

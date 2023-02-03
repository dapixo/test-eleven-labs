import cors from "cors";
import express from "express";
import { CosmonautController } from "./cosmonaut/cosmonaut.controller";
import { ExceptionsHandler } from "./exceptions.handler";
import { UnknownRoutesHandler } from "./utils";
import bodyParser from "body-parser";

const API_PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/cosmonauts", CosmonautController);

app.all("*", UnknownRoutesHandler);

app.use(ExceptionsHandler);

app.listen(API_PORT, () => console.log("Server is running"));

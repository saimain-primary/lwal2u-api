import express from "express";
import http from "http";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
// app.use(bodyParser().json());

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://ponhackathon:5GTIerEjgFPWP1XM@cluster0.0zffcta.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

app.use("/", router());

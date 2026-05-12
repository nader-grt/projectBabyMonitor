import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/configdb";
import http   from "http"



// auth 

import registerUserRoute from "./route/auth/RegisterUserRoute"
import loginUserRoute from "./route/auth/LoginUserRoute"
import logoutUserRoute from "./route/auth/LogoutUserRoute"
import { socketInit } from "./service/socket/socket";
import MqttStart from "./service/mqttService/mqttService";

// user with his baby 
import getBabyinfo from "./route/BabyInfoRoute/GetBabyInfoRoute"

import getHistoryBabyinfo from "./route/HistoryRoute/HistoryBabyInfoRoute"

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;


app.use("/api", registerUserRoute);
app.use("/api", loginUserRoute);
app.use("/api", logoutUserRoute);



//  user depend with her baby info

app.use("/api",getBabyinfo)  ;

app.use("/api",getHistoryBabyinfo)

     const server =  http.createServer(app)
       const  io = socketInit(server)
//
//  Start everything
const startServer = async () => {
  await connectDB();

  //  Start MQTT after DB + socket
 MqttStart(io);

  server.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();
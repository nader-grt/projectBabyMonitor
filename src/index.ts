
import express, { json } from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/configdb"
dotenv.config();
// baby 
 import getBaby from "./route/babyRoute/GetBabyRoute"
 import createBaby from "./route/babyRoute/CreateBabyRoute"

// auth 

import registerUserRoute from "./route/auth/RegisterUserRoute"
import loginUserRoute from "./route/auth/LoginUserRoute"

import fatherController from "./controller/fatherController";
import EnvirmentController from "./controller/EnvirmentController";

const app = express()


app.use(json());

const PORT = process.env.PORT || 4000;

//auth 
app.use("/api",registerUserRoute)
app.use("/api",loginUserRoute)

// baby
app.use("/api",getBaby)
app.use("/api",createBaby)






const father = new fatherController("ahmed","ali")
const envir = new EnvirmentController("ali","saleh")









  const startServer = async () => {
    await connectDB();
  
    app.listen(PORT, () => {

      //    console.log("static is  " ,fatherController.department)
// //console.log("cnss is  ",envir.fn3())
//     // console.log("access member private age  is  " ,father  , "\n")
//     // console.log("object father  is  " ,father  , "\n")
//     // console.log(  " function inside class fn1  ",father.fn1()  ,"\n")
//     // console.log("\n "   , " function inside class fn2  ",father.fn2())
      console.log(`🚀 Server running on port ${PORT}`);
    });
  };



  startServer();
















//   const user = ["islem","ahmed","ali"]

//   console.log( " 1 ",typeof(userBaby))

//   console.log( " access by point  ",userBaby.name)

//   console.log( " access by [] curly brackes  ",userBaby["age"])

//  // console.log( "\n 2 ",typeof(user))
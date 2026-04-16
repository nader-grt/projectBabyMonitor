
import express, { json } from "express";

// baby 
 import getBaby from "./route/babyRoute/GetBabyRoute"
 import createBaby from "./route/babyRoute/CreateBabyRoute"
import fatherController from "./controller/fatherController";
import EnvirmentController from "./controller/EnvirmentController";

const app = express()


app.use(json());
const port = 4000



app.use("/api",getBaby)
app.use("/api",createBaby)






const father = new fatherController("ahmed","ali")
const envir = new EnvirmentController("ali","saleh")





// app.get('/', (req, res) => {
//     res.send(`<h2> heloo  </h2>`)
//   })



app.listen(port, () => {
   console.log("static is  " ,fatherController.department)
//console.log("cnss is  ",envir.fn3())
    // console.log("access member private age  is  " ,father  , "\n")
    // console.log("object father  is  " ,father  , "\n")
    // console.log(  " function inside class fn1  ",father.fn1()  ,"\n")
    // console.log("\n "   , " function inside class fn2  ",father.fn2())
    console.log(`Example app listening on port ${port}`)
  })



















//   const user = ["islem","ahmed","ali"]

//   console.log( " 1 ",typeof(userBaby))

//   console.log( " access by point  ",userBaby.name)

//   console.log( " access by [] curly brackes  ",userBaby["age"])

//  // console.log( "\n 2 ",typeof(user))
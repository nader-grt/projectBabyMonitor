import { Request, Response } from "express";

export default abstract class BaseController {

  protected abstract executeImplment(
    req: Request,
    res: Response
  ): Promise<any>;

  public async execute(req: Request, res: Response): Promise<any> {
    try {
      await this.executeImplment(req, res);
    } catch (error: any) {
      console.error("Unexpected error:", error);

      return this.internalError(res, error.message);
    }
  }

  // -------------------------
  // SUCCESS
  // -------------------------
  protected ok(res: Response, data?: any, message = "OK") {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  protected resultValue(res: Response, data?: any, message = "OK") {
    return res.status(200).json({
     
      message,
      data,
    });
  }
  protected created(res: Response, data?: any, message = "Created") {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  // -------------------------
  // FAIL (CLIENT ERRORS)
  // -------------------------
  protected fail(res: Response, message = "Bad Request", errors?: any) {
    return res.status(400).json({
      success: false,
      message,
      errors,
    });
  }

  protected unauthorized(res: Response, message = "Unauthorized") {
    return res.status(401).json({
      success: false,
      message,
    });
  }

  protected forbidden(res: Response, message = "Forbidden") {
    return res.status(403).json({
      success: false,
      message,
    });
  }

  protected notFound(res: Response, message = "Not Found") {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // -------------------------
  // SERVER ERROR
  // -------------------------
  protected internalError(
    res: Response,
    message = "Internal Server Error"
  ) {
    return res.status(500).json({
      success: false,
      message,
    });
  }
}


/**
 
mosquitto_sub -h localhost -t "baby/#" -v

baby/all {
  "timestamp": 1778174550,
  "environmentTemperature": 26,
  "humidity": 60,
  "pressure": 1012,
  "babyTemperature": 37,
  "heartRate": 110,
  "isCrying": false,
  "position": "back"
}




    for test publish and subscribe  

    mosquitto_pub -h localhost  -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 26,
  \"humidity\": 60,
  \"pressure\": 1012,
  \"babyTemperature\": 37,
  \"heartRate\": 110,
  \"isCrying\": false,
  \"position\": \"back\"
}"




   cycle request  and response 

  response can be html  or xml or json 
  for json   json object notation  ==  format  
  {
    "":"", // key value pair  datatype suport  string number null  array and object 
  }
      request  object for server unique method  get put post delete patch 


      request.body
      request.params
      request.query

      what is in js {}  = []  typeof
      key  key must be unique and can be number or string  value
      {
        name:"ahmed",
        data: {}
      }
      url  domain 
      params
      query params

       status  2xx sucees 201 created 3xx  redirect 4xx  401 unauthrized 404 client  5xx  server 
       

        visibility mode are public protect  private  static 

        class  contain member  data  variables  and function 

        obkect member data 


        rule http  protocol hyper text pransfert protocol 

        model tcp /ip 
        layer application 
        request object  contain two component principal 
        1 header object
        status code 2xx 3xx 4xx 5xx  message  (ok , unautorized conflit)  
        2 body object 
         content type  plain/text  html  json 
         content length 100ko 100mb 
         dommain facebook 
        layer transmi
        layer session 
        layer connection 


  entiy diagram  relationship

    father mother  baby three compnent 
      role  father mother   name lastname email  password
      baby  two  component  each baby depend family 

          info depend capteur   socket.io  +  event   cote subscribe 
        temp  t ,  capteure 1
        freques cardial  capteure 2 
         
        capteur  3  give us three information in same temps 
        temp envirment
        humdity envir
        press envirment

             capteur 4  alone 
        gaz  boolean 

        ai  plus camera 
        postion  enum back aside or   enum  string 
        crying boolean 



        config db 
        username :Nader
        password :projectBabyMonitor


          strucure of project monotholic  or hybrid 

          saas layer  tba9aat   two  compnent busnis database  busnis domain   busnis ui 

          three capter       /  camera  as hardware exist on baby  vidi live  live 
          topic publish sensor    subscribe app nodejs  
           mqtt broker  protocol message quese temporory transfert 
        
          topic 1  envirement/baby === temp pressure humidity  + gaz

          topic 2 infoPropre/baby  frequececardiac  / tempbaby  

          topic 3 camera/baby   camera  as hardware exist on baby  vidi live  live 

          topic 4 cryingPostion/baby   with ai  


          ESP32  topic 2  carte  Rasbery carte  (topic 1  topic 4 )   → MQTT →   Node.js   → Socket.io → Flutter App
↓
Alert Engine
↓
Database


injection 

  class repo   make an object from repo  

  usecase  class  make an object  inject object  ++  
















              service mqtt  

               // if (!data.timestamp) {
      //   console.warn("Missing timestamp → ignored");
      //   return;
      // }

      // if (seen.has(data.timestamp)) {
      //   console.log("Duplicate message skipped");
      //   return;
      // }

      // seen.add(data.timestamp);

      // if (seen.size > 1000) {
      //   seen.clear();
      // }

      io.emit(topic, data);

    //  const sensorData: any = {};
//ok
      // if (topic === "baby/envirement") {
      //   sensorData.environmentTemperature = data.environmentTemperature;
      //   sensorData.humidity = data.humidity;
      //   sensorData.pressure = data.pressure;
      // }
//ok
      // if (topic === "baby/vitals") {
      //   sensorData.babyTemperature = data.babyTemperature;
      //   sensorData.heartRate = data.heartRate;
      // }
// not ok capteur
      // if (topic === "baby/status") {
      //   sensorData.isCrying = data.isCrying;
      //   sensorData.position = data.position
      // }

      // if (Object.keys(sensorData).length > 0) {
      //   await SenSorBabyModel.create({
      //     ...sensorData,
      //     timestamp: data.timestamp
      //   });
      // }







   

   
    
//    // const client = mqtt.connect("mqtt://localhost:1883");
//     const client = mqtt.connect(process.env.MQTT_URL! , {}
//     );

//     client.on("connect", () => {
//       console.log(" MQTT Connected");
//       client.subscribe("baby/#");
//     });
//     // RELATION: When MQTT receives a message, send it to Socket.io users


//     client.on("message", (topic, message) => {
   
//          try {
//             const data = JSON.parse(message.toString());
     
//            const sensorData = new SenSorBabyModel()

//            console.log("MQTT:", topic, data);


//            io.emit(topic, data);
//           if(topic ===  "baby/envirement")
//           {
//             sensorData.environmentTemperature =  data.environmentTemperature
//             sensorData.humidity = data.humidity
//             sensorData.pressure =  data.pressure 

//           }

//           if(topic === "baby/vitals")
//           {
//             sensorData.babyTemperature = data.babyTemperature
//             sensorData.heartRate  = data.heartRate

//           }

//           if(topic === "baby/status")
//           {
//               sensorData.isCrying = data.isCrying
              

//           }
 
//          } catch (error :any) {
            
//          }
//         // Broadcast to all Socket.io clients
       
//     });

// }


  /*   configure  

    
     mqtt  two  carte Reseberu Esp32   publish send data   via broker mqtt  server   subscribe  <==== node js  client  

     client.publish("baby/status")
     client.publish("baby/envirment")


     history per hours per  day  per week per month 

     baby/all














     node
const jwt = require("jsonwebtoken");

require("jsonwebtoken").sign({ userId: '6a022b6da5cbc396e89db7ed' ,
email:"islemfarjallah@gmail.com"}, "ARÈP45123456789islm@@@!124dr''45abbbbbbbbbbbbbbbbbbhjk@%lfgl2ty2aer525+05",  { expiresIn: "1h" }) ;

this service must active 
 sudo systemctl status mosquitto

  for subscriber 
  mosquitto_sub -h localhost -t "baby/all" -v


for test  publisher 
mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 24,
  \"humidity\": 55,
  \"pressure\": 1013,
  \"babyTemperature\": 36.8,
  \"heartRate\": 95,
  \"isCrying\": false,
  \"position\": \"back\"
}"

➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 29,
  \"humidity\": 95,
  \"pressure\": 1009,
  \"babyTemperature\": 37.5,
  \"heartRate\": 130,
  \"isCrying\": false,
  \"position\": \"back\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 27,
  \"humidity\": 64,
  \"pressure\": 1014,
  \"babyTemperature\": 37,
  \"heartRate\": 115,
  \"isCrying\": false,
  \"position\": \"face_down\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 27,
  \"humidity\": 64,
  \"pressure\": 1014,
  \"babyTemperature\": 37,
  \"heartRate\": 115,
  \"isCrying\": false,
  \"position\": \"face_down\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 27,
  \"humidity\": 64,
  \"pressure\": 1014,
  \"babyTemperature\": 37,
  \"heartRate\": 115,
  \"isCrying\": false,
  \"position\": \"face_down\"
}"
➜  ~ mosquitto_pub -h localhost -t "baby/all" -m "{ 
  \"timestamp\": $(date +%s),
  \"environmentTemperature\": 27,
  \"humidity\": 64,
  \"pressure\": 1014,
  \"babyTemperature\": 37,
  \"heartRate\": 115,
  \"isCrying\": false,
  \"position\": \"face_down\"
}"
 */
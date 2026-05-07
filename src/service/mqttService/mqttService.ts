import mqtt from "mqtt";
import { Server } from "socket.io";
import SensorComingDataUseCase from "../../usecase/SensorComingDataUseCase/SensorComingDataUseCase";


/**

//        environmentTemperature: Number,
//   humidity: Number,
//   pressure: Number,


//     // VITALS
//   babyTemperature: Number,
//   heartRate: Number,

// //AI
//     isCrying: Boolean,
//   position: {
//     type: String,
//     enum: ["back", "stomach", "side"],
//   },

 







 */
export default async function MqttStart(io: Server): Promise<any> {

  const client = mqtt.connect(process.env.MQTT_URL!);

  const seen = new Set<number>();

  client.on("connect", () => {
    console.log("MQTT Connected");

    //  QoS = 1
    client.subscribe("baby/#", { qos: 1 });
  });

  client.on("message", async (topic, dataComing) => {
    try {
      const data = JSON.parse(dataComing.toString());

      console.log("MQTT: !!!  service  mqtt  ", topic, data);
         const sensorUsecase =    new SensorComingDataUseCase()
         await sensorUsecase.execute(topic ,data )
  

      io.emit(topic, data);



    } catch (error: any) {
      console.error("MQTT Error:  this is error ", error.message);
    }
  });
}












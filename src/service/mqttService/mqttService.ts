import mqtt from "mqtt";
import { Server } from "socket.io";
import { SenSorBabyModel } from "../../model/SenSorBabyModel";


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

  client.on("message", async (topic, message) => {
    try {
      const data = JSON.parse(message.toString());

      console.log("MQTT:", topic, data);

      if (!data.timestamp) {
        console.warn("Missing timestamp → ignored");
        return;
      }

      if (seen.has(data.timestamp)) {
        console.log("Duplicate message skipped");
        return;
      }

      seen.add(data.timestamp);

      if (seen.size > 1000) {
        seen.clear();
      }

      io.emit(topic, data);

      const sensorData: any = {};

      if (topic === "baby/envirement") {
        sensorData.environmentTemperature = data.environmentTemperature;
        sensorData.humidity = data.humidity;
        sensorData.pressure = data.pressure;
      }

      if (topic === "baby/vitals") {
        sensorData.babyTemperature = data.babyTemperature;
        sensorData.heartRate = data.heartRate;
      }

      if (topic === "baby/status") {
        sensorData.isCrying = data.isCrying;
      }

      if (Object.keys(sensorData).length > 0) {
        await SenSorBabyModel.create({
          ...sensorData,
          timestamp: data.timestamp
        });
      }

    } catch (error: any) {
      console.error("MQTT Error:", error.message);
    }
  });
}












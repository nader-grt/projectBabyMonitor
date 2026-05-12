import mqtt from "mqtt";
import { Server } from "socket.io";
import SensorComingDataUseCase from "../../usecase/SensorComingDataUseCase/SensorComingDataUseCase";

export default async function MqttStart(io: Server) {

  const client = mqtt.connect(process.env.MQTT_URL!);

  // 
  const sensorUsecase = new SensorComingDataUseCase();

  client.on("connect", () => {
    console.log("MQTT Connected");
    client.subscribe("baby/#", { qos: 1 });
  });

  client.on("message", async (topic, dataComing) => {
    try {
      const data = JSON.parse(dataComing.toString());

      console.log("MQTT:", topic, data);

      await sensorUsecase.execute(topic, data);

      io.emit(topic, data);

    } catch (error: any) {
      console.error("MQTT Error:", error.message);
    }
  });
}
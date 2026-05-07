import RepoUser from "../../repo/repoUser/RepoUser";

export default class SensorComingDataUseCase {
  async execute(topic: any, data: any): Promise<any> {
    const seen = new Set<number>();
    console.log("topic usecase ", topic, " data from service mqtt ", data);
    try {
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

      const sensorData: any = {};
      //ok
      if (topic === "baby/envirement") {
        sensorData.environmentTemperature = data.environmentTemperature;
        sensorData.humidity = data.humidity;
        sensorData.pressure = data.pressure;
      }
      //ok
      if (topic === "baby/vitals") {
        sensorData.babyTemperature = data.babyTemperature;
        sensorData.heartRate = data.heartRate;
      }
      // not ok capteur
      if (topic === "baby/status") {
        sensorData.isCrying = data.isCrying;
        sensorData.position = data.position;
      }
      const babyIdInfo = await RepoUser.getBabyData();


          sensorData.babyId = babyIdInfo[0]._id

          

          const dataComingSensor  = await RepoUser.SenSorBabycreate(sensorData);
      console.log(babyIdInfo, "usecase accept service of  mqtt ");
    } catch (error: any) {
      console.log("error ", error);
    }
  }
}

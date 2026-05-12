import { Response } from "express";
import RepoUser from "../../repo/repoUser/RepoUser";

export default class SensorComingDataUseCase {
         private _TENMIN :number = 10 *60 *1000    // ms 
         private _lastAllowed   = new Map<string, number>();

          private Allwed(key :string,res?:Response):boolean
          {
            const now  =  Date.now() ;
            const last  =  this._lastAllowed.get(key) || 0 

            if((now - last) < this._TENMIN)
            {
              return false
            }
             
               this._lastAllowed.set(key,now)
            return true
          }

  async execute(topic: string, data: any): Promise<any> {
    let res:any =  {}
    try {

      console.log(" MQTT topic:", topic, "data:", data);

      if (topic !== "baby/all") return;

      if (!data?.timestamp) {
        console.warn("⚠️ Missing timestamp → ignored");
        return;
      }

             const  key =  topic

             if(!this.Allwed(key,res))
             {   //console.error(" ignore message ")
                return res.status(402).json({message:"the time is less"})
             }
      const sensorData = {
        environmentTemperature: data.environmentTemperature,
        humidity: data.humidity,
        pressure: data.pressure,
        babyTemperature: data.babyTemperature,
        heartRate: data.heartRate,
        isCrying: data.isCrying,
        position: data.position,
      };

      const babies = await RepoUser.getBabyData();

      if (!babies?.length) {
        console.warn("⚠️ No baby found");
        return;
      }

      const finalSensorData = {
        ...sensorData,
        babyId: babies[0]._id,
      };

      const saved = await RepoUser.SenSorBabycreate(finalSensorData);

      console.log("Sensor saved:", saved);

      return saved;

    } catch (error: any) {
      console.log(" SensorComingDataUseCase error:", error.message);
      return null;
    }
  }
}
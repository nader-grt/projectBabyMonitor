import { UserModel } from "../../model/UserModel";
import { BabyModel } from "../../model/BabyModel";
import IRepoUser from "./IRepoUser";
import bcrypt from "bcrypt";
import { RefreshTokenModel } from "../../model/RefreshTokenModel";
import { SenSorBabyModel } from "../../model/SenSorBabyModel";

export default class RepoUser extends IRepoUser {

  // -------------------------
  // REGISTER USER + BABY
  // -------------------------
  public async RegisterUser(dataUser: any): Promise<any> {
    try {
      const { fullName, email, password, baby } = dataUser;

      // 1. Create user
      const user = await UserModel.create({
        fullName,
        email,
        password,
      });

      // 2. Create baby linked to user
      let babyCreated = null;

      if (baby) {
        babyCreated = await BabyModel.create({
          name: baby.name,
          birthDate: baby.birthDate,
          userId: user._id,
        });
      }

      // 3. Return clean response
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        baby: babyCreated
          ? {
              id: babyCreated._id,
              name: babyCreated.name,
              birthDate: babyCreated.birthDate,
            }
          : null,
      };

    } catch (error: any) {
      console.error("RegisterUser ERROR:", error.message);
      throw error;
    }
  }

  // -------------------------
  // GET ALL USERS
  // -------------------------
  public async GetAll(): Promise<any> {
    try {
      const users = await UserModel.find()
        .select("-password")
        .lean();

      return users;
    } catch (error: any) {
      console.error("GetAll ERROR:", error.message);
      throw error;
    }
  }

  // -------------------------
  // LOGIN USER
  // -------------------------
  public async LoginUser(data: any): Promise<any> {
    try {
      const { email, password } = data;

      // 1. Find user (include password)
      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // 2. Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      // 3. Return clean user
      return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      };

    } catch (error: any) {
      console.error("LoginUser ERROR:", error.message);
      throw error;
    }
  }


  public async FindUserByEmail(email: string): Promise<any> {
    try {
      const user = await UserModel
        .findOne({ email })
        .select("+password"); //  
  
      return user;
    } catch (error: any) {
      console.error("FindUserByEmail ERROR:", error.message);
      throw error;
    }
  }
  public async FindBabyInfo(userId: any): Promise<any> {
    try {
      const babyInfo = await BabyModel
        .findOne({ userId })
        //.select("+password"); //  
  
      return babyInfo;
    } catch (error: any) {
      console.error("FindUserByuserId ERROR:", error.message);
      throw error;
    }
  }


  public async saveRefreshToken(data: {
    userId: string;
    token: string;
    expiresAt: Date;
  }): Promise<any> {
    try {
  
      const refreshToken = await RefreshTokenModel.create({
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
        revoked: false,
      });
  
      return refreshToken;
  
    } catch (error: any) {
      console.error("saveRefreshToken ERROR:", error.message);
      throw error;
    }
  }



  public async revokeRefreshToken(token: string): Promise<void> {
    try {
  
      await RefreshTokenModel.updateOne(
        { token },
        { $set: { revoked: true } }
      );
  
    } catch (error: any) {
      console.error("revokeRefreshToken ERROR:", error.message);
      throw error;
    }
  }
      static async getBabyData():Promise<any>
      {
         try {
          const baby =     await  await BabyModel.find()

          return baby
         } catch (error:any) {
          
         }
      }

      static async SenSorBabycreate(
        sensorData: any
      ): Promise<any> {
      
        console.log("repo sensor data", sensorData);
      
        try {
      
          const createdSensor =
            await SenSorBabyModel.create(sensorData);
      
          console.log(
            "Sensor saved successfully",
            createdSensor
          );
      
          return createdSensor;
      
        } catch (error: any) {
      
          console.log(
            "Repository Sensor Error",
            error.message
          );
      
          return null;
        }
      }
      /**
       * 
      
       */

        //   public async  getHistoryinfoBaby(userid:any):Promise<any>
        //  {

        //        const babyInfo  : any = await this.FindBabyInfo(userid)
        //         const babyId  = babyInfo._id

        //            if(!babyId)
        //            {
        //               return {success : false,message:"baby not found "}
        //            }


                       

        //                 const sensorData = await SenSorBabyModel
        //                 .findOne({ babyId })
        //                     try {
        //                         return {success : true,data:sensorData}
        //                     } catch (error:any) {
                              
        //                     }

        //  }

      //   public async getHistoryinfoBaby(userid: any): Promise<any> {
      //     try {
      //         const babyInfo: any = await this.FindBabyInfo(userid);
      //         if (!babyInfo) {
      //             return { success: false, message: "Baby not found" };
      //         }
      
      //         const babyId = babyInfo._id;
      
      //         const sensorData = await SenSorBabyModel.findOne({ babyId })
      //             .sort({ timestamp: -1 }) // Get the most recent
      //             .exec();
      
      //         if (!sensorData) {
      //             return { success: false, message: "No sensor data found" };
      //         }
      
      //         const lastTimestamp = new Date(sensorData.timestamp).getTime();
      //         const now = Date.now();
      //         const TEN_MINUTES_MS = 10 * 60 * 1000;
      
      //         const timeElapsed = now - lastTimestamp;
      
      //         // 3. Throttle Logic: If less than 10 mins, ignore/block
      //         if (timeElapsed < TEN_MINUTES_MS) {
      //             const secondsRemaining = Math.floor((TEN_MINUTES_MS - timeElapsed) / 1000);
      //             const minutesRemaining = Math.ceil(secondsRemaining / 60);
      
      //             return { 
      //                 success: false, 
      //                 message: "Throttled: Data is only provided every 10 minutes.",
      //                 nextUpdateIn: `${minutesRemaining} minute(s)`,
      //                 cachedData: sensorData // We return the old data instead of nothing
      //             };
      //         }
      
      //         return { 
      //             success: true, 
      //             data: sensorData 
      //         };
      
      //     } catch (error: any) {
      //         return { success: false, message: "Server error", error: error.message };
      //     }
      // }
      
      public async getHistoryinfoBaby(userid: any): Promise<any> {
        try {
    
            const babyInfo: any = await this.FindBabyInfo(userid);
    
            if (!babyInfo) {
                return {
                    success: false,
                    message: "Baby not found"
                };
            }
    
            const babyId = babyInfo._id;
    
            const sensorData = await SenSorBabyModel.find({ babyId })
                .sort({ timestamp: 1 });
    
            if (!sensorData.length) {
                return {
                    success: false,
                    message: "No sensor data found"
                };
            }
    
            const TEN_MINUTES = 10 * 60 * 1000;
    
            const filteredData = [];
    
            let lastAcceptedTime = 0;
    
            for (const item of sensorData) {
    
                const currentTime =
                    new Date(item.timestamp).getTime();
    
                // أول عنصر
                if (lastAcceptedTime === 0) {
    
                    filteredData.push(item);
    
                    lastAcceptedTime = currentTime;
    
                    continue;
                }
    
              
                if (currentTime - lastAcceptedTime >= TEN_MINUTES) {
    
                    filteredData.push(item);
    
                    lastAcceptedTime = currentTime;
                }
            }
    
            return {
                success: true,
                count: filteredData.length,
                data: filteredData[filteredData.length - 1]
            };
    
        } catch (error: any) {
    
            return {
                success: false,
                message: "Server error",
                error: error.message
            };
        }
    }
}
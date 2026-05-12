import RepoUser from "../../repo/repoUser/RepoUser";
import { IInfoDTO } from "../BabyInfoUseCase/GetBabyInfoUseCase";

export default class HistoryBabyInfoUseCase
 {


               
      private _repo: RepoUser;

      constructor(repo: RepoUser) {
        this._repo = repo;
      }
    async execute(user:IInfoDTO):Promise<any>
    {
        const {userId,email}      =  user 

                  try {
                    
               const result :any =   await this._repo.getHistoryinfoBaby(userId)  ;


                       console.log("usecase history sensor data  ",result)
                         if(!result?.success )
                         {
                            return {success:result?.success ,message:result?.message}
                         }
                    return {success:result?.success ,data:result?.data}
                  } catch (error) {
                    
                  }
    }


 }
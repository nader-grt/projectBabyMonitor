import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import { RequestAuth } from "../../middleware/verifyToken";
import HistoryBabyInfoUseCase from "../../usecase/HistoryBabyInfoUseCase/HistoryBabyInfoUseCase";


export default class HistoryBabyInfoController extends BaseController
{

       private _usecaseHistory!:HistoryBabyInfoUseCase
    constructor(usecaseHistory:HistoryBabyInfoUseCase)
    {super()
        this._usecaseHistory = usecaseHistory ;
    }

    protected async  executeImplment(req: RequestAuth, res: Response): Promise<any> {
                
        const user :any = req.user ;

        console.log("user is  ",user )
                 try {
                    const dto :any = {
                        email:user?.email ,
                        userId:user?.userId
                    }
                  const result  =   await this._usecaseHistory.execute(dto)

                  if(!result?.success )
                    {
                     //  return {success:result?.success ,message:result?.message}
                         return this.fail(res,result?.message)
                    }
                   return this.resultValue(res,result?.data)
                 } catch (error) {
                    
                 }
    }
      
}
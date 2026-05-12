import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import GetBabyInfoUseCase from "../../usecase/BabyInfoUseCase/GetBabyInfoUseCase";
import { RequestAuth } from "../../middleware/verifyToken";


export default class GetBabyInfoController extends BaseController
{
    private _usecase!:GetBabyInfoUseCase
    constructor(usecase:GetBabyInfoUseCase)
    {super()
        this._usecase = usecase 
    }

    protected async  executeImplment(req: RequestAuth, res: Response): Promise<any> {
        

               const user :any = req.user ;

               console.log("user is  ",user )
             
            try {
                
                    const result =       await this._usecase.execute(user)

                    if(!result?.success)
                    {
                         this.fail(res,result?.message)
                    }

                    if(result?.success)
                        {
                            this.resultValue(res,{babyId:result?.data}, result?.message)
                        }
                
            } catch (error:any) {
                
            }
    }
}
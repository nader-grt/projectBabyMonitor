import { Request, Response } from "express";
import BaseController from "../infra/BaseController";
import CreateBabyUseCase from "../usecase/CreateBabyUseCase";

export default class CreateBabyController  extends BaseController
{
     
       private _usecase !: CreateBabyUseCase
       constructor(usecase:CreateBabyUseCase)
       {
        super()
        this._usecase = usecase
       }
      protected async executeImplment(req: Request, res: Response): Promise<any> {
              try {
                

                const {name,age} = req.body
                  const data = {
                    name:"ossema",
                    age:2
                  }

                  const data2 = {
                    name,
                    age
                  }
                  await this._usecase.execute(data2)
              } catch (error:any) {
                
              }
      }
}
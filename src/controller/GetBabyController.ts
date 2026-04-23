import { Request, Response } from "express";
import BaseController from "../infra/BaseController";
import BabyUseCase from "../usecase/GetBabyUseCase";

export default class GetBabyController extends BaseController {
  public usecase!: BabyUseCase;
  constructor(usecase: BabyUseCase) {
    super();

    this.usecase = usecase;
  }

  protected async executeImplment(req: Request, res: Response): Promise<any> {
    try {

        const data = {
          name:"ahmed"
        }

        const listInfoBaby :any = 
        {
          
        }
        let name :string = "AHMED" ;
          if(data.name === name)
          {
            return this.ok(res,data,"ok")
          }
          else
          {
       return this.notfound(res,console.error,"not found does not same name")
          }
          
    } catch (error: any) {}
  }
}

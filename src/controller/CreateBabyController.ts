import { Request, Response } from "express";
import BaseController from "../infra/BaseController";
import CreateBabyUseCase from "../usecase/CreateBabyUseCase";
import Joi from "joi"

export default class CreateBabyController  extends BaseController
{

  private async validateUser(user:any):Promise<any>
{
    const JoiSchema = Joi.object({
    
        username: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),
                  
        password: Joi.number()
           
               .min(4)
              // .max(6)
               .required(), 
               
     
       
    });// .options({ abortEarly: false })

    return JoiSchema.validate(user)
}




     
       private _usecase !: CreateBabyUseCase
       constructor(usecase:CreateBabyUseCase)
       {
        super()
        this._usecase = usecase
       }
      protected async executeImplment(req: Request, res: Response): Promise<any> {
              try {
                

                const {username,password} = req.body
                  const data = {
                    name:"ossema",
                    age:2
                  }


        const infoBabyLogin1 :any = 
        {
          username:"islem",
          password:123456
        }



        const loginInfo :any = 
        {
          username,
          password
        }
               

      
   const resultValid:any =    await   this.validateUser(loginInfo)

   if(resultValid.error)
    {  
        console.log(resultValid.error.details , "type ",typeof resultValid.error.details)

        return this.notfound(res,resultValid.error.details[0].message)
    }
    else
    {
        console.log("Validated Data  !! ")
    }
                  await this._usecase.execute(resultValid)
              } catch (error:any) {
                
              }
      }
}
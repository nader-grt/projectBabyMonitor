import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import LoginUserUseCase  from "../../usecase/auth/LoginUserUseCase"


export default class LoginUserController extends BaseController
{
        
  private   _usecase!: LoginUserUseCase
      constructor(usecase : LoginUserUseCase)
      {super()
               this._usecase = usecase 
      }

      protected async executeImplment(req: Request, res: Response): Promise<any> {
             
           const {email,password}  = req.body


                
              try {
                
                const dto :any = {
                    email,password 
                }

                    await this._usecase.execute(dto)
              } catch (error:any) {
                
              }
      }
}
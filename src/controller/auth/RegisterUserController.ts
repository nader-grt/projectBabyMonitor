import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import RegisterUserUseCase from "../../usecase/auth/RegisterUserUseCase";
import Joi from "joi";

export default class RegisterUserController extends BaseController {
  private async validateUser(user: any): Promise<any> {
    const JoiSchema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(12).max(30).required(),

      password: Joi.number()

        .min(4)
        // .max(6)
        .required(),
    }); // .options({ abortEarly: false })

    return JoiSchema.validate(user);
  }

  private _registerUsecase!: RegisterUserUseCase;
  constructor(usecase: RegisterUserUseCase) {
    super();

    this._registerUsecase = usecase;
  }

  protected async executeImplment(req: Request, res: Response): Promise<any> {
    const { firstName, lastName, email, password } = req.body;

    try {

      const dtoUserInfo :any = {
        firstName, lastName, email, password 
      }


      console.log("controller  ",dtoUserInfo)

   const resultValidateUserInfo :any =         await  this.validateUser(dtoUserInfo)

     if(resultValidateUserInfo.error)
     {

     }else
     {

     }
         await this._registerUsecase.execute(dtoUserInfo)

           return this.ok(res,"ok")
    } catch (error: any) {}
  }
}

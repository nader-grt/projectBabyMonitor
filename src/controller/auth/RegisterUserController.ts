import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import RegisterUserUseCase from "../../usecase/auth/RegisterUserUseCase";
import Joi from "joi";



/**
 * 
 {
    "firstName":"islem",
  "lastName":"",
    "email":"islemmonastir@gmail.com",
    "password": "123456789",
    "confirmPassword":"",
    "nameBaby":"",
    "BirthDayBaby"
}
 */
export default class RegisterUserController extends BaseController {
  // private async validateUser(user: any): Promise<any> {
  //   const JoiSchema = Joi.object({
  //     firstName: Joi.string().min(3).max(30).required(),
  //     lastName: Joi.string().min(3).max(30).required(),
  //     email: Joi.string().min(12).max(30).required(),

  //     password: Joi.number()

  //       .min(4)
  //       // .max(6)
  //       .required(),
  //       confirmPassword:Joi.number().min(4).required(),
  //       nameBaby:Joi.string().min(3).required(),
  //       BirthDayBaby:Joi.date().required(),
  //   }); // .options({ abortEarly: false }),
  

  //   return JoiSchema.validate(user);
  // }


  private async validateUser(user: any): Promise<any> {
    const JoiSchema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
  
      lastName: Joi.string().min(3).max(30).required(),
  
      email: Joi.string().email().required(),
  
      password: Joi.string().min(6).required(),
  
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
        }),
  
      nameBaby: Joi.string().min(3).required(),
  
      BirthDayBaby: Joi.date()
        .iso() //  enforce ISO format (YYYY-MM-DD)
        .max("now") //  prevent future dates
        .required()
        .messages({
          "date.base": "BirthDayBaby must be a valid date",
          "date.format": "BirthDayBaby must be in YYYY-MM-DD format",
          "date.max": "BirthDayBaby cannot be in the future",
        }),
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user);
  }

  private _registerUsecase!: RegisterUserUseCase;
  constructor(usecase: RegisterUserUseCase) {
    super();

    this._registerUsecase = usecase;
  }

  protected async executeImplment(req: Request, res: Response): Promise<any> {
    const { firstName, lastName, email, password ,confirmPassword,nameBaby,BirthDayBaby} = req.body;

    try {

      const dtoUserInfo :any = {
        firstName, lastName, email, password ,confirmPassword,nameBaby,BirthDayBaby
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

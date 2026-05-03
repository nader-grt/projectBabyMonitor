import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import RegisterUserUseCase from "../../usecase/auth/RegisterUserUseCase";
import Joi from "joi";
import IUserInfoDTO from "../../usecase/auth/RegisterUserUseCase";

export default class RegisterUserController extends BaseController {

  private _registerUsecase: RegisterUserUseCase;

  constructor(usecase: RegisterUserUseCase) {
    super();
    this._registerUsecase = usecase;
  }


  private validateUser(data: any) {
    const schema = Joi.object({
      fullName: Joi.string().min(3).max(50).required(),

      email: Joi.string().email().required(),

      password: Joi.string().min(6).required(),

      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
        }),

      baby: Joi.object({
        name: Joi.string().min(2).max(50).required(),

        birthDate: Joi.date()
          .iso()
          .max("now")
          .required()
          .messages({
            "date.base": "Birth date must be valid",
            "date.format": "Use YYYY-MM-DD",
            "date.max": "Birth date cannot be in the future",
          }),
      }).required(),
    })
    .options({ abortEarly: false, stripUnknown: true }); //  

    return schema.validate(data);
  }


  protected async executeImplment(req: Request, res: Response): Promise<any> {
    try {
      const { error, value } = this.validateUser(req.body);
  
      if (error) {
        const formattedErrors = error.details.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        }));
  
        return this.fail(res, "Validation error", formattedErrors);
      }
  
      const { confirmPassword, ...cleanData } = value;
  
      const dto :IUserInfoDTO= {
        fullName: cleanData.fullName,
        email: cleanData.email,
        password: cleanData.password,
        baby: {
          name: cleanData.baby.name,
          birthDate: cleanData.baby.birthDate,
        },
      };
  
      const result = await this._registerUsecase.execute(dto);
  
      return this.created(res, result);
  
    } catch (error: any) {
      return this.internalError(res, error.message);
    }
  }
}
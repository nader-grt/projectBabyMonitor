import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import RegisterUserUseCase from "../../usecase/auth/RegisterUserUseCase";
import Joi from "joi";


export default class RegisterUserController extends BaseController {

  private _registerUsecase: RegisterUserUseCase;

  constructor(usecase: RegisterUserUseCase) {
    super();
    this._registerUsecase = usecase;
  }


  private validateUser(data: any) {
    const schema = Joi.object({
      fullName: Joi.string()
        .pattern(/^[A-Za-z]+ [A-Za-z]+$/)
        .required()
        .messages({
          "string.pattern.base":
            "Full name must contain exactly two words separated by one space (e.g. 'Ali Ahmed')",
        }),
  
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
    }).options({ abortEarly: false, stripUnknown: true });
  
    return schema.validate(data);
  }


  protected async executeImplment(req: Request, res: Response): Promise<any> {
    try {
      const { error, value } = this.validateUser(req.body);

      //  Validation error
      if (error) {
        const formattedErrors = error.details.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        }));

        return this.fail(res, "Validation error", formattedErrors);
      }

      //  Remove confirmPassword
      const { confirmPassword, ...cleanData } = value;

      //
      const dto: any = {
        fullName: cleanData.fullName,
        email: cleanData.email,
        password: cleanData.password,
        baby: {
          name: cleanData.baby.name,
          birthDate: cleanData.baby.birthDate,
        },
      };

      // Call UseCase
     const result = await this._registerUsecase.execute(dto);

      

    
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false, // 
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 1, 
      });

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });

   
      return this.created(res, {
        message: "User registered successfully",
        user: result.user,
        tokens: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });

    } catch (error: any) {
      return this.internalError(res, error.message);
    }
  }
}
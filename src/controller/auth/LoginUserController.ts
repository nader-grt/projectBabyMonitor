import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import LoginUserUseCase from "../../usecase/auth/LoginUserUseCase";
import Joi from "joi";

export default class LoginUserController extends BaseController {

  private _usecase: LoginUserUseCase;

  constructor(usecase: LoginUserUseCase) {
    super();
    this._usecase = usecase;
  }

 
  private validate(data: any) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).options({ abortEarly: false });

    return schema.validate(data);
  }


  protected async executeImplment(req: Request, res: Response): Promise<any> {
    try {
      const { error, value } = this.validate(req.body);

      //  Validation error
      if (error) {
        const formattedErrors = error.details.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        }));

        return this.fail(res, "Validation error", formattedErrors);
      }

   
      const dto :any = {
        email: value.email,
        password: value.password,
      };

    
      const result = await this._usecase.execute(dto);

 
       

    
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
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
      });

      return this.ok(res, {
        message: "Login successful",
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
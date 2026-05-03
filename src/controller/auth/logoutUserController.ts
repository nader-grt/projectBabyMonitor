import { Request, Response } from "express";
import BaseController from "../../infra/BaseController";
import LogoutUserUseCase from "../../usecase/auth/logoutUserUseCase";

export default class LogoutUserController extends BaseController {

  private _usecase: LogoutUserUseCase;

  constructor(usecase: LogoutUserUseCase) {
    super();
    this._usecase = usecase;
  }

  protected async executeImplment(req: Request, res: Response): Promise<any> {
    try {

    
      const refreshToken = req.cookies?.refreshToken;

      // call use case
      await this._usecase.execute(refreshToken);

      // clear cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return this.ok(res, {
        message: "Logged out successfully",
      });

    } catch (error: any) {
      return this.internalError(res, error.message);
    }
  }
}
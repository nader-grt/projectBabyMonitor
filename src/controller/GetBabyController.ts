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
    } catch (error: any) {}
  }
}

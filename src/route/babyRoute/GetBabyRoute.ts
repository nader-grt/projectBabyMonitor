import { Request, Response, Router } from "express";

import GetBabyController from "../../controller/GetBabyController";
import GetBabyUseCase from "../../usecase/GetBabyUseCase";

const router = Router();

const babyusecase = new GetBabyUseCase();
const getBabyRoute = new GetBabyController(babyusecase);

router.get("/baby", (req: Request, res: Response) => {
  // console.log("request is ",req)
  console.log(" rrrrrrrrrr  ", req.body);
  getBabyRoute.execute(req, res);
});

export default router;

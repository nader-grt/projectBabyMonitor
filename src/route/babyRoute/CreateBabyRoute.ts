import { Request, Response, Router } from "express";

import CreateBabyController from "../../controller/CreateBabyController";
import CreateBabyUseCase from "../../usecase/CreateBabyUseCase";

const router = Router()

 const createUsecase = new CreateBabyUseCase()  ;

 const CreateBabyRoute = new CreateBabyController(createUsecase)


router.post("/baby",(req: Request, res: Response) => {

    console.log(" create   ", req.body);
    CreateBabyRoute.execute(req, res);
  })


export default router

import { Request, Response, Router } from "express";

import CreateBabyController from "../../controller/CreateBabyController";
import CreateBabyUseCase from "../../usecase/CreateBabyUseCase";
import RepoUser from "../../repo/repoUser/RepoUser";

const router = Router()
const babyRepo = new RepoUser()
 const createUsecase = new CreateBabyUseCase(babyRepo)  ;

 const CreateBabyRoute = new CreateBabyController(createUsecase)


router.post("/baby",(req: Request, res: Response) => {

    console.log(" create   ", req.body);
    CreateBabyRoute.execute(req, res);
  })


export default router

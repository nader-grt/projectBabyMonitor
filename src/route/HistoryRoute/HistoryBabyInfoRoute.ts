import { Request, Response, Router } from "express";
import RepoUser from "../../repo/repoUser/RepoUser";
import HistoryBabyInfoUseCase from "../../usecase/HistoryBabyInfoUseCase/HistoryBabyInfoUseCase";
import HistoryBabyInfoController from "../../controller/HistoryBabyInfoController/HistoryBabyInfoController";
import verifyToken from "../../middleware/verifyToken";



const router = Router()



const repo = new RepoUser();

 const historyUsecase  =  new HistoryBabyInfoUseCase(repo)
     const historyRoute         = new HistoryBabyInfoController(historyUsecase)


     router.get("/historybaby",verifyToken,(req:Request,res:Response) =>  {

        historyRoute.execute(req,res)
     })

export default router  
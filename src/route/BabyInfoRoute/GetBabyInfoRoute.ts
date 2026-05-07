import { Request, Response, Router } from "express";
import GetBabyInfoController from "../../controller/BabyInfoController/GetBabyInfoController";
import GetBabyInfoUseCase from "../../usecase/BabyInfoUseCase/GetBabyInfoUseCase";
import RepoUser from "../../repo/repoUser/RepoUser";
import verifyToken from "../../middleware/verifyToken";

const router = Router();


  //  this api implment in your hardware esp32  rasebery pi implment 3ndik enty ya islem   replace  data  by babyId 
  /**
  {
    "success": true,
    "message": "baby info with suucess ",
    "data": "69fc70bf65c88b71ef6a196c"   to  

   
    "babyId": "69fc70bf65c88b71ef6a196c",
    sensordata 
}
}
   */
const repo = new RepoUser();
const usecase = new GetBabyInfoUseCase(repo);

const getBabyInfoRoute = new GetBabyInfoController(usecase);


router.get("/userInfoBaby",verifyToken,(req:Request,res:Response)=> {

    getBabyInfoRoute.execute(req,res)

})



export default router;

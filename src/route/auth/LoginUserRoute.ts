import { Request, Response, Router } from "express";
import LoginUserController from "../../controller/auth/LoginUserController";
import LoginUserUseCase  from "../../usecase/auth/LoginUserUseCase"
import RepoUser from "../../repo/repoUser/RepoUser";
import verifyToken from "../../middleware/verifyToken";


const router = Router()

const user =  new RepoUser()
const  loginusecase =  new LoginUserUseCase(user)
const loginRoute = new LoginUserController(loginusecase)



router.post("/loginuser",verifyToken,(req:Request,res:Response)=> {
    loginRoute.execute(req,res)
})

export default router
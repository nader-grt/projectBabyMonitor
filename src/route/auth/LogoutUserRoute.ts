import { Router,Request, Response } from "express";
import LogoutUserController from "../../controller/auth/logoutUserController";
import LogoutUserUseCase from "../../usecase/auth/logoutUserUseCase";
import RepoUser from "../../repo/repoUser/RepoUser";


const router = Router()



const user =  new RepoUser()
const usecase = new LogoutUserUseCase(user)

const logoutRouter = new LogoutUserController(usecase)

  




router.post("/logoutuser",(req:Request,res:Response)=> {
    logoutRouter.execute(req,res)
})


export default router 
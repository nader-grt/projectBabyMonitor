import { Request, Response, Router } from "express";
import RegisterUserController from "../../controller/auth/RegisterUserController";
import RegisterUserUseCase  from "../../usecase/auth/RegisterUserUseCase"
import RepoUser from "../../repo/repoUser/RepoUser";


const router = Router()

const userRepo = new RepoUser()
const registerusecase = new RegisterUserUseCase(userRepo)
const registerRoute = new RegisterUserController(registerusecase)


router.post("/registeruser",(req:Request,res:Response)=> {
    console.log(" registeruser  here ")
    registerRoute.execute(req,res)

})


export default router
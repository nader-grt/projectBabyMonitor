import RepoUser from "../../repo/repoUser/RepoUser";



export default interface IUserLoginDTO
{
     email:string;
     password:string;
}

export  default class LoginUserUseCase
{
    private _loginusecase!:RepoUser
    constructor(loginusecase:RepoUser)
    {
              this._loginusecase = loginusecase
    }

      async execute(dto:IUserLoginDTO):Promise<any>
      {
          try {
                 

                 
          } catch (error:any) {
            
          }
      }
}
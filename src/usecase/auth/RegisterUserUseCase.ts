import RepoUser from "../../repo/repoUser/RepoUser";

 export  default interface IUserInfoDTO
 {
  firstName:string;
  lastName:string;
  email:string;
  password:string;
 }

export default class RegisterUserUseCase 
{

      private _useregister!:RepoUser
      constructor(useregister:RepoUser)
      {
                this._useregister = useregister
      }

      async execute(dto:IUserInfoDTO):Promise<any>
      {

          try {

            console.log("usecase register ",dto)
                const user :any =  await this._useregister.FindUserBabyByEmail(dto.email)


                if(!user)
                {
                    return {suvvess:false,message:"user not found "}
                }

                    
              await this._useregister.RegisterUserBaby(dto)
          } catch (error:any) {
            
          }
      }
}
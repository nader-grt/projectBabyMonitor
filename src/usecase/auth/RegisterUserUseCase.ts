import generateAccessToken from "../../middleware/generateAccessToken";
import UserDomain from "../../model/UserDomain/UserDomain";
import IUserData  from "../../middleware/generateAccessToken"
import RepoUser from "../../repo/repoUser/RepoUser";

 export  default interface IUserInfoDTO
 {
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  nameBaby:string;
  BirthDayBaby:Date;
 }

export default class RegisterUserUseCase 
{


      private async PrepareUserData(userData:any):Promise<any>
      {


        const user = new UserDomain(userData)
            user.setPassword = userData.password 

        return user ;
      }
      private _useregister!:RepoUser
      constructor(useregister:RepoUser)
      {
                this._useregister = useregister
      }

      async execute(dto:IUserInfoDTO):Promise<any>
      {

          try {

            console.log("usecase register ",dto)
                // const user :any =  await this._useregister.FindUserByEmail(dto.email)


                // if(!user)
                // {
                //     return {suvvess:false,message:"user not found "}
                // }


                const userData:any = await this.PrepareUserData(dto)
                    
                console.log("userData ",userData)
        // const result =      await this._useregister.RegisterUser(dto) ;


        const payload :IUserData = {
            email:"islm@gmail.com",
            id:1,
           
        }
              const token :any = await generateAccessToken(payload)

              console.log("token  "  ,token )      //   console.log("result ",result)
          } catch (error:any) {
            
          }
      }
}
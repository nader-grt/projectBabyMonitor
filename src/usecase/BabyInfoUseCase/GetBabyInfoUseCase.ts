import RepoUser from "../../repo/repoUser/RepoUser";


 export interface IInfoDTO
{
      userId:number | any ;
      email:string ;
}

export default class GetBabyInfoUseCase
{

      private _repo: RepoUser;

      constructor(repo: RepoUser) {
        this._repo = repo;
      }

         async execute(userInfo:IInfoDTO):Promise<{success:boolean,message:string,data?:any} | undefined>
         {
            const {userId,email}  = userInfo 
               try {
                       
                 const user =       await  this._repo.FindUserByEmail(email)     ;

                   if(!user)
                   {
                     return {success:false,message:"user not found "}
                   }
                 console.log(user  , "usecase  ")


                   let userIdBaby = user._id
                    console.log("baby info id ",userIdBaby)
                 const infoBaby :any =                  await this._repo.FindBabyInfo(userIdBaby)

                 console.log("baby info  ",infoBaby)


                 return  {success :true,message:"baby info with suucess ",data:infoBaby._id}

               } catch (error:any) {
                console.error(error)
               }
         }
}
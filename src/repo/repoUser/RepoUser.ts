import { UserModel } from "../../model/UserModel";
import IRepoUser from "./IRepoUser";


export default class RepoUser extends IRepoUser
 {
      public  async RegisterUser(dataUser:any):Promise<any>
      {
            try {
                console.log("repoooooooooo  ",dataUser)
            const user:any =     await UserModel.create(dataUser)
            console.log("user register   here ",user)

            return {
              id: user.id, //  clean id
              firstName: user.firstName,
              email: user.email,
            };
            } catch (error:any) {
              console.error("RegisterUser ERROR:", error.message);
              throw error;
            }

      }










      public async GetAll(data:any):Promise<any> 
      {
        // code 
      }


      public async LoginUser(user:any):Promise<any> 
      {
               try {
                
               } catch (error:any) {
                
               }

      }

      public async FindUserByEmail(email:string):Promise<any>
      {

        console.log("repooooo  ",email)

        let MyModel :any | null = {
            find:()=> {}
        };

        console.log(MyModel)
                    try {
                      const user =   await MyModel.find({});

                       return user 
                    } catch (error:any) {
                        
                    }

      }
 }
import IRepoUser from "./IRepoUser";


export default class RepoUser extends IRepoUser
 {
      public  async RegisterUserBaby(userBaby:any):Promise<any>
      {
            try {
                console.log("repoooooooooo  ",userBaby)
                
            } catch (error) {
                
            }

      }










      public async GetAllBaby(userBaby:any):Promise<any> 
      {
        // code 
      }


      public async LoginUserBaby(baby:any):Promise<any> 
      {


      }

      public async FindUserBabyByEmail(email:string):Promise<any>
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
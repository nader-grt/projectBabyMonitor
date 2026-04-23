import RepoUser from "../repo/repoUser/RepoUser";


export default class CreateBabyUseCase
{

      public Temp : number = 37 ;
      private _repoUserBaby:RepoUser
        constructor(repouserBaby:RepoUser)
        {
          this.Temp

          this._repoUserBaby = repouserBaby
        }
      async execute(data?:any):Promise<any>
      {
          
         console.log("fin data  ",data)

           try {
            

             
              await this._repoUserBaby.RegisterUserBaby(data)
           } catch (errorany) {
            console.error("error")
           }
      }
}
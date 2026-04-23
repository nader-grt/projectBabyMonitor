

export default abstract class  IRepoUser
{
     protected abstract RegisterUserBaby(userBaby:any):Promise<any> ;

     protected abstract GetAllBaby(userBaby:any):Promise<any> ;

     protected abstract LoginUserBaby(baby:any):Promise<any>
     protected abstract FindUserBabyByEmail(email:string):Promise<any>
}
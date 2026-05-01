

export default abstract class  IRepoUser
{
     protected abstract RegisterUser(dataUser:any):Promise<any> ;

     protected abstract GetAll(data:any):Promise<any> ;

     protected abstract LoginUser(baby:any):Promise<any>
     protected abstract FindUserByEmail(email:string):Promise<any>
}
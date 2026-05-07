

export default abstract class  IRepoUser
{
     protected abstract RegisterUser(dataUser:any):Promise<any> ;

     protected abstract GetAll(data:any):Promise<any> ;

     protected abstract LoginUser(baby:any):Promise<any>
     protected abstract FindUserByEmail(email:string):Promise<any>
     protected abstract saveRefreshToken(data: {
          userId: string;
          token: string;
          expiresAt: Date;
        }): Promise<any>

        protected abstract revokeRefreshToken(token: string): Promise<void>

        protected abstract FindBabyInfo(userId:any):Promise<any>
        //protected abstract SenSorBabycreate(sensordata:any):Promise<any>
}
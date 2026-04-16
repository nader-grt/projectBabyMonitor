

export default class CreateBabyUseCase
{

      public Temp : number = 37 ;
        constructor()
        {
          this.Temp
        }
      async execute(data?:any):Promise<any>
      {
          
         console.log("fin data  ",data)
      }
}
import BaseController from "../infra/BaseController";
import fatherController from "./fatherController";


export default class EnvirmentController  extends fatherController
{

  public CNSS :string = this.cnss
      constructor(fname:string,lname:string)
      {
        super(fname,lname)
       this.cnss
      }

      public fn3()
      {
          console.log(this.CNSS)
      }

      

      

      

}
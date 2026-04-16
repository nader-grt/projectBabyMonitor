export default class fatherController 
{

     public fName !:string ;
     public lName !: string;
     private age : number  = 20 ;
     static department : string  = "math"
      protected cnss : string = "04h123456"
     constructor(fname:string,lname:string)
     {
        this.fName =fname ;
        this.lName = lname
     }
     public fn1():void
     {
         console.log("fn1 void ",this.fName.toLowerCase())
     }
     public fn2():void
     {
         console.log("fn2 void ",this.fName.toUpperCase() , " age is " , this.age)
     }
    
}
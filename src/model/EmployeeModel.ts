import UserModel from "./UserModel";


export default class EmployeeModel extends UserModel
{
              public salary!:number;
      constructor(firstName:string,lastName:string,email:string,phone:string ,salar:number)
      {
    //    super(firstName,lastName,email,phone)
        super()
        this.firstname = firstName
        this.lastName = lastName
        //aggregation
        // association 
        //compostion  fort 
      }

      public printinfo()
      {
        console.log("firstname  ",this.firstname)
        console.log("lastname ",this.lastName)
        console.log("email ",this.email)
        console.log("phone ",this.phone)
        console.log("salary ",this.salary)
      }
}
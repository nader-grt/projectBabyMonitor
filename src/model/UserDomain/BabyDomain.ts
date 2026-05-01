import UserDomain from "./UserDomain";


export default class BabyDomain extends UserDomain //  parent father or mother 
{
/**
  name: string;
  birthDate: Date;
  parentId: Types.ObjectId;
 */
public name!: string ;
public birthDate!: Date ;



constructor(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string
  },name:string,birthDate:Date) {
  //  super({firstName,lastName,email,password,confirmPassword})
   super(data);
   this.name = name ;
   this.birthDate = birthDate  ;


  }



}
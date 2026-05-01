import jwt from "jsonwebtoken";

  export default  interface IUserData
  {
    id:number;
    email:string;

  }
  //15 or 20 
export default async  function generateAccessToken(user:any):Promise<string>
{


    //   const payload :IUserData = {
    //       email:"islm@gmail.com",
    //       id:1,
         
    //   }
  const  token = jwt.sign( user,process.env.SEKRET_ACCESS_TOKEN!)

  return token ;
}
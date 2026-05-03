import jwt from "jsonwebtoken";

  interface IUserData
  {
    email:string;
    id:number | any;
  

  }
  //15 or 20 
export default async  function generateAccessToken(user:IUserData):Promise<string>
{


    //   const payload :IUserData = {
    //       email:"islm@gmail.com",
    //       id:1,
         
    //   }
  const  token = jwt.sign( user,process.env.SEKRET_ACCESS_TOKEN!,{ expiresIn: "15m" })

  return token ;
}
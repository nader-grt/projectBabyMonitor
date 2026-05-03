import jwt from "jsonwebtoken";

  interface IUserData
  {
    email:string;
    userId:number | any;
  

  }
  //15 or 20 




export default function generateAccessToken(payload: any): string {
  const secret = process.env.SECRET_ACCESS_TOKEN;

  if (!secret) {
    throw new Error("SECRET_ACCESS_TOKEN is missing in .env");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
}
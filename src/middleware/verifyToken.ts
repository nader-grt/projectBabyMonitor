

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function verifyToken(req:Request,res:Response,next:NextFunction):Promise<any>
{


    try {


        const token = ""
        var decoded = jwt.verify(token, 'wrong-secret');



        next()
      } catch(err) {
        // err
      }

}
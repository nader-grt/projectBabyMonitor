

import { Request ,Response } from 'express';

export default  abstract  class BaseController
{


  protected abstract   executeImplment(req:Request ,res:Response):Promise<any>
  

   public async execute(req:Request ,res:Response):Promise<any>
   {
       try {
          await this.executeImplment(req,res)
       } catch (error :any) {
        console.log("error unexpected ")
       }
   }

  

     public create(req:Request ,res:Response)
     {
         console.log("request is ",req)
     }
     public getStausSuccess()
     {
        console.log("success")
     }

     public faler()
     {
         console.log("failer")
     }
}

//const basec = new BaseController()

/**
 * 
 * 
  cycle request  and response 

  response can be html  or xml or json 
  for json   json object notation  ==  format  
  {
    "":"", // key value pair  datatype suport  string number null  array and object 
  }
      request  object for server unique method  get put post delete patch 


      request.body
      request.params
      request.query

      what is in js {}  = []  typeof
      key  key must be unique and can be number or string  value
      {
        name:"ahmed",
        data: {}
      }
      url  domain 
      params
      query params

       status  2xx sucees 201 created 3xx  redirect 4xx  401 unauthrized 404 client  5xx  server 
       

        visibility mode are public protect  private  static 

        class  contain member  data  variables  and function 

        obkect member data 

 */
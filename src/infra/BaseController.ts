

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
     public ok(res:Response,data?:any,message?:any)
     {
       return res.json( {data:data,message:message})
     }

     public resultValue(res:Response,data:any,message?:string)
     {
      return res.json({data,message})
     }
     public notfound(res:Response,error:any,message?:string)
     {
      return res.status(404).json({error,message})
     }


     public unathorized(res:Response,message:any)
     {
       res.status(401).json({message})
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


        rule http  protocol hyper text pransfert protocol 

        model tcp /ip 
        layer application 
        request object  contain two component principal 
        1 header object
        status code 2xx 3xx 4xx 5xx  message  (ok , unautorized conflit)  
        2 body object 
         content type  plain/text  html  json 
         content length 100ko 100mb 
         dommain facebook 
        layer transmi
        layer session 
        layer connection 


  entiy diagram  relationship

    father mother  baby three compnent 
      role  father mother   name lastname email  password
      baby  two  component  each baby depend family 

          info depend capteur   socket.io  +  event   cote subscribe 
        temp  t ,  capteure 1
        freques cardial  capteure 2 
         
        capteur  3  give us three information in same temps 
        temp envirment
        humdity envir
        press envirment

             capteur 4  alone 
        gaz  boolean 

        ai  plus camera 
        postion  enum back aside or 
        crying boolean 



 */
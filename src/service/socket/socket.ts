import { Server } from "socket.io";

export  const socketInit = (server:any) => {


    const io = new Server(server,{
       cors: {origin:"*"}
    });


    io.on("connection", (socket) => {
        console.log(" Client connected:", socket.id);
      });

    return io 

}


 
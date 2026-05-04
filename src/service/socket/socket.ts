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

/**
 * 
     _connectTimeout: number;
    private _corsMiddleware;
    /**
     * Server constructor.
     *
     * @param srv http server, port, or options
     * @param [opts]
     */
 
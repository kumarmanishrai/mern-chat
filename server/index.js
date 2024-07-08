const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")



app.use(cors({
    origin: ["https://mern-chat-phi.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,

}))

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", `
    default-src 'self' 'unsafe-inline' https://mern-chat-ddv1.vercel.app https://mern-chat-phi.vercel.app;
    img-src 'self' data: https://mern-chat-ddv1.vercel.app https://mern-chat-phi.vercel.app;
  `);
  next();
});

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://mern-chat-phi.vercel.app",
        methods: ["POST", "GET"],
    }
})

io.on("connection", (socket)=> {
    console.log(`User connected ${socket.id}`);

    socket.on("join_room", (data)=> {
        socket.join(data)
        console.log(`user with ID = ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data)=> {
        console.log(data);
        socket.to(data.room).emit("recieve_message", data)
    })

    socket.on("disconnect", ()=> {
        console.log("User disconnected", socket.id);
    })
})


server.listen(5000, ()=> {
    console.log("SERVER IS RUNNING ON PORT 5000");
})

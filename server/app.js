const path = require("path");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const { Server } = require("socket.io");
const server = http.createServer(app);
const cookieParser = require('cookie-parser');

const user = require("./routes/user");
const products = require("./routes/product");
const emailCus = require("./routes/email");
const chatRoom = require("./routes/chatRoom")

const cors = require("cors");
app.use(cors());

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(user);
app.use(products);
app.use(emailCus);
app.use(chatRoom);
// sendmail post request

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

const mongooseUrl =
  "mongodb+srv://capnhatthientong:vBWpsqeYtphlZv5c@cluster0.pfd6by5.mongodb.net/data";

const mongoose = require("mongoose");
mongoose
  .connect(mongooseUrl)
  .then((result) => {
    mongoose.Promise = global.Promise;
    let dB = mongoose.connection;
    dB.on("error", console.error.bind(console, "Connect to mongo failed"));
    //===============================
    server.listen(PORT, function () {
      console.log(`Server listening on port ${PORT}`);
    });
    const socketIo = new Server(server, {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        method: ["GET", "POST"],
      }
    });
    socketIo.on("connection", (socket) => {
      console.log("Client connected " + socket.id);
      socket.on("join_room",  (data) => {
        // socketIo.emit("sendDataServer", {data})
        socket.join(data);
        console.log(`UserId: ${socket.id} join room ${data}`)
      })

      socket.on("send_message", (data) => {
        console.log('doenn ',data);
        
        socket.emit("receive_message", data)
        console.log('doenn ',data);
      })

      socket.on("disconnect", ()=> {
        console.log("Client disconected!", socket.id)
      })
    });
  })
  .catch((err) => console.log(err));

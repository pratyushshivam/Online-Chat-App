// importing stuff
//CREATING AN API
//password sx7MeanKxLHKwjJ3
// connetion -> mongodb+srv://admin:<password>@cluster0.nbp7s.mongodb.net/<dbname>?retryWrites=true&w=majority
import express from "express";
import mongoose from "mongoose"; //gonna be the client that is connncting us to out database
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors"
// app config
const app = express();
const port = process.env.PORT || 9000;

//pusher
var pusher = new Pusher({
  appId: "1067340",
  key: "3db6e59d8b7050c2bfc7",
  secret: "d6bf0943dd2c37f1a854",
  cluster: "ap2",
  encrypted: true,
});

// -------------------------------

// middleware
app.use(express.json()); //thus one line changes the output at localhost/v1/messages/new to
// {
//     "_id": "5f535e5603ccaa2a48becc2f",
//     "message": "Yooooooo",
//     "name": "Pratyush",
//     "timestamp": "Demo",
//     "received": false,
//     "__v": 0
// }
app.use(cors())



// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Headers","*") //allowing request come from any endpoint
//     next(); //push request to next
// })







//DB config
const connectin_url =
  "mongodb+srv://admin:sx7MeanKxLHKwjJ3@cluster0.nbp7s.mongodb.net/whatsappdb?retryWrites=true&w=majority";
//database connection
mongoose.connect(connectin_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
//once dn connection is open fire a func
db.once("open", () => {
  console.log("conenxted");
  const msgCollection = db.collection("messagecontents"); //store the collection of database to MSGCOLLECTIONA
  //changessttream listens database and if there is a change it triggers the pusher

  const changeStream = msgCollection.watch(); //NOW KEEP WATCHING THE COLLECTIONS IN MSGCOLLECTION
  //and store in changeStream
  //we want a function to fire off once someting has changed in the database


    changeStream.on("change", (change) => {
    console.log(change);
    console.log("-----------------------------------------------------------")
    console.log(change.operationType)
    console.log('ínsert')
    var ax="insert"
    if(change.operationType === ax){
       const messageDetails=change.fullDocument;
       pusher.trigger("messages","inserted",{
           name:messageDetails.name,
           message:messageDetails.message,
           timestamp:messageDetails.timestamp,
           received:messageDetails.received,
       })
    }
    else{
        console.log("Error Triggering Pusher")
    }
   
  });
});

// ??????surprise
//to create mongodb realtime we use PUSHER.COM
//real time database that means when a message comes on whatsapp it will show you
//right at that time real time
//usually in mongodb you will have to refresh every time to show new messages
//or you will have to write a function that will automatically call the api
//every 5 seconds but it makes the computer super slow. So we use pusher because
//with pusher mongodbchangestream gives ability that whenever there is a change in that
//collecion that means new message is added it uploads it to pusher and we connect pusher
//pushes the data to the frontend. and that time we request to the backend to load the present pusher data

//frontend triggers the backend and backend triggers the pusher and pusher triggers the frontend

//api routes
//retun hello eorld check api
//200 is status code and it means everything is okay. 201 is when send a message and message is stored successfully
//404 is when not found. 500 is status code for error in server side
//when u open facebook and uu see everything that s get requst and if you want t post anything then that is POST
//and if u want to delete a post then that is DELETE REQUEST
app.get("/", (req, res) => res.status(200).send("Hello World"));

//for downloading data/api it is 200
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    //now we want to get the api so we will find the messages in the database
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);

      // FROM HERE WE CAN FINALLY SEE THE DATA OR API AND USE IT
      // Output: at localhost:5000/messages/sync
      // [{"_id":"5f535bdf2422cf27f8d6d5eb","__v":0},{"_id":"5f535c89849fbd3484e6dd55","__v
      // ":0},{"_id":"5f535dc0c1d1f02e38e9d3a4","__v":0},{"_id":"5f535e5603ccaa2a48becc2f
      // ","message":"Yooooooo","name":"Pratyush","timestamp":"Demo","received":false,"__
      // v":0}]
    }
  });
});

//for creating data it is 201
//HERE WE CREATE THE API
//this line of code is to get the data after we send/write in postmans body
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  // console.log(req.body)

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
      // {
      //     "_id": "5f535dc0c1d1f02e38e9d3a4",
      //     "__v": 0
      // } we get the output in this format so we use middlewareeeeeeee
    }
  });
});

//listener
app.listen(port, () => console.log(port));

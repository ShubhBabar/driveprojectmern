const express = require('express')
const app = express();
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cookieParser =require('cookie-parser');
const indexRouter = require('./routes/index.routes')
const path = require('path');
const cors = require('cors');
dotenv.config();

connectToDB();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.use(
    cors({
      origin: "http://localhost:5173", // Adjust this to match your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',indexRouter)
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log("Server is started");
    
})
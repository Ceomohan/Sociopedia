import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import {fileURLToPath} from 'url'
import { register } from './controllers/auth.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'
import { createPost } from './controllers/posts.js'
import {verifyToken} from './middleware/auth.js'
import User from './models/User.js'
import { users } from './data/index.js'





/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/assets',express.static(path.join(__dirname,'public/assets')))



/* FILE STORAGE */ 

const storage = multer.diskStorage({
    destination: function (req,file,cd){
       cb(null,"public/assets")
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

/*    FILE ROUTE */
app.post("/auth/register",upload.single("picture"),register)
app.post("/posts", verifyToken ,upload.single("picture"),createPost)

/* CONFIGURATION ROUTES */

app.use('/auth',authRoutes);  //   IT WILL DIRECT INTO THE ROUTES FOLDER TO THE AUTHROUTES FILE IN THAT THE ROUTE WILL HANDLE THE REQ OF /AUTH/LOGIN 
app.use('/users',userRoutes); 
app.use('/posts',postRoutes)




/* MOONGOOSE CONNECTION */

const PORT = process.env.PORT || 6000

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>console.log(`app is connected to the server in port ${PORT}`))

 //   User.insertMany(users)

})
.catch((error)=>console.log(error))


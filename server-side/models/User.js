import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    picturePath:{
        type:String,
        default:""
    },
    friends:{
        type: Array,
        default:[]
    },
    location:String,
    viewedProfile:Number,
    impressions:Number,
    occupation:String


},
{timeStamps:true}
)

const User = mongoose.model("User",userSchema)




export default User
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:''
    },
    searchHistory:{
        type:Array,
        default:[]
    }
});

export const User = mongoose.model('User', userSchema);// This creates a collection called User based on the properties of the schema
// name of collection must be singular and Capitalized
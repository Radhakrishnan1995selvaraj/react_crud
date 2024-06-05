const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
 name:String,
 email:String,
 phone:String,
 age:Number



})
const UserModel=mongoose.model('users',UserSchema)
module.exports=UserModel
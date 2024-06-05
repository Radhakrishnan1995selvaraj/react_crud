const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')


const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/crud')

app.get("/",(req,res)=>{
    UserModel.find({})
    .then(inputs=>res.json(inputs))
    .catch(err=>res.json(err))
   
   
   })

   app.get("/editUser/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(inputs=>res.json(inputs))
    .catch(err=>res.json(err))
   
   
   })

   app.put("/update/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:req.body._id},(req.body))
    .then(inputs=>res.json(inputs))
    .catch(err=>res.json(err))
   
   
   })



   app.delete("/deleteUser/:id",(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(inputs))
    .catch(err=>res.json(err))
   
   
   })


app.post("/create",(req,res)=>{
 UserModel.create(req.body)
 .then(users=>res.json(users))
 .catch(err=>res.json(err))


})

app.listen(3002,()=>{

console.log('server Working')

})
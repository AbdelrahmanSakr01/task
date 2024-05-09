const express = require ('express');
const req = require('express/lib/request');
const app = express();
app.use (express.json());
const mongoose = require ('mongoose');
const multer =require ('multer');
const upload = multer ({dest : 'uploads/'});
 

// let app = express();
mongoose.connect("mongodb://0.0.0.0:27017/users",
).then(()=>console.log ('db is connected'))
.catch((err)=>{console.error(err);});

// --------------------------------------------multer opration -----------------------
app.post('/api/upload', upload.single ('file'),(req,res)=>{
    // res.json(req.file);
    res.send("uploaded suceccfuly");
});


const userSchema = new mongoose.Schema({
    name : String,
    phone : String,
    id : Number,
})
const foodSchema  = new mongoose.Schema({
    name : String,
    id : Number,
})
let foodModel = new mongoose.model("foods",foodSchema)
const clothesSchema  = new mongoose.Schema({
    name : String,
    id : Number,
})
let clothesModel = new mongoose.model("clothes",clothesSchema)
const booksSchema  = new mongoose.Schema({
    name : String,
    id : Number,
})
let booksModel = new mongoose.model("books",booksSchema)


let userModel = new mongoose.model ("users",userSchema);
const donorSchema =new mongoose.Schema ({
    id : Number ,
    name : String,
    phone : String ,
    address : String ,
})
let donorModel =new mongoose.model ("donors",donorSchema);
let newuser = new userModel({

    name : "mohamed ramadan ",
    phone :"0121212121",
    id :55,
}).save();

let newuser1 = new donorModel ({
    name : "abdelrahman sakr",
    id : 22,
    phone : "01207586973",
    address : "portfouad",
}).save (); 
let newuser2 = new donorModel({
    name :"mohamed henedy",
    phone :"01222222225",
    id :66,
    address:"cairo",
}).save ();
let newuser3 = new userModel({
    id :88,
    name  :"hassan elsayed ",
    phone :"0155555556",
}).save ();
//---------------------------------get opration if the user don't select any path ------------------------
app.get ('/',async(req,res)=>
{
    res.send("created by abdelrahman sakr")
})
//-------------------------------to get all user ------------------------------
app.get ('/users',async (req ,res )=>{
    let allUsers = await userModel.find();
    res.status(200);
    console.log(allUsers.length)
    res.json(allUsers)
})
app.get ('/donors',async (req ,res )=>{
    let allUsers = await donorModel.find();
    res.status(200);
    console.log(allUsers.length)
    res.json(allUsers)
})
app.get ('/foods',async (req ,res )=>{
    let allUsers = await foodModel.find();
    res.status(200);
    console.log(allUsers.length)
    res.json(allUsers)
})
app.get ('/books',async (req ,res )=>{
    let allUsers = await booksModel.find();
    res.status(200);
    console.log(allUsers.length)
    res.json(allUsers)
})
app.get ('/clothes',async (req ,res )=>{
    let allUsers = await clothesModel.find();
    res.status(200);
    console.log(allUsers.length)
    res.json(allUsers)
})

//-------------------------------------------post opration ----------------------------------
app.post('/users',async(req,res)=>{
    const data = userModel({
        name :req.body.name,
        id : req.body.id,
        phone :req.body.phone,

    });
    const val=await data.save();
    res.json(val)
    res.status(201)
    res.json ("created succesfull")
    
})
app.post('/donors',async(req,res)=>{
    const data = donorModel({
        address: req.body.address,
        name :req.body.name,
        id : req.body.id,
        phone :req.body.phone,

    });
    const val=await data.save();
    res.json(val)
    res.status(201)
    res.json ("created succesfull")
    
})
app.post('/foods',async(req,res)=>{
    const data = foodModel({
        name :req.body.name,
        id : req.body.id,

    });
    const val=await data.save();
    res.json(val)
    res.status(201)
    res.json ("created succesfull")
    
})
app.post('/books',async(req,res)=>{
    const data = booksModel({
        name :req.body.name,
        id : req.body.id,

    });
    const val=await data.save();
    res.json(val)
    res.status(201)
    res.json ("created succesfull")
    
})
app.post('/clothes',async(req,res)=>{
    const data = clothesModel({
        name :req.body.name,
        id : req.body.id,

    });
    const val=await data.save();
    res.json(val)
    res.status(201)
    res.json ("created succesfull")
    
})
// --------------------------------------------------put or update opration ---------------------------------
app.put("/update_users/:id",async(req,res)=>{

    let upid=req.params.upid;
    let upname=req.params.upname;
    let upphone= req.params.upphone;


    userModel.findOneAndUpdate({_id:upid},{$set:{name:upname,phone:upphone}},{new:true},(err,data)=>{

        if (data ==null){
            res.send ("no data found ")
        }
        else{
            res.send(data)
        }
    })

})
// ------------------------------------------------delete opration ----------------------------------------
app.delete('/delete_users/:id',function(req,res){
    let delid =req.params.id;
    userModel.findOneAndDelete(({_id:delid}),function (err,docs){
        if (docs=null){
                res.send("wrong Id");
        }
        else {
            res.send(docs);
        }
    })
})

app.listen(3000,function()
{
    console.log ('server in')
})
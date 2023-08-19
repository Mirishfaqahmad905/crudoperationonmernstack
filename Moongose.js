const express=require('express');
const { default: mongoose } = require('mongoose');
 const moongose=require('mongoose');
   const app=express();
  moongose.set('strictQuery',false);
   // connection creation with mongodb and automatically create the new database whch i gave the name i gaven
    
 mongoose.connect('mongodb://127.0.0.1:27017/Mir',{
    useNewUrlParser:true,
    useUnifiedTopology:true ,
     // for remote to extra statement like above will be writen
    }).then(()=>{
     console.log('connected');
 }).catch(()=>{
     console.log('error ');
 });
  
  // Schema 
  // A Mongoose Schema define the structure of the document
  // default value validator etc...
  const  TableStructure= new mongoose.Schema({
     name:
      {
         type: String,
          required:true 
        },
     course:String,
      video:Number,
       Auther:String,
        Active:Boolean,
         Date:{
             type:Date, 
              default:Date.now 
         }  
         
  });
   
   // Mongoose Model are creating the collections 
    const Collections=new mongoose.model('collections',TableStructure);
     


    // all command of mongodb 
    // show collections
     // Adding Document in collections 
    //  > db.collections.find({name:'ahmadkhan',course:'reactjs'}).pretty();
    // > db.collections.insertOne({name:'ahmadkhan',course:'reactjs',video:'23',auther:'mirtalha'});
    // db.ahmad_data.find()
// { "_id" : ObjectId("6428d37b1723be078c9e26b6"), "name" : "ahmad", "email" : "ahmad@gmail.com", "password" : "2343" }
// show number of recrod you want filtering 
// db.collections.find({name:'ahmadkhan'},{name:1}).pretty();
// number of record you want to show use limit 
// db.collections.find({auther:'mirtalha'},{auther:2}).limit(2);
// > db.collections.find({auther:'mirtalha'},{auther:2}).limit(2).skip(1);
 // update 
// db.collections.update({name:'ahmad'},{name:'takhakhan'});
//update the document 
// db.collections.update({name:'ahmadkhan'},{$set:{name:'Mir'}});
// db.collections.updateMany({name:'ahmadkhan'},{$set:{name:'hadi'}});
// Delete
// db.collections.deleteMany({name:'hadi'});
// > db.collections.deleteOne({name:"mir"});

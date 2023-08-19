const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// Set up middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
 mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
   console.log('connected');
}).catch(()=>{
   console.log('error during connections');
})

// Define user schema
const userSchema = new mongoose.Schema({
  name:  {
     type:String,
      
  },
  email:{
     type:String,
     unique:true
  },
  password: String,
});

// Define user model
const User = mongoose.model('User', userSchema);

// Handle POST request to /api/users

app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.send({ message: "Please Enter Data" });
     console.log('Enter value in input field ');
    return;
  }

  try {
    // Check if email already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       console.log('email already exist ');
      res.send({ message: "Email already exists" });
      return;
    }

    // Create new user instance
    const user = new User({ name, email, password });

    // Save user to database
    await user.save();
    console.log(name, email, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// app.post('/api/users', async (req, res) => {
//   const { name, email, password } = req.body;
//    console.log(name,email,password);
//     if(!name || !email || !password){
//  res.send({message:"please enter data first"});
//          return;
          
//     }
//      try{
//        // checking the email exist or not 
//         const existemail= await User.findOne({email});
//          if(existemail){
//            res.status(409).json({message:'email already exitsts'});
//             return;
//          }
//      }
//      else 
//       {

//   // Create new user instance
//   const user = new User({ name, email, password });

//   try {
//     // Save user to database
//     await user.save();
//      console.log(name,email,password);
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
// });



 //



 app.get('/api/users/login', async (req, res) => {
  const { email, password } = req.query;
 console.log(email,password);
  try {
    // Find the user with the provided email and password
    const user = await User.findOne({ email, password });


    if (user) {
      res.status(200).json({ message: 'User authenticated successfully' });
       console.log('user is authenticated successfully');
    } else {
      res.send({ message: 'Invalid email or password' });
       console.log('invalid user is not authenticated successfully');
        
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 // fetching data from database 
 app.get('/GetData', async (req, res) => {
  try {
    const fetchData = await User.find();
    console.log(fetchData);
    res.send(fetchData);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error during fetching data: ${err}`);
  }
});



  // Delete Data from Mongodbd 
  app.delete('/DeleteData/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedUser = await User.deleteOne({ _id: id });
      res.json(deletedUser);
    } catch (error) {
      console.error(error+"Database ");
      res.status(500).send("Error during deleting Data");
    }
  });
  


   // Handle Update Code

   app.put('/UpdateData/:id', async (req, res) => {
    const { email, password } = req.body;
    try {
      const updatedata = await User.findByIdAndUpdate(
        req.params.id,
        { email, password },
        { new: true }
      );
      res.status(200).send(updatedata);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  
// Start server
app.listen(5000, () => {
  console.log('Server started on port 3000');
});

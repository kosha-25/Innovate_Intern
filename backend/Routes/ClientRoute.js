import express from 'express'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../models/userModels.js'
import Category from '../models/categoryModels.js';
// import Client from '../models/clientModels.js';
import mongoose from 'mongoose';
import multer from 'multer';
import NewClient from '../models/newclientModels.js';
// import message from 'antd'
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const upload = multer({ storage: storage });

router.post('/clientsignup', async (req, res) => {
    // const { name, email, password, isAdmin, isClient } = req.body;
    try {
      var user = await User.findOne({ email: req.body.email });
  
      if (user) {
        return res.status(200).json({ message: "User already Exist", success: false });
      }
      const pass = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pass, salt);
  
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
  
      });
  
      await user.save();
  
      res.status(200).send({ message: "Registration successful", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false, meaasge: `Register Controller ${error.message}`,});
    }
  });
  
  
  router.post('/clientlogin', async (req, res) => {
      try {
  
        const { email, password } = req.body;
          const user = await User.findOne({ email });
      
  
          if (!user) {
            return res
              .status(200)
              .send({message: "Invalid EmailId or password", success: false });
          }
      
          const isMatch = await bcrypt.compare(password, user.password);
      
          if (!isMatch) {
            return res
              .status(200)
              .send({ message: "Invalid EmailId or password", success: false });
          }
      
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).send({ message: "Login Success", success: true, token });
        } catch (error) {
          console.log(error);
          res.status(500).send({ message: `Error in login CTRL ${error.meaasge}` });
        }
  });

  router.post('/getuserdata', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(404).send({
          message: "user not found",
          success: false,
        });
      } else {
        console.log(res);
        res.status(200).send({
          success: true,
          data: {
            name: user.name,
            email: user.email,
  
          },
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({
          message: `Error in Auth CTRL ${error.meaasge}`,
          success: false,
          error,
        });
    }
  })

  router.post('/applyrole', upload.single('image'), async (req, res) => {
    try {
      console.log('Request body:', req.body); // Debugging line
      console.log('Uploaded file:', req.file);
  
      // Validate required fields
      if (!req.body.password) {
        return res.status(400).json({ message: 'Password is required', success: false });
      }
      if (!req.body.name) {
        return res.status(400).json({ message: 'Name is required', success: false });
      }
      if (!req.body.email) {
        return res.status(400).json({ message: 'Email is required', success: false });
      }
  
      // Check if client already exists
      let newclient = await NewClient.findOne({ email: req.body.email });
      if (newclient) {
        return res.status(200).json({ message: 'Client already exists', success: false });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      let categoryId;
      if (req.body.category) {
        categoryId = new mongoose.Types.ObjectId(req.body.category); // Convert to ObjectId
      }
  
      // Create the new client
      newclient = new NewClient({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        image: req.file ? req.file.path : null, // Ensure file path is handled
        category: categoryId
         // Handle optional category
      });
  
      await newclient.save();
  
      res.status(200).send({ message: 'Client added successfully', success: true });
    } catch (error) {
      console.log('Error adding client:', error.message);
      console.error(error.stack);
      res.status(500).send({ success: false, message: `Client Controller Error: ${error.message}` });
    }
  });

  router.get('/role', async (req, res) => {

    try {
      const newClients = await NewClient.find();
      res.status(200).json(newClients);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: `NewClients Controller ${error.message}` });
    }
  
  
  })

  router.get('/role/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const client = await NewClient.findById(id).populate('category');
      if (!client) {
        return res.status(404).send({ success: false, message: 'Client not found' });
      }
      res.status(200).json(client);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: `Client Controller ${error.message}` });
    }
  });

  
router.put('/role/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email, address, category } = req.body;

  try {
    // Find the client by ID
    const client = await NewClient.findById(id);

    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // Update client details
    client.name = name || client.name;
    client.email = email || client.email;
    client.address = address || client.address;
    client.category = category || client.category;
    

    // Save the updated client
    await client.save();

    res.status(200).json({ success: true, message: 'Client updated successfully', client });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Client Controller ${error.message}` });
  }
});

// router.delete('/deletenewclient/:id', async (req, res) => {
//   const clientId = req.params.id;

//   try {
//     // Use Mongoose findByIdAndDelete to find the client by ID and delete it
//     const deletedClient = await NewClient.findByIdAndDelete(clientId);

//     if (!deletedClient) {
//       return res.status(404).json({ success: false, message: 'Client not found' });
//     }

//     res.status(200).json({ success: true, message: 'Client deleted successfully', deletedClient });
//   } catch (error) {
//     console.error('Error deleting client:', error.message);
//     res.status(500).json({ success: false, message: `Failed to delete client: ${error.message}` });
//   }
// });

router.put('/approve/:id', async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await NewClient.findById(clientId);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.isApproved = true; // Update the client's status to approved (assuming you have an `isApproved` field)
    await client.save();

    res.status(200).json({ message: 'Client approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving client', error });
  }
});

router.delete('/deleteapproval/:id', async (req, res) => {
  const clientId = req.params.id;

  try {
    // Use Mongoose findByIdAndDelete to find the client by ID and delete it
    const deletedClient = await NewClient.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    res.status(200).json({ success: true, message: 'Client deleted successfully', deletedClient });
  } catch (error) {
    console.error('Error deleting client:', error.message);
    res.status(500).json({ success: false, message: `Failed to delete client: ${error.message}` });
  }
});



  export {router as clientRouter};
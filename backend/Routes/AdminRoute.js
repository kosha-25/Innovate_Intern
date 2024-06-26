import express from 'express'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../models/userModels.js'
import Category from '../models/categoryModels.js';
import Client from '../models/clientModels.js';
import mongoose from 'mongoose';
import multer from 'multer';
import Admin from '../models/adminModel.js';
import NewClient from '../models/newclientModels.js';
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

router.post('/signup', async (req, res) => {
  // const { name, email, password, isAdmin, isClient } = req.body;
  try {
    var admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      return res.status(200).json({ message: "Admin already Exist", success: false });
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,

    });

    await admin.save();

    res.status(200).send({ message: "Registration successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, meaasge: `Register Controller ${error.message}`,});
  }
});


router.post('/adminlogin', async (req, res) => {
    try {

      const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
    

        if (!admin) {
          return res
            .status(200)
            .send({message: "Invalid EmailId or password", success: false });
        }
    
        const isMatch = await bcrypt.compare(password, admin.password);
    
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: "Invalid EmailId or password", success: false });
        }
    
        const token = jwt.sign({ id: Admin._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send({ message: "Login Success", success: true, token });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in login CTRL ${error.meaasge}` });
      }
});

router.get('/category', async (req, res) => {

  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Category Controller ${error.message}` });
  }


})

router.post('/addcategory', async (req, res) => {

  try {
    var category = await Category.findOne({ name: req.body.name });

    if (category) {
      return res.status(200).json({ message: "Category already Exist", success: false });
    }

    category = await Category.create({
      name: req.body.name,
     
    });

    await category.save();

    res.status(200).send({ message: "Category added successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, meaasge: `Category Controller ${error.message}`,});
  }
});

router.post('/addclient', upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging line
    console.log('Uploaded file:', req.file);
    // Validate required fields
    if (!req.body.password) {
      throw new Error('Password is required');
    }
    if (!req.body.name) {
      throw new Error('Name is required');
    }
    if (!req.body.email) {
      throw new Error('Email is required');
    }

    // Check if client already exists
    let client = await Client.findOne({ email: req.body.email });
    if (client) {
      return res.status(200).json({ message: "Client already exists", success: false });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let categoryId;
    if (req.body.category) {
      categoryId = new mongoose.Types.ObjectId(req.body.category); // Convert to ObjectId
    }

    // Create the new client
    client = new Client({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      salary: req.body.salary,
      address: req.body.address,
      image: req.body.image, // Ensure file path is handled
      category: categoryId // Handle optional category
    });

    await client.save();

    res.status(200).send({ message: "Client added successfully", success: true });
  } catch (error) {
    console.log('Error adding client:', error.message);
    console.error(error.stack); 
    res.status(500).send({ success: false, message: `Client Controller Error: ${error.message}` });
  }
});

router.get('/client', async (req, res) => {

  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Client Controller ${error.message}` });
  }


})

router.get('/client/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await Client.findById(id).populate('category');
    if (!client) {
      return res.status(404).send({ success: false, message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Client Controller ${error.message}` });
  }
});

router.get('/category/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Category Controller: ${error.message}` });
  }
});

router.put('/category/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  try {
    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Update category details
    if (name) {
      category.name = name;
    }
    
    // Save the updated category
    await category.save();

    res.status(200).json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Category Controller: ${error.message}` });
  }
});




router.put('/category/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body; // Assuming name is the property you want to update

  try {
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

  router.delete('/deleteclient/:id', async (req, res) => {
    const clientId = req.params.id;
  
    try {
      // Use Mongoose findByIdAndDelete to find the client by ID and delete it
      const deletedClient = await Client.findByIdAndDelete(clientId);
  
      if (!deletedClient) {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
  
      res.status(200).json({ success: true, message: 'Client deleted successfully', deletedClient });
    } catch (error) {
      console.error('Error deleting client:', error.message);
      res.status(500).json({ success: false, message: `Failed to delete client: ${error.message}` });
    }
  });

  router.delete('/deletecategory/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      console.log(`Attempting to delete category with ID: ${categoryId}`);
  
      const category = await Category.findByIdAndDelete(categoryId);
  
      if (!category) {
        console.log('Category not found');
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
  
      console.log('Category deleted successfully');
      res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  
  


  router.get('/admincount', async (req, res) => {
    try {
      const adminCount = await Admin.countDocuments();
      res.status(200).json({ success: true, count: adminCount });
    } catch (error) {
      console.error('Error counting admins:', error);
      res.status(500).json({ success: false, message: 'Failed to count admins' });
    }
  });
  
  router.get('/clientcount', async (req, res) => {
    try {
      const clientCount = await Client.countDocuments();
      res.status(200).json({ success: true, count: clientCount });
    } catch (error) {
      console.error('Error counting clients:', error);
      res.status(500).json({ success: false, message: 'Failed to count clients' });
    }
  });
  

  router.get('/salarytotal', async (req, res) => {
    try {
      const totalSalary = await Client.aggregate([

        { $group: { _id: null, total: { $sum: '$salary' } } }
      ]);
  
      const total = totalSalary[0] ? totalSalary[0].total : 0;
      res.status(200).json({ success: true, totalSalary: total });
    } catch (error) {
      console.error('Error calculating total salary:', error);
      res.status(500).json({ success: false, message: 'Failed to calculate total salary' });
    }
  });
  
  router.get('/adminlogin', async (req, res) => {

    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: `Admin Controller ${error.message}` });
    }
  
  
  })

  router.get('/approved-list/:id', async (req, res) => {
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

  router.get('/approved-list', async (req, res) => {

    try {
      const newClients = await NewClient.find();
      res.status(200).json(newClients);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: `NewClients Controller ${error.message}` });
    }
  
  
  })

    
router.put('/approved-list/:id', async (req, res) => {
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


export {router as adminRouter}
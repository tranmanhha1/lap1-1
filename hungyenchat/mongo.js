const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// ket noi voi mongodb
mongoose.connect('mongodb://localhost:27017/manhha1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//dinh nghia schema cho san pham

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    qty: Number,
});

//tao mo hinh product tu schema
const Product = mongoose.model('Product', productSchema);

//su dung body-parser de parse du liu tu request
app.use(bodyParser.json());

//Routes

// Get all products
app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get a specific product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//create a new product

app.post('/api/products', async (req, res) => {
    const { name, price, qty } = req.body;
    try {
        const newProduct = new Product({ name, price, qty });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update a product by ID
app.put('/api/products/:id', async (req, res) => {
    const { name, price, qty } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, qty },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

//delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
    const { name, price, qty } = req.body;
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
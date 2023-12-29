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

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {votes: Number, favs:Number},
});

//tao mo hinh blog tu schema
const blog = mongoose.model('blog', blogSchema);

//su dung body-parser de parse du liu tu request
app.use(bodyParser.json());

//Routes

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    try{
        const blogs = await blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get a specific blog by ID
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'blog not found' });
        }
        res.json(blog);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//create a new blog

app.post('/api/blogs', async (req, res) => {
    const {title, author, body, comments, date, hidden, meta } = req.body;
    try {
        const newblog = new blog({ title, author, body, comments, date, hidden, meta });
        const savedblog = await newblog.save();
        res.json(savedblog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update a blog by ID
app.put('/api/blogs/:id', async (req, res) => {
    const { title, author, body, comments, date, hidden, meta } = req.body;
    try {
        const updatedblog = await blog.findByIdAndUpdate(
            req.params.id,
            { title, author, body, comments, date, hidden, meta },
            { new: true }
        );
        if (!updatedblog) {
            return res.status(404).json({ error: 'blog not found' });
        }
        res.json(updatedblog);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

//delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
    const { title, author, body } = req.body;
    try {
        const deletedblog = await blog.findByIdAndDelete(req.params.id);
        if (!deletedblog) {
            return res.status(404).json({ error: 'blog not found' });
        }
        res.json(deletedblog);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
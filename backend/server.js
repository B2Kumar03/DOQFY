const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const itemRoutes = require('./routes/itemRoutes');


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use('/api', itemRoutes);

app.get("/",(req,res)=>{
    res.send("Hello World");
})

mongoose.connect('mongodb+srv://bk7355583:YSxcSDem5YiZKvtz@cluster0.q8gmi.mongodb.net/inventory',).then(() => console.log("MongoDB connected"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

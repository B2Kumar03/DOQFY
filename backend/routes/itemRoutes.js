const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/items', async (req, res) => {
    console.log("/item");
    const items = await Item.find();
    
    res.json(items);
});

// Add new item
router.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

// Update item
router.put('/items/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});

// Delete item
router.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});

module.exports = router;

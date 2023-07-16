// post.routes.js
const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.client = client;
      await product.save();
      res.json({ message: 'Updated' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save();
    res.json({ message: 'Added' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body;
    if (dep) {
      dep.name = name;
      dep.client = client;
      await dep.save();
      res.json({ message: 'Updated' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if (dep) {
      await Product.deleteOne(dep);
      res.json({ message: 'Deleted' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.put('/products/:id', ProductController.Edit);
router.post('/products', ProductController.Add);
router.put('/products/:id', ProductController.Edit2);
router.delete('/products/:id', ProductController.Delete);

module.exports = router;
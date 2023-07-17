const express = require('express');
const router = express.Router();
const Department = require('../models/department.models');
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getID);
router.post('/departments', DepartmentController.Add);
router.put('/departments/:id', DepartmentController.Edit);
router.delete('/departments/:id', DepartmentController.Delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');
const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getID);
router.post('/employees', EmployeeController.Add);
router.put('/employees/:id', EmployeeController.Edit);
router.delete('/employees/:id', EmployeeController.Delete);

module.exports = router;
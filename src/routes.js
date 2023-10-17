const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const MovementController = require('./app/controllers/MovementController');

const router = Router();

// USER
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

// Movement
router.get('/movements', MovementController.index);
router.get('/movements/:id', MovementController.show);
router.post('/movements/deposit', MovementController.deposit);
router.post('/movements/withdrawal', MovementController.withdrawal);

module.exports = router;

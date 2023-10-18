const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const MovementController = require('./app/controllers/MovementController');
const verifyToken = require('./app/middlewares/verifyToken');

const router = Router();

// USER
router.get('/users', verifyToken, UserController.index);
router.get('/users/:id', verifyToken, UserController.show);
router.delete('/users/:id', verifyToken, UserController.delete);
router.post('/users', verifyToken, UserController.store);
router.put('/users/:id', verifyToken, UserController.update);

router.post('/login', UserController.login);

// Movement
router.get('/movements', verifyToken, MovementController.index);
router.get('/movements/:id', verifyToken, MovementController.show);
router.post('/movements/deposit', verifyToken, MovementController.deposit);
router.post(
  '/movements/withdrawal',
  verifyToken,
  MovementController.withdrawal
);

module.exports = router;

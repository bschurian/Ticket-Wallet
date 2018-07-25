
import * as UserController from '../controller/user.controller.js';

var express = require('express');
var router = express.Router();

/* GET users listing. */
// Get all Users
router.get('/', UserController.getUsers);

// Get one post by cuid
router.get('/:googleid', UserController.getUser);
// router.get('/:googleid', (req, res, next) => {
//   console.log(req.params); 
//   res.json({ 1234: 54312 });  
// });

// Add a new User
router.post('/', UserController.addUser);
// router.post('/', (req, res, next) => {
//   console.log(req.body); 
//   res.json({ 1234: 54312 });  
// });

// Delete a post by cuid
// router.delete('/users/:cuid', UserController.deleteUser);

module.exports = router;

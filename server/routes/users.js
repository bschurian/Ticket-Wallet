import ticketsRouter from './tickets'
import * as UserController from '../controller/user.controller.js';

var express = require('express');
var router = express.Router();

// Get one post by cuid
router.get('/:googleid', UserController.getUser);

// Add a new User
router.post('/', UserController.addUser);

// Delete a post by cuid
router.delete('/', UserController.deleteUsers);

router.use('/:googleid/tickets/:ticketid', UserController.getTicket);

router.use('/:googleid/tickets', UserController.getTickets);


module.exports = router;

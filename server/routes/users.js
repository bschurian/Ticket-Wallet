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

router.get('/:googleid/tickets/:ticketid', UserController.getTicket);

router.get('/:googleid/tickets', UserController.getTickets);

router.post('/:googleid/tickets', UserController.addTicket);


module.exports = router;

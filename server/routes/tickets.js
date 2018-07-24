var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var logger = require('morgan');



var tickets = [42, 43, 44, 45];
router.get('/', function (req, res, next) {
  console.log("got Tickets?");
  res.json(tickets);
});
function validateTicket(ticket){
  return (typeof ticket === "number");
};
router.post('/', function (req, res, next) {
  // res.status(512);
  // res.send();
  if (validateTicket(Number(req.body))) {
    tickets = tickets.concat(10);
    res.status(204)
    res.send();
  } else {
    res.locals.message = "ticket not valid"
    res.status(500);
    res.send();
  }
});

module.exports = router;

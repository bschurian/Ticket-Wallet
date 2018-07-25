import User from '../models/user';
import cuid from 'cuid';
// import slug from 'limax/lib/limax';
import sanitizeHtml from 'sanitize-html';

function sanitizeTicket(ticket) {
	return {
		title: sanitizeHtml(ticket.title),
		content: sanitizeHtml(ticket.content),
		cuid: cuid(),
	};
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
	console.log(req.body);
	if (!req.body.user.name || !req.body.user.googleid) {
		res.status(403).end();
	}

	const newUser = new User(req.body.user);

	// Let's sanitize inputs
	newUser.name = sanitizeHtml(newUser.name);
	newUser.googleid = sanitizeHtml(newUser.googleid);
	newUser.cuid = cuid();
	newUser.tickets = newUser.tickets.map(sanitizeTicket);
	newUser.save((err, saved) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ user: saved });
	});
}

// /**
//  * Get a single user
//  * @param req
//  * @param res
//  * @returns void
//  */
export function getUser(req, res) {
	User.findOne({ googleid: req.params.googleid }).exec((err, user) => {
		if (err) {
			res.status(500).send(err);
		}
		if(user == null){
			res.status(404).send();
		}else{
			res.json({ user });
		}
	});
}

/**
 * Delete all users
 * @param req
 * @param res
 * @returns void
 */
export function deleteUsers(req, res) {
	User.find().exec((err, users) => {
		if (err) {
			res.status(500).send(err);
		}

		users.map((user) => user.remove(() => {
		}));
		res.status(200).end();
	});
}

/**
 * Get all tickets
 * @param req
 * @param res
 * @returns void
 */
export function getTickets(req, res) {
	User.findOne({ googleid: req.params.googleid }).exec((err, user) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(user.tickets);
	});
}

/**
 * Add ticket
 * @param req
 * @param res
 * @returns void
 */
export function addTicket(req, res) {
	const newTicket = sanitizeTicket(req.body);
	User.findOne({ googleid: req.params.googleid }).exec((err, user) => {
		if (err) {
			res.status(500).send(err);
		}
		user.tickets.push(newTicket);
		user.save(function (err, userUpdated) {
			if (err) {
				res.status(500).send(err);
			}
			res.send(newTicket);
		});
	});
}


/**
 * Get one tickets
 * @param req
 * @param res
 * @returns void
 */
export function getTicket(req, res) {
	User.findOne({ googleid: req.params.googleid }).exec((err, user) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json(user.tickets.find(ticket => ticket.cuid == req.params.ticketid));
	});
}

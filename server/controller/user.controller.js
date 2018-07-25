import User from '../models/user';
import cuid from 'cuid';
// import slug from 'limax/lib/limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(503).send(err);
    }
    // res.json({ users });
    res.json(users);
  });
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
    res.json({ user });
  });
}

// /**
//  * Delete a user
//  * @param req
//  * @param res
//  * @returns void
//  */
// export function deleteUser(req, res) {
//   User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
//     if (err) {
//       res.status(500).send(err);
//     }

//     user.remove(() => {
//       res.status(200).end();
//     });
//   });
// }

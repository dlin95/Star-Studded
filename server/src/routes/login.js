const router = require('express').Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post('/login', (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    db.query(`SELECT * FROM users WHERE email = '${userEmail}'`)
      .then((result) => {
        if (bcrypt.compareSync(userPassword, result.rows[0].password)) {
          res.cookie('userId', result.rows[0].id);
          res.status(200).send(result.rows[0]);
        } else {
          return res.status(403).send('Incorrect password');
        }
      })
      .catch((err) => {
        console.log('Error', err);
        return res.sendStatus(403);
      });
  });
  return router;
};
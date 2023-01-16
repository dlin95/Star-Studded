const router = require('express').Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post('/login', (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    db.query(`SELECT * FROM users WHERE email = '${userEmail}'`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(403).send('Email Address Not Found');
        }
        else {
          const user = result.rows[0];
          const success = bcrypt.compareSync(userPassword, user.password);
          if (success) {
            delete user.password;
            res.status(200).send(user);
          } else {
            return res.status(403).send('Invalid password');
          }
        }
      })
      .catch((err) => {
        console.log('Error', err);
        return res.sendStatus(403);
      });
  });
  return router;
};
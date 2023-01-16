const router = require('express').Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post(`/register`, (req, res) => {
    const queryString = `SELECT * FROM users WHERE email = $1`;
    const queryParams = [req.body.email];
    db.query(queryString, queryParams).then((result) => {
      if (result.rowCount > 0) {
        return res.status(403).send('Email address already exist');
      }
    })
      .catch(error => console.log(error));

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    db.query(
      `
      INSERT INTO users
      (first_name, last_name, email, password, profile_photo_url)
      VALUES
      ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hashedPassword}', '${req.body.profile_photo_url}')
      RETURNING id, first_name, last_name, email, profile_photo_url;`
    )
      .then((result) => {
        const newUser = result.rows[0];
        console.log('New user successfully added');
        res.json({
          statusCode: 200,
          message: 'User was successfully created',
          user: newUser
        });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });
  return router;
};
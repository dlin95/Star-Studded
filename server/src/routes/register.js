const router = require('express').Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post(`/users`, (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    db.query(
      `
      INSERT INTO users
      (first_name, last_name, email, password, profile_photo_url)
      VALUES
      ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hashedPassword}', '${profile_photo_url}')
      `
    )
      .then((result) => {
        console.log('New user successfully added');
        res.json({
          statusCode: 200,
          message: 'User was successfully created'
        });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });
  return router;
};
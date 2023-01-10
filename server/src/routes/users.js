const router = require('express').Router();

module.exports = (db) => {
  router.get('/users', (req, res) => {
    db.query(
      `SELECT id, first_name, last_name, email, profile_photo_url FROM users`
    ).then((result) => {
      res.send(result.rows);
    });
  });
}
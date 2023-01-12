const router = require('express').Router();

module.exports = (db) => {
  router.get('/users', (req, res) => {
    db.query(
      `SELECT id, first_name, last_name, email, profile_photo_url FROM users`
    ).then((result) => {
      res.json(result.rows[0]);
    })
      .catch(error => console.log(error));

  });

  router.get('/users/:id', (req, res) => {
    const user_id = req.params.id;
    const queryString = `SELECT * FROM users WHERE id = $1`;
    const queryParams = [user_id];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows[0]);
    })
      .catch(error => console.log(error));

  });

  router.post('/users', (req, res) => {
    const new_user = req.body;
    const queryString = `INSERT INTO users (first_name, last_name, email, password, profile_photo_url)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
    const queryParams = [new_user.first_name, new_user.last_name, new_user.email, new_user.password, new_user.profile_photo_url];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows[0]);
    })
      .catch(error => console.log(error));
  });

  router.put('/users/:id', (req, res) => {
    const new_user = req.body;
    const queryString = `UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4, profile_photo_url=$5
    WHERE id = $6 RETURNING *;`;
    const queryParams = [new_user.first_name, new_user.last_name, new_user.email, new_user.password, new_user.profile_photo_url, Number(request.params.id)];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows[0]);
    })
      .catch(error => console.log(error));

  });

  router.delete('/users/:id', (req, res) => {
    const queryString = `DELETE FROM users WHERE id = $1::integer`;
    const queryParams = [Number(request.params.id)];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows[0]);
    })
      .catch(error => console.log(error));

  });

  return router;
};

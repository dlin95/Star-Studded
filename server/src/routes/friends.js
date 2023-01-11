const router = require('express').Router();

module.exports = (db) => {
  router.get('/friends', (req, res) => {
    const user_id = req.params.id;
    queryString = `SELECT users.first_name, users.last_name FROM friends
    WHERE users_id = $1
    JOIN users ON friends.friend_user_id = users.id`;
    queryParams = [user_id];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows);
    })
      .catch(error => console.log(error));
  });

  router.get('/friends/search', (req, res) => {
    queryString = `SELECT id, first_name, last_name FROM users`;
    db.query(queryString).then((result) => {
      res.json(result.rows);
    })
      .catch(error => console.log(error));
  });

  router.post('/friends', (req, res) => {
    const new_friend = req.body;
    const queryString = `INSERT INTO friends (user_id, friend_user_id)
    VALUES ($1, $2) RETURNING *;`;
    const queryParams = [new_friend.user_id, new_friend.frien_user_id];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows);
    })
      .catch(error => console.log(error));
  });

  router.put('/friends/:id', (req, res) => {
    const new_friends = req.body;
    const queryString = `UPDATE friends SET user_id=$1, friend_user_id=$2
    WHERE friend_user_id = $3 RETURNING *;`;
    const queryParams = [new_friends.user_id, new_friends.friend_user_id, Number(request.params.id)];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows);
    })
      .catch(error => console.log(error));

  });

  router.delete('/friends/:id', (req, res) => {
    const queryString = `DELETE FROM friends WHERE friend_user_id = $1::integer`;
    const queryParams = [Number(request.params.id)];
    db.query(queryString, queryParams).then((result) => {
      res.json(result.rows);
    })
      .catch(error => console.log(error));

  });


  return router;
};
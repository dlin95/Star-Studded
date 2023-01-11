const router = require('express').Router();

module.exports = (db) => {

  // Browse the Watchlist
  router.get('/watchlist/:id', (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM watchlist WHERE id = ${id}`)
      .then((result) => {
        console.log('Watchlist displayed');
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });

  // Add a movie to Watchlist
  router.post('/watchlist/', (req, res) => {
    const user_id = req.params.user_id;
    const movie_id = req.params.movie_id;
    db.query(`INSERT INTO watchlist (user_id, movie_id) VALUES (${user_id}, ${movie_id})`)
      .then((result) => {
        console.log('New movie successfully added to Watchlist');
        res.json(result.rows);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });

  // Delete a movie from the Watchlist
  router.delete('/watchlist/:id/delete', (res, req) => {
    const movie_id = req.params.movie_id
    db.query(`DELETE FROM watchlist WHERE movie_id = ${movie_id}`)
      .then((result) => {
        console.log('Movie successfully deleted from Watchlist');
        res.json(result.rows);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });

  return router;
};
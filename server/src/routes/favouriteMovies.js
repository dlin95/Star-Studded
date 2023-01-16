const router = require('express').Router();

module.exports = (db) => {

  // Browse the user's favourite movies
  router.get('/favourite_movies/:id', (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM favourite_movies WHERE user_id = ${id}`)
      .then((result) => {
        console.log('Favourite movies displayed');
        res.json(result.rows);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });

  // Add a movie to favourite movies
  router.post('/favourite_movies/', (req, res) => {
    const user_id = req.params.user_id;
    const movie_id = req.params.movie_id;
    db.query(`INSERT INTO favourite_movies (user_id, movie_id) VALUES (${user_id}, ${movie_id})`)
      .then((result) => {
        console.log('New movie successfully added to list of favourite movies');
        res.json(result.rows[0]);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });

  // Delete a movie from list of favourite movies
  router.delete('/favourite_movies/:id/delete', (res, req) => {
    const movie_id = req.params.movie_id;
    db.query(`DELETE FROM favourite_movies WHERE movie_id = ${movie_id}`)
      .then((result) => {
        console.log('Movie successfully deleted from list of favourite movies');
        res.json(result.rows[0]);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });

  return router;
};
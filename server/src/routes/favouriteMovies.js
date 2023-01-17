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
  router.post('/favourite_movies', (req, res) => {
    const newFavouriteList = req.body;
    const queryString = `INSERT INTO watchlist (user_id, movie_id, poster_path, title, vote_average, release_date) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;`;
    const queryParams = [newFavouriteList.user_id, newFavouriteList.movie_id, newFavouriteList.poster_path, newFavouriteList.title, newFavouriteList.vote_average, newFavouriteList.release_date];
    db.query(queryString, queryParams)
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
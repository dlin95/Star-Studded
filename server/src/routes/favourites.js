const router = require("express").Router();

module.exports = (db) => {
  // Browse the user's favourite movies
  router.get("/favourites/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM favourites WHERE user_id = ${id}`)
      .then((result) => {
        console.log("Favourite movies displayed");
        res.json(result.rows);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  // Add a movie to favourite movies
  router.post("/favourites", (req, res) => {
    const newFavouriteList = req.body;
    const queryString = `INSERT INTO favourites (user_id, movie_id, poster_path, title, vote_average, release_date) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;`;
    const queryParams = [
      newFavouriteList.user_id,
      newFavouriteList.movie_id,
      newFavouriteList.poster_path,
      newFavouriteList.title,
      newFavouriteList.vote_average,
      newFavouriteList.release_date,
    ];
    db.query(queryString, queryParams)
      .then((result) => {
        console.log("New movie successfully added to list of favourite movies");
        res.json(result.rows[0]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  // Delete a movie from list of favourite movies
  router.delete("/favourites/:id/delete", (req, res) => {
    const movieId = req.params.id;
    db.query(`DELETE FROM favourites WHERE movie_id = ${movieId}::varchar`)
      .then((result) => {
        console.log("Movie successfully deleted from list of favourite movies");
        res.json(result.rows[0]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  return router;
};

const { query } = require("express");

const router = require("express").Router();

module.exports = (db) => {
  // Browse the Watchlist
  router.get("/watchlist/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM watchlist WHERE user_id = ${id}`)
      .then((result) => {
        console.log(result);
        console.log("Watchlist displayed");
        res.json(result.rows);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  // Add a movie to Watchlist
  router.post("/watchlist", (req, res) => {
    const newWatchList = req.body;

    const selectQueryString = `SELECT * FROM watchlist WHERE movie_id = $1`;
    const selectQueryParams = [newWatchList.movie_id];
    db.query(selectQueryString, selectQueryParams)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(403).send("Movie already exist in watchlist");
        }
      })
      .catch((error) => console.log(error));

    const queryString = `INSERT INTO watchlist (user_id, movie_id, poster_path, title, vote_average, release_date) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING * ;`;
    const queryParams = [
      newWatchList.user_id,
      newWatchList.movie_id,
      newWatchList.poster_path,
      newWatchList.title,
      newWatchList.vote_average,
      newWatchList.release_date,
    ];
    db.query(queryString, queryParams)
      .then((result) => {
        console.log(result);
        console.log("New movie successfully added to Watchlist");
        res.json(result.rows[0]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  // Delete a movie from the Watchlist
  router.delete("/watchlist/:id/delete", (req, res) => {
    const movieId = req.params.id;
    db.query(`DELETE FROM watchlist WHERE movie_id = ${movieId}::varchar`)
      .then((result) => {
        console.log("Movie successfully deleted from Watchlist");
        res.json(result.rows[0]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  });

  return router;
};

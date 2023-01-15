DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS watchlist CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(225) NOT NULL,
  last_name VARCHAR(225) NOT NULL,
  email VARCHAR(225) NOT NULL,
  password VARCHAR(225) NOT NULL,
  profile_photo_url TEXT
);

CREATE TABLE friends (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  friend_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favourites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id VARCHAR(225) NOT NULL ,
  poster_path TEXT,
  title VARCHAR(225) NOT NULL,
  vote_average VARCHAR(225) NOT NULL,
  release_date DATE NOT NULL
);

CREATE TABLE watchlist (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id VARCHAR(225) NOT NULL,
  poster_path TEXT,
  title VARCHAR(225) NOT NULL,
  vote_average VARCHAR(225) NOT NULL,
  release_date DATE NOT NULL
);
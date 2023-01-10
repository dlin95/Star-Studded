INSERT INTO users
(first_name, last_name, email, password, profile_photo_url)
VALUES
('Michael', 'Scott', 'mscott@dundermifflin.com', '123', '/users/michael.jpg'),
('Dwight', 'Schrute', 'dschrute@dundermifflin.com', '123', '/users/dwight.jpg'),
('Jim', 'Halpert', 'jhalpert@dundermifflin.com', '123', '/users/jim.jpg'),
('Pam', 'Beesley', 'pbeesley@dundermifflin.com', '123', '/users/pam.jpg'),
('Erin', 'Hannon', 'ehannon@dundermifflin.com', '123', '/users/erin.jpg'),
('Andy', 'Bernard', 'abernard@dundermifflin.com', '123', '/users/andy.jpg'),
('Kevin', 'Malone', 'kmalone@dundermifflin.com', '123', '/users/kevin.jpg'),
('Oscar', 'Martinez', 'omartinez@dundermifflin.com', '123', '/users/oscar.jpg');

INSERT INTO
friends(user_id, friend_user_id) VALUES (1, 2);
friends(user_id, friend_user_id) VALUES (1, 3);
friends(user_id, friend_user_id) VALUES (1, 7);
friends(user_id, friend_user_id) VALUES (3, 4);
friends(user_id, friend_user_id) VALUES (7, 8);

INSERT INTO favourite_movies(user_id, movie_id) VALUES(1, 'tt3896198');

INSERT INTO watchlist(user_id, movie_id) VALUES(1, 'tt3896168');
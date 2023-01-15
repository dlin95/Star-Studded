INSERT INTO users
(first_name, last_name, email, password, profile_photo_url)
VALUES
('Michael', 'Scott', 'test@user.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/michael.jpg'),
('Dwight', 'Schrute', 'dschrute@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/dwight.jpg'),
('Jim', 'Halpert', 'jhalpert@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/jim.jpg'),
('Pam', 'Beesley', 'pbeesley@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/pam.jpg'),
('Erin', 'Hannon', 'ehannon@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/erin.jpg'),
('Andy', 'Bernard', 'abernard@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/andy.jpg'),
('Kevin', 'Malone', 'kmalone@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/kevin.jpg'),
('Oscar', 'Martinez', 'omartinez@dundermifflin.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '/users/oscar.jpg');

INSERT INTO
friends(user_id, friend_user_id)
VALUES
(1, 2),
(1, 3),
(1, 7),
(3, 4),
(7, 8);

INSERT INTO favourites(user_id, movie_id, poster_path, title, vote_average, release_date) VALUES(1, '661374', 
'/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',  
'Glass Onion: A Knives Out Mystery',
'7.1',  
'2022-11-23'
);

INSERT INTO watchlist(user_id, movie_id, poster_path, title, vote_average, release_date) VALUES(1, '661374', 
'/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',  
'Glass Onion: A Knives Out Mystery',
'7.1',  
'2022-11-23'
);
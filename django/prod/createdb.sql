DROP TABLE IF EXISTS user_in_games;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE SEQUENCE game_sequence;
CREATE SEQUENCE user_sequence;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first VARCHAR(64),
  last VARCHAR(64),
  fb_access_token VARCHAR(256),
  profile_pic_url VARCHAR(512) CHECK (profile_pic_url ~ '^https?:\/\/[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)?'),
  -- TODO URL regex is shite
  asap_access_token uuid,
  -- expiry date for access token?
  creation_timestamp TIMESTAMP NOT NULL DEFAULT current_timestamp
--   device_id VARCHAR(128)

);

CREATE TABLE games (
  id INT PRIMARY KEY,
  host_id INT REFERENCES users(id) NOT NULL ,
  title VARCHAR(255) NOT NULL CHECK (char_length(title) > 0),
  description VARCHAR(512),
  max_players SMALLINT CHECK (max_players >= 2 AND max_players <= 16),
  sport VARCHAR(16) CHECK (sport IN ('basketball', 'volleyball', 'soccer', 'baseball', 'badminton', 'football',
                                        'table_tennis', 'tennis', 'bouldering', 'skateboarding', 'boxing',
                                        'wrestling', 'swimming', 'ultimate_frisbee')),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  location_lat FLOAT(32),
  location_lng FLOAT(32),
  location_name VARCHAR(128) NOT NULL CHECK (char_length(location_name) > 0),
  creation_timestamp TIMESTAMP NOT NULL DEFAULT current_timestamp,

  CONSTRAINT startend_time_chk CHECK (end_time >= start_time)
);

CREATE TABLE user_in_games (
  user_id INT REFERENCES users(id) NOT NULL,
  game_id INT REFERENCES games(id) NOT NULL,
  status VARCHAR(64) NOT NULL CHECK (status IN ('invited', 'accepted', 'declined')),
  creation_timestamp TIMESTAMP NOT NULL DEFAULT current_timestamp,

  PRIMARY KEY (user_id, game_id)
);


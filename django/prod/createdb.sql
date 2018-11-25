DROP TABLE IF EXISTS user_in_games;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE SEQUENCE game_sequence;
CREATE SEQUENCE user_sequence;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fb_id BIGINT UNIQUE,
  first VARCHAR(64),
  last VARCHAR(64),
  age SMALLINT CHECK (age is null or age >= 0),
  gender VARCHAR(32) CHECK (gender is null or gender IN ('male', 'female', 'whatever the fuck u want')),
  show_age BOOLEAN NOT NULL DEFAULT FALSE,
  show_bio BOOLEAN NOT NULL DEFAULT FALSE,
  show_gender BOOLEAN NOT NULL DEFAULT FALSE,
  bio TEXT,
  fb_access_token VARCHAR(256),
  profile_pic_url VARCHAR(512) CHECK (profile_pic_url ~ '^https?:\/\/[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)?'),
  -- TODO URL regex is shite
  asap_access_token uuid,
  -- expiry date for access token?
  creation_timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT current_timestamp
  --   device_id VARCHAR(128)
);

CREATE TABLE games (
  id INT PRIMARY KEY,
  host_id INT REFERENCES users(id) NOT NULL,
  title VARCHAR(255) NOT NULL CHECK (char_length(title) > 0),
  description VARCHAR(512),
  max_players SMALLINT CHECK (max_players >= 2 AND max_players <= 100),
  sport VARCHAR(16) CHECK (sport IN ('basketball', 'volleyball', 'soccer', 'baseball', 'badminton', 'football',
                                        'table_tennis', 'tennis', 'bouldering', 'skateboarding', 'boxing',
                                        'wrestling', 'swimming', 'ultimate_frisbee')),
  start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  end_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  location_lat FLOAT(32),
  location_lng FLOAT(32),
  location_name VARCHAR(128) NOT NULL CHECK (char_length(location_name) > 0),
  comp_level INT NOT NULL CHECK (comp_level >= 1 and comp_level <= 3),
  creation_timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT current_timestamp,

  CONSTRAINT startend_time_chk CHECK (end_time >= start_time)
);

CREATE TABLE user_in_games (
  user_id INT REFERENCES users(id) NOT NULL,
  game_id INT REFERENCES games(id) NOT NULL,
  status VARCHAR(64) NOT NULL CHECK (status IN ('invited', 'accepted', 'declined')),
  creation_timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT current_timestamp,

  PRIMARY KEY (user_id, game_id)
);

-- Returns the meters distance between two points
CREATE OR REPLACE FUNCTION distance(lat1 FLOAT, lng1 FLOAT, lat2 FLOAT, lng2 FLOAT) RETURNS FLOAT AS $$
DECLARE
-- Convert degrees to radians
DegToRad FLOAT := 57.29577951;
EarthRadius FLOAT := 6387700; -- In meters

BEGIN
  RETURN EarthRadius * ACOS((sin(lat1 / DegToRad) * SIN(lat2 / DegToRad) +
        (COS(lat1 / DegToRad) * COS(lat2 / DegToRad) *
         COS(lng2 / DegToRad - lng1/ DegToRad))));
END
$$ LANGUAGE plpgsql;
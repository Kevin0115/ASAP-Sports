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

ALTER TABLE games
  DROP CONSTRAINT games_max_players_check,
  ADD CONSTRAINT  games_max_players_check CHECK (max_players >= 2 AND max_players <= 100);
DELETE FROM user_in_games WHERE game_id > 0;
DELETE FROM games WHERE id > 0;
DELETE FROM users WHERE asap_access_token = '00000000-0000-0000-0000-000000000000';
INSERT into users (fb_id, first, last, fb_access_token, profile_pic_url, asap_access_token)
values(1, 'test', 'user', 'fake', 'http://dummy.com', '00000000-0000-0000-0000-000000000000');
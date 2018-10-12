import React from 'react';
import { createStackNavigator } from 'react-navigation';

// Add screens here as needed
import Homescreen from '../screens/Homescreen';
import Gametype from '../screens/Gametype';
import BrowseGames from '../screens/BrowseGames';
import GameInfo from '../screens/GameInfo';
import TimeDate from '../screens/TimeDate';
import Location from '../screens/Location';
import ReviewDetails from '../screens/ReviewDetails';
import ConfirmMessage from '../screens/ConfirmMessage';

export default createStackNavigator(
	{
		Homescreen: Homescreen,
		Gametype: Gametype,
		BrowseGames: BrowseGames,
		GameInfo: GameInfo,
		TimeDate: TimeDate,
		Location: Location,
		ReviewDetails: ReviewDetails,
		ConfirmMessage: ConfirmMessage
	},
	{
		initialRouteName: 'Homescreen', // This will be changed later to Login depending on conditions
	}
);
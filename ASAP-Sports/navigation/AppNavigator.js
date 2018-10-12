import React from 'react';
import {CreationSportSelect} from "../screens/BrowseGames";
import {createStackNavigator} from 'react-navigation';
import {HomeScreen} from "../screens/Homescreen";
import {CreateGameInfo} from "../screens/CreateGameInfo";

export const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Sport: CreationSportSelect,
        CreateGameInfo:  CreateGameInfo,
    },
    {
        initialRouteName: 'Home',
    }
);

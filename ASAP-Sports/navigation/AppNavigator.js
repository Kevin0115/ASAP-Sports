import React from 'react';
import { StyleSheet } from 'react-native';
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
    // IMPORTANT: move navigationOptions into here. Clutters the screens
    Homescreen: {
      screen: Homescreen,
      navigationOptions: ({navigation}) => ({
        title: 'ASAP Sports',
        ...headerStyle,
      }),
    },
    Gametype: {
      screen: Gametype,
      navigationOptions: ({navigation}) => ({
        title: 'Select a Sport',
        ...headerStyle,
      }),
    },
    BrowseGames: {
      screen: BrowseGames,
      navigationOptions: ({navigation}) => ({
        title: 'Search Results',
        ...headerStyle,
      }),
    },
    GameInfo: {
      screen: GameInfo,
      navigationOptions: ({navigation}) => ({
        title: 'Enter Game Details',
        ...headerStyle,
      }),
    },
    TimeDate: {
      screen: TimeDate,
      navigationOptions: ({navigation}) => ({
        title: 'Select a Time',
        ...headerStyle,
      }),
    },
    Location: {
      screen: Location,
      navigationOptions: ({navigation}) => ({
        title: 'Enter a Location',
        ...headerStyle,
      }),
    },
    ReviewDetails: {
      screen: ReviewDetails,
      navigationOptions: ({navigation}) => ({
        title: 'Review Details',
        ...headerStyle,
      }),
    },
    ConfirmMessage: {
      screen: ConfirmMessage,
      navigationOptions: ({navigation}) => ({
        ...headerStyle,
      }),
    },
  },
  {
    initialRouteName: 'Homescreen', // This will be changed later to Login depending on conditions
    headerMode: 'float',
    headerBackTitle: 'false',
  }
);

// Changes here reflect in ALL headers
const headerStyle = {
  headerStyle: {
    height: 50,
    backgroundColor: '#6699ff',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitle: null,
}
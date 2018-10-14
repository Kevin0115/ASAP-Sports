import React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';

// Add screens here as needed
import Homescreen from '../screens/Homescreen';
import Gametype from '../screens/Gametype';
import BrowseGames from '../screens/BrowseGames';
import GameInfo from '../screens/GameInfo';
import TimeDate from '../screens/TimeDate';
import Location from '../screens/Location';
import ReviewDetails from '../screens/ReviewDetails';
import ConfirmMessage from '../screens/ConfirmMessage';
import FilterModal from '../screens/FilterModal'

const BrowseStack = StackNavigator(
  {
    BrowseGames: {
      screen: BrowseGames,
      navigationOptions: ({navigation}) => ({
        title: 'Search Results',
        ...headerStyle,
        headerLeft: (
          // Replace this with a "home" icon
          <Button
            onPress={() => navigation.popToTop()}
            title="Home"
            color="#fff"
          />
        ),
        headerRight: (
          // Replace this with a "filter" icon
          <Button
            onPress={() => navigation.navigate('FilterModal')}
            title="Filter"
            color="#fff"
          />
        ),
      }),
    },
    FilterModal: {
      screen: FilterModal,
      navigationOptions: ({navigation}) => ({
        title: 'Filter Options',
        ...headerStyle,
      }),
    }
  },
  {
    initialRouteName: 'BrowseGames',
    mode: 'modal',
  }
);

export default StackNavigator(
  {
    // IMPORTANT: move navigationOptions into here. Clutters the screens
    Homescreen: {
      screen: Homescreen,
      navigationOptions: ({navigation}) => ({
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
    Browse: {
      screen: BrowseStack,
      navigationOptions: ({navigation}) => ({
        header: null,
        gesturesEnabled: false,
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
    headerMode: 'screen',
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
  gesturesEnabled: false,
}
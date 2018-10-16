import React from 'react';
import { StyleSheet, Button, Alert, TouchableOpacity, Image } from 'react-native';
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
import FilterModal from '../screens/FilterModal';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import CancelButton from '../assets/components/CancelButton';
import FilterButton from '../assets/components/FilterButton';
import SettingsButton from '../assets/components/SettingsButton';
import ProfileButton from '../assets/components/ProfileButton';

class LogoIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 55, height: 55}}
      />
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Homescreen,
    },
    Settings: {
      screen: Settings,
    },
    Profile: {
      screen: Profile,
    }
  },
  {
    headerMode: 'none',
    mode: 'modal',
  }
);

const BrowseStack = createStackNavigator(
  {
    BrowseGames: {
      screen: BrowseGames,
    },
    FilterModal: {
      screen: FilterModal,
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'BrowseGames',
    mode: 'modal',
  }
);

export default createStackNavigator(
  {
    // IMPORTANT: move navigationOptions into here. Clutters the screens
    Homescreen: {
      screen: HomeStack,
      navigationOptions: ({navigation}) => ({
        headerTitle: <LogoIcon />,
        headerRight: <SettingsButton />,
        headerLeft: <ProfileButton />,
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
        title: 'Search Results',
        ...headerStyle,
        headerRight: <FilterButton />,
      }),
    },
    GameInfo: {
      screen: GameInfo,
      navigationOptions: ({navigation}) => ({
        title: 'Enter Game Details',
        ...headerStyle,
        ...creationHeaderStyle,
      }),
    },
    TimeDate: {
      screen: TimeDate,
      navigationOptions: ({navigation}) => ({
        title: 'Time and Location',
        ...headerStyle,
        ...creationHeaderStyle,
      }),
    },
    Location: {
      screen: Location,
      navigationOptions: ({navigation}) => ({
        title: 'Enter a Location',
        ...headerStyle,
        ...creationHeaderStyle,
      }),
    },
    ReviewDetails: {
      screen: ReviewDetails,
      navigationOptions: ({navigation}) => ({
        title: 'Review Details',
        ...headerStyle,
        ...creationHeaderStyle,
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
    height: 60,
    backgroundColor: '#6699ff',
  },
  headerTitleStyle: {
    color: '#fff',
  },
  headerBackTitle: null,
  gesturesEnabled: false,
}

const creationHeaderStyle = {
  headerRight: <CancelButton />
}
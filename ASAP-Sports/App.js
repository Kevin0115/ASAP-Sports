import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, AsyncStorage} from 'react-native';
import { AppLoading, Asset } from 'expo';
import AwesomeButton from 'react-native-really-awesome-button';
import  {SwitchNavigator} from './navigation/AppNavigator'
import Login from "./screens/Login";

// Disable Warnings
console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    else {
      return (
        <SwitchNavigator />
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo.png'),
        require('./assets/images/user.png'),
        require('./assets/images/settings.png'),
        require('./assets/images/logotext.png'),
        require('./assets/images/basketball.png'),
        require('./assets/images/volleyball.png'),
        require('./assets/images/soccer.png'),
        require('./assets/images/baseball.png'),
        require('./assets/images/badminton.png'),
        require('./assets/images/football.png'),
        require('./assets/images/tabletennis.png'),
        require('./assets/images/tennis.png'),
        require('./assets/images/bouldering.png'),
        require('./assets/images/skateboarding.png'),
        require('./assets/images/boxing.png'),
        require('./assets/images/wrestling.png'),
        require('./assets/images/swimming.png'),
        require('./assets/images/frisbee.png'),
        require('./assets/images/garbage.png'),
        require('./assets/images/checked.png'),
        require('./assets/images/error.png'),
      ]),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoaded: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
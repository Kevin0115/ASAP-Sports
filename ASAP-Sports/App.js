import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { AppLoading, Asset } from 'expo';

import AppNavigator from './navigation/AppNavigator'
import * as AsyncStorage from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

// Disable Warnings
console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoaded: false,
    isLoggedIn: false,
  };

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('169924577279041', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(token);
      // Alert.alert(
      //       //   `Logged in with!`,
      //       //   `Hi ${(await response.json()).name}!`,
      //       // );
      const tokenStr = token.toString();
      const loginBody = JSON.stringify({'fb_access_token': tokenStr});
      console.log(loginBody);
      fetch('http://asapsports.aidanrosswood.ca/authentication/login', {
        method: 'POST',
        body: loginBody,
      }).then(AsyncStorage.setItem('loggedInStatus', true)) //only set true if key was returned
        .then(() => this.setState({ isloggedIn: true }))
        .then(res => res.json())
        .then(response => console.log('Success: ', JSON.stringify(response)))
        .catch(error => console.log('Error: ', error));
    };
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (!this.state.isLoggedIn) {
        return (
          <View>
          <View style={styles.upcomingGamesContainer}>
            <ScrollView>
              <Image
                source={require('../assets/images/logotext.png')}
                style={styles.logoPlaceholder}
              />
            </ScrollView>
          </View>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.logIn()}
              >
             Login with Facebook
             </AwesomeButton>
          </View>
        )
    }
    else {
      return (
        <AppNavigator />
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
      ]),
      AsyncStorage.getItem('loggedInStatus',
        (value) => {
          this.setState({ isloggedIn: value });
        })
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
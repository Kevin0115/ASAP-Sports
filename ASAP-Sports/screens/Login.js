import React from "react";
import {AsyncStorage, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import createStackNavigator from "react-navigation";
import {SignedInStack} from "../navigation/AppNavigator";

export default class Login extends React.Component {

  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('169924577279041', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const tokenStr = token.toString();
      const loginBody = JSON.stringify({'fb_access_token': tokenStr});
      try {
        var reponse =  await fetch('http://asapsports.aidanrosswood.ca/authentication/login', {
          method: 'POST',
          body: loginBody,
        });
      } catch (err) {
        console.log('Error: ', err);
      }
      reponse = response.json();
      try {
        await AsyncStorage.setItem('userAuth', JSON.stringify(reponse));
      } catch (err) {
        console.log(err);
      }
      //make this conditional to success
      this.props.navigation.navigate('App');
    }
  }

render () {
  return (
    <View style={styles.homescreen}>
      <View style={styles.textContainer}>
        <Text style={styles.upcomingText}>
          Welcome to ASAP Sports
        </Text>
      </View>
      <View style={styles.upcomingGamesContainer}>
          <Image
            source={require('../assets/images/logotext.png')}
            style={styles.logoPlaceholder}
          />
      </View>
      <View style={styles.buttonContainer}>
        <AwesomeButton
          width={320}
          height={60}
          backgroundColor="#004e89"
          backgroundDarker="#001a33"
          onPress={() => this.logIn()}>
          Login with Facebook
        </AwesomeButton>
      </View>
    </View>
  )
}
}

const styles = StyleSheet.create({
  homescreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  textContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8c8c8c',
    fontFamily: 'Helvetica',
  },
  upcomingGamesContainer: {
    flex: 5.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: 200,
    height: 150,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
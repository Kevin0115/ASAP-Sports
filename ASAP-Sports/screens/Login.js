import React from "react";
import {AsyncStorage, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import createStackNavigator from "react-navigation";
import {SignedInStack} from "../navigation/AppNavigator";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async logIn() {
    const APP_ID = '169924577279041';
    const options = {
      permissions: ['public_profile'],
    }
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options);
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`
      );
      const fbGraphApiResponse = (await response.json());
      console.log(fbGraphApiResponse);
      await AsyncStorage.setItem('fbGraphApiResponse', JSON.stringify(fbGraphApiResponse));
      const tokenStr = token.toString();
      const loginBody = JSON.stringify({'fb_access_token': tokenStr});

      try {
        let ASAPresponse =  await fetch('http://asapsports.aidanrosswood.ca/authentication/login', {
          method: 'POST',
          body: loginBody,
        });
        const ASAPreponseJSON = ASAPresponse.json();
        await AsyncStorage.setItem('userAuth', JSON.stringify(ASAPreponseJSON));
      } catch (err) {
        console.log('Error: ', err);
      }
      //make this conditional to success
      this.props.navigation.navigate('App');
    }
  }

render () {
  return (
    <View style={styles.homescreen}>
      <View style={{flex: 1}} />
      <View style={styles.logoContainer}>
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
  logoContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    opacity: 0.2,
    width: 300,
    height: 225,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
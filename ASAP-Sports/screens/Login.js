import React from "react";
import {AsyncStorage, ScrollView, Text, View} from "react-native";
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
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(token);
      const tokenStr = token.toString();
      const loginBody = JSON.stringify({'fb_access_token': tokenStr});
      console.log(loginBody);
      try {
        var reponse =  await fetch('http://asapsports.aidanrosswood.ca/authentication/login', {
          method: 'POST',
          body: loginBody,
        });
      } catch (err) {
        console.log('Error: ', err);
      }
      reponse = response.json();
      console.log('Success: ', JSON.stringify(response));
      try {
        await AsyncStorage.setItem('userAuth', JSON.stringify(reponse));
        // const crazy = await AsyncStorage.getItem(('userAuth'));
        // console.log(`this shit is crazy ${crazy}`);
      } catch (err) {
        console.log(err);
      }
      this.props.navigation.navigate('App');
    }
  }

render () {



  return (
  <View>
    <AwesomeButton
      width={320}
      height={60}
      backgroundColor="#004e89"
      backgroundDarker="#001a33"
      onPress={() => this.logIn()}>
      Login with Facebook
    </AwesomeButton>
  </View>
  )
}
}
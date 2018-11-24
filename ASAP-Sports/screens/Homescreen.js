import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://133f1d3a.ngrok.io/users/push-token';

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (true) {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  //if (finalStatus !== 'granted') {
   // return;
  //}

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  console.log("here2");
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}

export default class Homescreen extends React.Component {
  componentWillMount(){
    console.log("here");
    registerForPushNotificationsAsync();
  }
  render() {
    return (
      // upcoming games text will be dynamic later on
      <View style={styles.homescreen}>
        <View style={styles.textContainer}>
          <Text style={styles.upcomingText}>
            Upcoming Games
          </Text>
        </View>
        <View style={styles.upcomingGamesContainer}>
          <ScrollView>
            <Image
              source={require('../assets/images/logotext.png')}
             style={styles.logoPlaceholder}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.props.navigation.navigate('Gametype')}
          >
            Find a Game
          </AwesomeButton>
        </View>
      </View>
    );
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
  },
  upcomingGamesContainer: {
    flex: 5.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    opacity: 0.1,
    width: 200,
    height: 150,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

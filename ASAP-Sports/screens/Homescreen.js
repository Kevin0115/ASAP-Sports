import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

// class LogoIcon extends React.Component {
//   render() {
//     return (
//       <Image
//         source={require('../assets/images/logo.png')}
//         style={styles.logo}
//       />
//     );
//   }
// }

// class HeaderPicture extends React.Component {
//   render() {
//     return (
//       <Image
//         source={require('../assets/images/circlepic.png')}
//         style={styles.picture}
//       />
//     );
//   }
// }

// class SettingsIcon extends React.Component {
//   render() {
//     return (
//       <Image
//       source={require('../assets/images/settings.png')}
//       style={styles.picture}
//     />
//     );
//   }
// }

export default class Homescreen extends React.Component {
  static navigationOptions = {
    // headerLeft: <HeaderPicture />,
    // headerRight: <SettingsIcon />,
    // headerTitle: <LogoIcon />,
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
          headers: {
            'Authentication': 'b68c07da-e0c5-40ea-be83-75e9234e88f8',
          },
          body: loginBody,
        }).then(res => res.json())
          .then(response => console.log('Success: ', JSON.stringify(response)))
          .catch(error => console.log('Error: ', error));
      };
    }


  render() {
    return (
      // upcoming games text will be dynamic later on
      <View style={styles.homescreen}>
        <View style={styles.textContainer}>
          <Text style={styles.upcomingText}>
            Upcoming Games updated 3
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
        <AwesomeButton
          width={320}
          height={60}
          backgroundColor="#004e89"
          backgroundDarker="#001a33"
          onPress={() => this.logIn()}
        >
          Login
        </AwesomeButton>
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
    fontFamily: 'Helvetica',
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
  picture: {
    height: 40,
    width: 40,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // logo: {
  //   width: 55,
  //   height: 55,
  //   justifyContent: 'flex-start',
  // }
});

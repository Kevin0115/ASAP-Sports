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

import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

class LogoIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../images/logo.png')}
        style={styles.logo}
      />
    );
  }
}

class HeaderPicture extends React.Component {
  render() {
    return (
      <Image
        source={require('../images/circlepic.png')}
        style={styles.picture}
      />
    );
  }
}

class SettingsIcon extends React.Component {
  render() {
    return (
      <Image
      source={require('../images/settings.png')}
      style={styles.picture}
    />
    );
  }
}

export default class Homescreen extends React.Component {
  static navigationOptions = {
    headerLeft: <HeaderPicture />,
    headerRight: <SettingsIcon />,
    headerTitle: <LogoIcon />,
  };

  render() {
    return (
      <View style={styles.homescreen}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerText}>
            No Upcoming Games
          </Text>
        </View>
        <View style={{flex: 5}}/>
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
  homeHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8c8c8c',
    fontFamily: 'Helvetica',
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
  logo: {
    width: 220,
    height: 44,
  }
});

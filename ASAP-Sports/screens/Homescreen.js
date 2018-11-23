import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Homescreen extends React.Component {
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
            width={320/2}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.props.navigation.navigate('Browse')}
          >
            Find a Game
          </AwesomeButton>
          <AwesomeButton
            width={320/2}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.props.navigation.navigate('Gametype')}
          >
            Host a Game
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

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class BrowseGames extends React.Component {
  //TODO 
  render() {
    const sport = this.props.navigation.getParam('sport', 'default');
    const game = {id: 10001,
      host_id: 18,
      title: "5v5 Basktetball",
      description: "casual basketball game at kits beach",
      max_players: 4,
      sport: "basketball",
      start_time: "Friday, November 23, 2018 10:36 PM",
      end_time: "Saturday, November 24, 2018 12:21 AM",
      location_lat: 40.730610,
      location_lng: -73.935242,
      location_name: "The court",
      comp_level: 2,
      creation_timestamp: "Friday, November 23, 2018 02:21 PM"};
    return (
      <View style={styles.browse}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerText}>
            No Results Found for {sport}...
          </Text>
          <Text style={styles.headerText}>
            {'\n'}Try Creating Your Own!
          </Text>
        </View>
        <View style={{flex: 5}}/>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => {
              this.props.navigation.navigate('ViewGame', {
                game: game
              });
            }}
          >
            View Game
          </AwesomeButton>
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => {
              this.props.navigation.navigate('GameInfo', {
                sport: sport
              });
            }}
          >
            Create a Game
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  browse: {
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
    fontSize: 16,
    alignItems: 'center',
    color: '#8c8c8c',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

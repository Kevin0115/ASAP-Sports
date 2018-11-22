import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import GameCard from '../assets/components/GameCard';

// FOR TESTING ONLY
const sampleGames = [
  {  
   "id":3,
   "host_id":32,
   "title":"3v3 Basketball",
   "description":"3v3 pickup basketball game\n",
   "max_players":6,
   "sport":"basketball", // IMPORTANT this is lowercase in the DB
   "start_time":"Tuesday, October 23, 2018 04:30 PM",
   "end_time":"Tuesday, October 23, 2018 05:30 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"UBC SRC Gym 2",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:26 PM"
  },
  {  
   "id":4,
   "host_id":32,
   "title":"1v1 Tennis",
   "description":"tennis \n",
   "max_players":2,
   "sport":"tennis",
   "start_time":"Thursday, August 23, 2018 12:25 PM",
   "end_time":"Thursday, August 23, 2018 12:55 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"Tennis Court",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:36 PM"
  },
  {  
   "id":5,
   "host_id":32,
   "title":"5x5 Soccer",
   "description":"tennis \n",
   "max_players":2,
   "sport":"soccer",
   "start_time":"Thursday, August 23, 2018 02:25 PM",
   "end_time":"Thursday, August 23, 2018 02:55 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"Soccer Field",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:36 PM"
  },
  {  
   "id":6,
   "host_id":32,
   "title":"4v4 Volleyball",
   "description":"tennis \n",
   "max_players":2,
   "sport":"volleyball",
   "start_time":"Thursday, August 23, 2018 02:25 PM",
   "end_time":"Thursday, August 23, 2018 02:55 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"Volleyball Court",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:36 PM"
  }
];

export default class BrowseGames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: sampleGames, // ONLY FOR TESTING
    };
  }

  _determineDisplayView = (sport) => {
    if (this.state.gameList.length == undefined || this.state.gameList.length == 0) {
      return (
        <View style={{flex: 6}}> 
          <View style={styles.homeHeader}>
            <Text style={styles.headerText}>
              No Results Found for {sport}...
            </Text>
            <Text style={styles.headerText}>
              {'\n'}Try Creating Your Own!
            </Text>
          </View>
          <View style={{flex: 5}}/>
        </View>
      );
    } else {
      return (
        <View style={{flex: 6}}>
          <FlatList
            data={this.state.gameList}
            numColumns={1}
            renderItem={({item}) =>
              <GameCard
                key={item.id}
                gameInfo={item}
              />
            }
          />
          </View>
      );
    }
  }

  render() {
    const sport = this.props.navigation.getParam('sport', 'default');
    return (
      <View style={styles.browse}>
        {this._determineDisplayView(sport)}
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
  listButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    marginLeft: 6,
    marginRight: 6,
  },
  logo: {
    width: 70,
    height: 70,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

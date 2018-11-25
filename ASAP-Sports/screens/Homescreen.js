import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, AsyncStorage, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { APP_BASE_URL, COLORS, ASAPStyles } from '../const';
import GameCard from '../assets/components/GameCard';

// NOTIDEAL: Mixing different types in the list is ugly AF.

export default class Homescreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listData: []
    };
    this.props.navigation.addListener('didFocus', payload => {
      // NOTIDEAL: This gets called a lot. We only want to call it after we have joined/left a game
      this.getDashboard();
    });
  }

  async getDashboard(self) {
    self = self ? self : this;
    const authUser = JSON.parse(await AsyncStorage.getItem('authUser'));
    self.setState({loading: true});
    fetch(APP_BASE_URL + '/games/upcoming_games', {
      method: 'GET',
      headers: {
        'Authorization': authUser.asap_access_token,
      },
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
        self.setState({loading: false});
        // TODO handle error with modal
      } else {

        for (var gamesList of [response.games_upcoming, response.games_in_progress, response.past_games]) {
          for (var g of gamesList) {
            // Add string key so the FlatList doesn't complain
            g.key = g.id.toString();

            // Give it a type because we are mixing types in the list
            g.type = 'gamecard';
          }
        }
        let listData = [];
        if (response.games_in_progress.length){
          listData.push({key: 'In Progress', type: 'text'});
          listData.push(response.games_in_progress[0]);
        }
        if (response.games_upcoming.length){
          listData.push({key: 'Upcoming Games', type: 'text'});
          for (var g of response.games_upcoming) {
            listData.push(g);
          }
        }
        listData.push({key: 'space', type: 'space'});
        self.setState({
          loading: false,
          listData: listData,
        });
      }
    })
    .catch((error) => {
      // TODO extract modal from screens/Login.js and open on error
      console.warn('Error: ', error);
      self.setState({loading: false})
    });
  };
  render() {
    return (
      // upcoming games text will be dynamic later on
      <View style={styles.homescreen}>

        {this.state.listData.length > 1 && 
        <View>
          <FlatList
            data={this.state.listData}
            numColumns={1}
            onRefresh={() => this.getDashboard(this)}
            refreshing={this.state.loading}
            renderItem={({item}) => {
              if (item.type === 'text') {
                return (
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.upcomingText}>{item.key}</Text>
                  </View>
                )
              }
              else if (item.type === 'gamecard'){
                return (
                  <GameCard
                    gameInfo={item}
                    onPress={() => {
                      console.log("TODO", item.id, item.sport, item.title);
                      // this.props.navigation.navigate('GameInfo', item);
                    }}
                  />)
              } else if (item.type === 'space') {
                return (<View style={{marginBottom: 80}}></View>)
              }
            }}
          />
        </View>
        }
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320/2}
            height={60}
            backgroundColor={COLORS.darkBlue}
            backgroundDarker={COLORS.darkerBlue}
            style={{marginRight: 5}}
            onPress={() => this.props.navigation.navigate('Browse')}
          >
            Find a Game
          </AwesomeButton>
          <AwesomeButton
            width={320/2}
            height={60}
            backgroundColor={COLORS.darkBlue}
            backgroundDarker={COLORS.darkerBlue}
            style={{marginLeft: 5}}
            onPress={() => this.props.navigation.navigate('Gametype')}
          >
            Host a Game
          </AwesomeButton>
        </View>

        {this.state.loading &&
          <View style={styles.centerScreenMessage}>
            <ActivityIndicator size="large" color={COLORS.darkBlue} />
          </View>
        }

        {this.state.listData.length <= 1 &&
        <Image
          source={require('../assets/images/logotext.png')}
          style={styles.logoPlaceholder}
        />
        }
      </View>
    );
  };
}




const styles = StyleSheet.create({
  centerScreenMessage: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  homescreen: {
    // flex: 1,
    backgroundColor: COLORS.white,
    height: '100%',
    // alignItems: 'stretch',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    paddingVertical: 10,
    ...ASAPStyles.shadowed,
  },
  upcomingText: {
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
    fontSize: 18,
    color: COLORS.darkGrey,
  },
  logoPlaceholder: {
    opacity: 0.1,
    width: 200,
    height: 150,
    position: 'absolute',
    left: Dimensions.get('window').width/2 - 100,
    top: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '100%',
  },
});

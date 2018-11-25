import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, AsyncStorage, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { APP_BASE_URL, COLORS } from '../const';
import GameCard from '../assets/components/GameCard';

export default class Homescreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      upcomingGames: [],
      pastGames: [],
      gamesInProgress: []
    }
  }

  componentWillMount() {
    this.searchGames();
  }

  async searchGames() {
    const userAuthToken = await AsyncStorage.getItem('userAuth');
    this.setState({loading: true});
    fetch(APP_BASE_URL + '/games/upcoming_games', {
      method: 'GET',
      headers: {
        'Authorization': userAuthToken,
      },
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
        this.setState({loading: false});
        // TODO handle error with modal
      } else {

        console.log(response);
        for (var gamesList of [response.games_upcoming, response.games_in_progress, response.past_games]) {
          for (var g of gamesList) {
            // Add string key so the FlatList doesn't complain
            g.key = g.id.toString();
          }
        }
        this.setState({
          upcomingGames: response.games_upcoming,
          pastGames: response.past_games,
          gamesInProgress: response.games_in_progress,
          loading: false,
          emptyState: response.games_upcoming.length === 0 
            && response.past_games.length === 0 
            && response.games_in_progress.length === 0,
        });
      }
    })
    .catch((error) => {
      // TODO extract modal from screens/Login.js and open on error
      console.warn('Error: ', error);
      this.setState({loading: false})
    });
  }
  render() {
    return (
      // upcoming games text will be dynamic later on
      <View style={styles.homescreen}>
        {this.state.gamesInProgress.length !== 0 &&
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.upcomingText}>
              Game In Progress
            </Text>
          </View>
          <View /* TODO fix this bad hack to get heiight */style={{width: '100%', height: 120}}> 
            <GameCard
              gameInfo={this.state.gamesInProgress[0]} //  TODO only getting first game. Maybe we should introduce an invariant so that a user can only have one game in progress at a time. Scheduling conflict problem on the DB level right here.
              onPress={() => {
                console.log("TODO", this.state.gamesInProgress[0].id, this.state.gamesInProgress[0].sport, this.state.gamesInProgress[0].title);
                // this.props.navigation.navigate('GameInfo', item);
              }}
            />
          </View>
        </View>
        }
        {this.state.upcomingGames.length !== 0 && 
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.upcomingText}>
              Upcoming Games
            </Text>
          </View>
          <View style={{width: '100%'}}>
              <FlatList
                data={this.state.upcomingGames}
                numColumns={1}
                renderItem={({item}) =>
                  <GameCard
                    gameInfo={item}
                    onPress={() => {
                      console.log("TODO", item.id, item.sport, item.title);
                      this.props.navigation.navigate('ViewGame', item);
                    }}
                  />
                }
              />
          </View>
        </View>
        }
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320/2}
            height={60}
            backgroundColor={COLORS.darkBlue}
            backgroundDarker="#001a33"
            style={{marginRight: 5}}
            onPress={() => this.props.navigation.navigate('Browse')}
          >
            Find a Game
          </AwesomeButton>
          <AwesomeButton
            width={320/2}
            height={60}
            backgroundColor={COLORS.darkBlue}
            backgroundDarker="#001a33"
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

        {this.state.emptyState &&
        <Image
          source={require('../assets/images/logotext.png')}
          style={styles.logoPlaceholder}
        />
        }
      </View>
    );
  }
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
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.grey,
  },
  upcomingGamesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    opacity: 0.1,
    width: 200,
    height: 150,
    position: 'absolute',
    left: Dimensions.get('window').width/2 - 100,
    top: Dimensions.get('window').height/2 - 150
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
});

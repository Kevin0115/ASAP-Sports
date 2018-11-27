import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, AsyncStorage, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { APP_BASE_URL, COLORS, ASAPStyles } from '../const';
import GameCard from '../assets/components/GameCard';
import { Permissions, Notifications } from 'expo';

// NOTIDEAL: Mixing different types in the list is ugly AF.

const PUSH_ENDPOINT = APP_BASE_URL + '/users/push-token';


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  const authUser = JSON.parse(await AsyncStorage.getItem('authUser'));
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log(token);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authUser.asap_access_token,
    },
    body: JSON.stringify({
      token: token
    }),
  });
}

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

  componentWillMount(){
    registerForPushNotificationsAsync();
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
          <FlatList
            data={this.state.listData}
            numColumns={1}
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
                      this.props.navigation.navigate('ViewGame', {game: item});
                    }}
                  />)
              } else if (item.type === 'space') {
                return (<View style={{marginBottom: 80}}></View>)
              }
            }}
          />
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

        {this.state.loading && this.state.listData.length <= 1 &&
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
    bottom: 20,
    width: '100%',
  },
});

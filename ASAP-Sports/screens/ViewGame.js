import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions, Platform, Button, FlatList} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import SportDict from '../assets/components/SportsDict';
import {MapView} from "expo";
import {parseAPIDate} from "../utils.js";
import PlayerCard from "../assets/components/PlayerCard";
import Modal from 'react-native-modal';
import {APP_BASE_URL, COLORS} from "../const";

const Marker = MapView.Marker;
const delta  = { //TODO throw into a const file
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const vancouver  = { //TODO throw into a const file
  latitude: 49.282730,
  longitude: -123.120735,
};

export default class ViewGame extends React.Component {
  constructor(props) {
    super(props);
    this.startTime = '';
    this.duration = 0;
  }

  state = {
    user: null,
    mapRegion:{
      latitude: vancouver.latitude,
      longitude: vancouver.longitude,
      latitudeDelta: delta.latitudeDelta,
      longitudeDelta: delta.longitudeDelta,
    },
    gameInfo : {
      id: null,
      host_id: null,
      title: "",
      description: "",
      max_players: null,
      sport: "",
      start_time: "",
      end_time: "",
      location_lat: vancouver.latitude,
      location_lng: vancouver.longitude,
      location_name: "",
      comp_level: null,
      creation_timestamp: "",
      players: [{
        id: null,
        fb_id: null,
        first: "",
        last: "",
        age: null,
        gender: '',
        bio: '',
        fb_access_token: '',
        profile_pic_url: "",
        creation_timestamp: '',
      }]
      },
    modalVisible: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const gameInfo = navigation.getParam('game', 'Default');
    this.startTime = gameInfo.start_time;
    let region = this.state.mapRegion;
    this.setState({
        gameInfo: navigation.getParam('game', 'Default'),
        mapRegion: {
        latitude:  navigation.getParam('game', 'Default').location_lat,
        longitude: navigation.getParam('game', 'Default').location_lng,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      }});
    this.duration = this._calc_duration(gameInfo.start_time, gameInfo.end_time);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _calc_duration = (start_time, end_time) => {
    const start = parseAPIDate(start_time);
    const end = parseAPIDate(end_time);
    let dur = end - start;
    dur = dur/(60*1000);
    return dur;
  };


  _convertMinToHour = (min) => {
    if (min < 60) {
      return min + ' minutes';
    } else if (min == 60) {
      return '1 hour';
    } else {
      return (min / 60) + ' hours';
    }
  };

  _convertCompLevelToString = (compLevel) => {
    switch (compLevel) {
      case 3:
        return 'Competitive';
      case 2:
        return 'Intermediate';
      case 1:
        return 'Casual';
      default:
        return 'Casual';
    }
  };

  _joinGame = () => {

    // fetch(APP_BASE_URL + '/games/join', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': userAuthToken,
    //   },
    //   body: ,
    // })
  };

  render() {
    const { gameInfo } = this.state;
    return (
      <View style={styles.review}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source = {SportDict[gameInfo.sport]}/>
            <View style={styles.titleContainer}>
              <Text style={styles.gameTitle}>{gameInfo.title}</Text>
            </View>
          </View>
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
          >
            {Platform.OS === 'android' ?
              <Marker key={1} coordinate={this.state.mapRegion} image={require('../assets/images/logoBlackSmall.png')}/>
              : null}

            {Platform.OS === 'ios' ?
              <Marker key={1} centerOffset={{x: 0, y: -25}} coordinate={this.state.mapRegion}>
                <Image source={require('../assets/images/logoBlackSmall.png')}
                       style={styles.markerIOSHack}/>
              </Marker>
              :null}
          </MapView>
          <ScrollView stickyHeaderIndices={[1]} style={styles.scroll}>
            <View style = {styles.scrollContainer}>
              <View style={styles.infoContainer}>
                <View style = {{flex:1}}>
                  <Image
                    style = {styles.icon}
                    source = {require('../assets/images/calendaricon.png')}/>
                </View>
                <Text style ={styles.info}>{this.startTime}</Text>
              </View>
              <View style={styles.infoContainer}>
                <View style = {{flex:1}}>
                  <Image
                    style = {styles.icon}
                    source = {require('../assets/images/durationicon.png')}/>
                </View>
                <Text style={styles.info}>{this._convertMinToHour(this.duration)} </Text>
              </View>
              <View style={styles.infoContainer}>
                <View style = {{flex:1}}>
                  <Image
                    style = {styles.icon}
                    source = {require('../assets/images/trophyicon.png')}/>
                </View>
                <Text style={styles.info}>{this._convertCompLevelToString(gameInfo.comp_level)}</Text>
              </View>
              <View style={styles.infoContainer}>
                <View style = {{flex:1}}>
                  <Image
                    style = {styles.icon}
                    source = {require('../assets/images/maxplayericon.png')}/>
                </View>
                <Text style={styles.clickableInfo}
                      onPress={() => {
                        this.setModalVisible(true);
                      }} >
                  {gameInfo.players.length}/{gameInfo.max_players} players joined
              </Text>
              </View>
              {gameInfo.desc != '' ?
                <View >
                  <Text style={styles.infoTitle}>Description:</Text>
                  <Text style={styles.gameDesc}>{gameInfo.description}</Text>
                </View>
                : null }

              <Modal
                isVisible={this.state.modalVisible}
                backdropOpacity={0.7}
                >
                  <View style={styles.modalContent}>
                    <View style = {styles.modalTitle}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Player List</Text>
                    </View>
                    <ScrollView>
                      <FlatList
                        data={gameInfo.players}
                        numColumns={1}
                        renderItem={({item}) =>
                          <PlayerCard
                            player={item}
                            onPress={(item) => {
                              // this.props.navigation.navigate('PlayerProfile', item);
                            }}
                          />
                        }
                      />
                    </ScrollView>
                    <View style = {styles.modalClose}>
                    <Button
                      title="Done"
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}/>

                    </View>
                </View>
              </Modal>

            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={this._joinGame}
          >
            Join Game
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    modalTitle: {
      paddingTop: 10,
      paddingBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  modalClose: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIOSHack: {
    height: 50,
    width: 50,
  },
  review: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    flexDirection:'row',
    padding: 10,
    paddingLeft: 45,
    paddingRight: 45,
  },
  map: {
    width: Dimensions.get('window').width - 18,
    height: 250 ,
    padding: 10,
    borderRadius:  10
  },
  scroll: {
    width: Dimensions.get('window').width - 18,
    paddingTop: 10
  },
  scrollContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    paddingTop: 15
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  infoTitle: {
    color: '#707070',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    color: '#707070',
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 4,
    textAlign: 'left',
    flex: 10,
  },
  clickableInfo: {
    color: '#007FFF',
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 4,
    textAlign: 'left',
    flex: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  titleContainer: {
    paddingTop: 10,
    paddingLeft: 10
  },
  desc: {
    textAlign: 'center',
    margin: 14,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    height: '60%',
    borderRadius: 8,
  },
  logo: {
    // overlayColor: COLORS.white,
    borderRadius: 32,
    backgroundColor: '#FFA500',
    height: 60,
    width: 60,
  },
  icon: {
    alignSelf: 'center',
    height: 30,
    width: 30,
  },
  gameTitle: {
    color: '#707070',
    fontSize: 30,
    fontWeight: 'bold',
    flexWrap:'wrap',
    textAlign: 'center'
  },
  gameDesc: {
    color: '#707070',
    fontSize: 18,
    padding: 7,
    textAlign: 'left',
  }
});
import React from 'react';
import { StyleSheet, Text, View, Button, Image , ScrollView, Dimensions} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';
import SportDict from '../assets/components/SportsDict';
import ConfirmationModal from '../assets/components/ConfirmationModal';
import {MapView} from "expo";
const Marker = MapView.Marker;

export default class ReviewDetails extends React.Component {
  state = {
    modalTitleText: '',
    modalBodyText: '',
    isModalVisible: false,
    creationInfo: {},
    modalImage: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const startTime =
    navigation.getParam('date', 'Default') +
    ' ' +
    navigation.getParam('time', 'Default');
    this.setState({creationInfo: {
      sport: navigation.getParam('sport', 'Default'),
      title: navigation.getParam('title', 'Default'),
      desc: navigation.getParam('desc', 'Default'),
      comp_level: navigation.getParam('compLevel', 'Default'),
      start_time: startTime,
      duration: navigation.getParam('duration', 'Default'),
      mapRegion: navigation.getParam('location'),
      max_players: navigation.getParam('maxPlayers', 'Default'),
      location_name: navigation.getParam('location', 'Default'),
      }
    });
    console.log(navigation.getParam('sport', 'Default'));
    console.log(this.state.creationInfo.sport);
    console.log(SportDict[navigation.getParam('sport', 'Default')]);
  }

  _hideModal = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.popToTop();
  };

  _handleSubmit = () => {
    const creationInfo = JSON.stringify(this.state.creationInfo);
    fetch('http://asapsports.aidanrosswood.ca/games/host', {
      method: 'POST',
      headers: {
        'Authorization': '0daa420c-c03e-4d5b-83ee-235981206ff4',
      },
      body: creationInfo,
    }).then((res) => res.json())
    .then((response) => {
      this.setState({
        modalTitleText: 'Success!',
        modalBodyText: 'Enable notifications to be alerted when others join your game!\n\nYou\'ll be notified closer to the day of your game.',
        modalImage: require('../assets/images/checked.png'),
        isModalVisible: true,
      });
      console.log('Success: ', JSON.stringify(response));
    })      
    .catch((error) => {
      this.setState({
        modalTitleText: 'There was a Problem',
        modalBodyText: 'We could not create your game, please try again!',
        modalImage: require('../assets/images/error.png'),
        isModalVisible: true,
      });
      console.log('Error: ', error);
    });
    this._handleSubmitComplete;
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
    if (compLevel == 1) {
      return 'Casual';
    } else if (compLevel ==2) {
      return 'Intermediate';
    } else {
      return 'Competitive';
    }
  };

  render() {
    const { creationInfo } = this.state;
    return (

      <View style={styles.review}>
        <View style={styles.container}>
          <View style={{flexDirection:'row', padding: 10, paddingLeft: 45, paddingRight: 45}}>
            <Image
              style={styles.logo}
              source = {SportDict[this.state.creationInfo.sport]}/>
            <View style={{paddingTop: 10, paddingLeft: 10}}>
            <Text style={styles.gameTitle}>{creationInfo.title}</Text>
            </View>
          </View>

          <MapView
            style={{width: Dimensions.get('window').width - 18, height: 250 , padding: 10, borderRadius:  10}}
            region={creationInfo.mapRegion}
          >
            <Marker key={1} coordinate={creationInfo.mapRegion} image={require('../assets/images/logoBlackSmall.png')}/>

          </MapView>
          <ScrollView stickyHeaderIndices={[1]} style={{ width: Dimensions.get('window').width - 18, paddingTop: 10}}>
            <View style = {{paddingLeft: 10, paddingRight: 10, paddingBottom: 15, paddingTop: 15}}>
          <View style={styles.infoContainer}>
            <View style = {{flex:1}}>
            <Image
              style = {styles.icon}
              source = {require('../assets/images/calendaricon.png')}/>
            </View>
             <Text style ={styles.info}>{creationInfo.start_time}</Text>
             {/*<Text style={{flex:1}}>asdadaskdskad</Text>*/}
          </View>
          <View style={styles.infoContainer}>
            <View style = {{flex:1}}>
            <Image
              style = {styles.icon}
              source = {require('../assets/images/durationicon.png')}/>
            </View>
            <Text style={styles.info}>{this._convertMinToHour(creationInfo.duration)} </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style = {{flex:1}}>
            <Image
              style = {styles.icon}
              source = {require('../assets/images/trophyicon.png')}/>
            </View>
            <Text style={styles.info}>{this._convertCompLevelToString(creationInfo.comp_level)}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style = {{flex:1}}>
            <Image
              style = {styles.icon}
              source = {require('../assets/images/maxplayericon.png')}/>
            </View>
            <Text style={styles.info}>Max {creationInfo.max_players} Players</Text>
          </View>
          <View >
            <Text style={styles.infoTitle}>Game Description:</Text>
            <Text style={styles.gameDesc}>{creationInfo.desc}</Text>
          </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Modal
            isVisible={this.state.isModalVisible}
            backdropOpacity={0.7}
          >
            <View style={styles.modalContent}>
              <Image
                source={this.state.modalImage}
                style={styles.check}
              />
              <Text style={styles.title}>
                {this.state.modalTitleText}
              </Text>
              <Text style={styles.desc}>
                {this.state.modalBodyText}
              </Text>
              <Button
                title="OK"
                onPress={this._hideModal}
              />
            </View>
          </Modal>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={this._handleSubmit}
          >
            Create My Game
          </AwesomeButton>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
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
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  infoContainerFlex: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // flexWrap: "wrap"
  },
  infoTitle: {
    color: '#707070',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: '#707070',
    fontSize: 18,
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
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  check: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 20,
  },
  logo: {
    borderRadius:30,
    backgroundColor: '#FFA500',
    height: 60,
    width: 60,
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    height: 35,
    width: 35,
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
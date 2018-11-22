import React from 'react';
import { StyleSheet, Text, View, Button, Image , ScrollView} from 'react-native';
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
      return min;
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
          <View style={{flexDirection:'row', padding: 20, paddingLeft: 45, paddingRight: 45}}>
            <Image
              style={styles.logo}
              source = {SportDict[this.state.creationInfo.sport]}/>
            <View style={{paddingTop: 10, paddingLeft: 10}}>
            <Text style={styles.gameTitle}>{creationInfo.title}</Text>
            </View>
          </View>
          <ScrollView stickyHeaderIndices={[1]}>
          <MapView
            style={{ alignSelf: 'stretch', height: 250 , padding: 7, borderRadius:  10}}
            region={creationInfo.mapRegion}
          >
            <Marker key={1} coordinate={creationInfo.mapRegion} image={require('../assets/images/logoBlackSmall.png')}/>

          </MapView>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Time and Date</Text>
            <Text style={styles.info}>{creationInfo.start_time}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Duration</Text>
            <Text style={styles.info}>{this._convertMinToHour(creationInfo.duration)}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Competitive Level</Text>
            <Text style={styles.info}>{this._convertCompLevelToString(creationInfo.comp_level)}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Player Limit</Text>
            <Text style={styles.info}>{creationInfo.max_players}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Description</Text>
            <Text style={styles.info}>{creationInfo.desc}</Text>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  infoTitle: {
    color: '#707070',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: '#707070',
    fontSize: 18,
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
    tintColor:  '#000000',
  },
  gameTitle: {
    color: '#707070',
    fontSize: 30,
    fontWeight: 'bold',
    flexWrap:'wrap',
    textAlign: 'center'
  }
});
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';

import ConfirmationModal from '../assets/components/ConfirmationModal';

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
      location_lng: 0,
      location_lat: 0,
      max_players: navigation.getParam('maxPlayers', 'Default'),
      location_name: navigation.getParam('location', 'Default'),
      }
    });
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

  render() {
    const { creationInfo } = this.state;
    return (
      <View style={styles.review}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Sport</Text>
            <Text style={styles.info}>{creationInfo.sport}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Title</Text>
            <Text style={styles.info}>{creationInfo.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Description</Text>
            <Text style={styles.info}>{creationInfo.desc}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Competitive Level</Text>
            <Text style={styles.info}>{creationInfo.comp_level}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Time and Date</Text>
            <Text style={styles.info}>{creationInfo.start_time}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Duration</Text>
            <Text style={styles.info}>{this._convertMinToHour(creationInfo.duration)}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Player Limit</Text>
            <Text style={styles.info}>{creationInfo.max_players}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.info}>{creationInfo.location_name}</Text>
          </View>
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
                testID="modal-ok-button"
              />
            </View>
          </Modal>
          <View testID="done-button">
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
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
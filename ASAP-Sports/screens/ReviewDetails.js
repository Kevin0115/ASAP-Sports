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
  };

  componentDidMount() {
    let startTime = this.props.navigation.getParam('date', 'Default') + ' ' + this.props.navigation.getParam('time', 'Default');
    this.setState({creationInfo: {
        sport: this.props.navigation.getParam('sport', 'Default'),
        title: this.props.navigation.getParam('title', 'Default'),
        desc: this.props.navigation.getParam('desc', 'Default'),
        compLevel: this.props.navigation.getParam('compLevel', 'Default'),
        start_time: startTime,
        max_players: this.props.navigation.getParam('numPlayers', 'Default'),
        location_name: this.props.navigation.getParam('location', 'Default'),
      }
    });
  };

  _hideModal = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.popToTop();
  };

  _handleSubmit = () => {
    const creationInfo = JSON.stringify(this.state.creationInfo);
    fetch('http://796629f7.ngrok.io/games/host', {
      method: 'POST',
      headers: {
        'Authorization': 'b68c07da-e0c5-40ea-be83-75e9234e88f8',
      },
      body: creationInfo,
    }).then(res => res.json())
    .then(response = () => {
      console.log('Success: ', JSON.stringify(response));
      this.setState({modalTitleText: 'You Game Has Been Created!'});
      this.setState({modalBodyText: 'Enable notifications to be alerted when others join your game!\n\nYou\'ll be notified closer to the day of your game.'});
      this.setState({isModalVisible: true});
    })      
    .catch(error = () => {
      console.log('Error: ', error);
      this.setState({modalTitleText: 'Sorry Your Game Could Not Be Created'});
      this.setState({modalBodyText: 'We are sorry for the inconvenience, please try again'}); 
      this.setState({isModalVisible: true});  
    })    
  };

  render() {
    return (
      <View style={styles.review}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Sport</Text>
            <Text style={styles.info}>{this.state.creationInfo.sport}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Title</Text>
            <Text style={styles.info}>{this.state.creationInfo.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Description</Text>
            <Text style={styles.info}>{this.state.creationInfo.desc}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Competitive Level</Text>
            <Text style={styles.info}>{this.state.creationInfo.compLevel}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Game Time and Date</Text>
            <Text style={styles.info}>{this.state.creationInfo.start_time}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Player Limit</Text>
            <Text style={styles.info}>{this.state.creationInfo.max_players}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.info}>{this.state.creationInfo.location_name}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Modal
            isVisible={this.state.isModalVisible}
            backdropOpacity={0.7}
          >
            <View style={styles.modalContent}>
              <Image
                source={require('../assets/images/checked.png')}
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
    justifyContent: 'center',
    alignItems: 'center',
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
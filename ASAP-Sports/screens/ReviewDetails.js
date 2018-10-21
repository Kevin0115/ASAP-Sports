import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';

import ConfirmationModal from '../assets/components/ConfirmationModal';

export default class ReviewDetails extends React.Component {
  state = {
    isModalVisible: false,
  };

  _handleSubmit = () => {
    this._showConf;
  };

  _showConf = () => this.setState({isModalVisible: true});

  _hideConf = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.popToTop();
  };
  
  render() {
    return (
      <View style={styles.review}>
        


        <View style={styles.container}>
          <Text> PUT MATERIAL HERE. DON'T TOUCH STUFF OUTSIDE OF THIS VIEW</Text> 
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
                You Game Has Been Created!
              </Text>
              <Text style={styles.desc}>
                Enable notifications to be alerted when others join your game!
                {'\n\n'}You'll be notified closer to the day of your game.
              </Text>
              <Button
                title="OK"
                onPress={this._handleSubmit}
              />
            </View>
          </Modal>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={this._showConf}
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
    justifyContent: 'center',
    alignItems: 'center',
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
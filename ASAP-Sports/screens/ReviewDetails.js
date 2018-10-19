import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';

import ConfirmationModal from '../assets/components/ConfirmationModal';

export default class ReviewDetails extends React.Component {
  state = {
    isModalVisible: false,
  };

  _showConf = () => this.setState({isModalVisible: true});

  _hideConf = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.popToTop();
  }
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
              <Text>You Game Has Been Created!</Text>
              <Button
                title="OK"
                onPress={this._hideConf}
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
});
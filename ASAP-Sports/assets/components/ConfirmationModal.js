import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Picker } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';

class ConfirmationModal extends React.Component {

  _handlePress = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.popToTop();
  };

  render() {
    return (
      <View style={styles.modalContainer}>
        <Modal
          isVisible={this.props.isVisible}
          backdropOpacity={0.7}>
          <View style={styles.modalContent}>
            <Text>You Game Has Been Created!</Text>
            <Button
              title="OK"
              onPress={() => this.props.navigation.navigate('Homescreen')}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default withNavigation(ConfirmationModal);

const styles = StyleSheet.create({
  modalContainer: {
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
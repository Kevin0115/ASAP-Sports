import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import ConfirmationModal from '../assets/components/ConfirmationModal';

export default class ReviewDetails extends React.Component {
  state = {
    isModalVisible: false,
  };
  render() {
    return (
      <View style={styles.review}>
        <View style={styles.container}>
          <ConfirmationModal
            isVisible={this.state.isModalVisible}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={() => this.setState({isModalVisible: true})}
          >
            Submit
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
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
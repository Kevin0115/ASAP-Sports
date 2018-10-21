import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default class Location extends React.Component {
  state = {
    location: '', // plaintext string
    locChosen: false,
  };

  _handleNextPress = () => {
    if (this.state.locChosen) {
      this.props.navigation.navigate('ReviewDetails',
      {
        sport: this.props.navigation.getParam('sport', 'Default'),
        title: this.props.navigation.getParam('title', 'Default'),
        desc: this.props.navigation.getParam('desc', 'Default'),
        compLevel: this.props.navigation.getParam('compLevel', 'Default'),
        time: this.props.navigation.getParam('time', 'Default'),
        date: this.props.navigation.getParam('date', 'Default'),
        numPlayers: this.props.navigation.getParam('numPlayers', 'Default'),
        location: this.state.location,
      });
    } else {
      Alert.alert('Please enter a game location');
    }
  }

  render() {
    return (
      <View style={styles.location}>
        <View>
          <Button
            title="Next"
            color="blue"
            onPress={this._handleNextPress}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  location: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
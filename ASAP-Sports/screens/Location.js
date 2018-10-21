import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Location extends React.Component {
  state = {
    location: '', // plaintext string
    locChosen: false,
  };

  _handleLocationChange = (location) => {
    this.setState({location: location});
    this.setState({locChosen: true});
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
        <View style={styles.empty}/>
        <View style={styles.input}>
          <Text style={styles.textHeader}>Please Enter a Location</Text>
          <TextInput
            placeholder="Enter a location"
            placeholderTextColor="#c9c9c9"
            clearTextOnFocus={true}
            style={styles.titleInput}
            onChangeText={this._handleLocationChange}
            value={this.state.location}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={() => this._handleNextPress()}
          >
            Next
          </AwesomeButton>
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
  empty: {
    flex: 2.5
  },
  textHeader: {
    color: '#707070',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  input: {
    flex: 3.5,
    width: '90%',
    alignItems: 'center',
  },
  titleInput: {
    fontSize: 20,
    height: 48,
    width: '90%',
    borderColor: '#c9c9c9',
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
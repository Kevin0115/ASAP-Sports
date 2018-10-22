import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Picker, TouchableOpacity } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';

import NumPlayerKeys from '../assets/components/NumPlayerKeys';


export default class Location extends React.Component {
  state = {
    location: '', // plaintext string
    locChosen: false,
    isNumPickerVisible: false,
    numPlayers: 'No Limit Chosen',
    limitChosen: false,
  };

  _handleLocationChange = (location) => {
    this.setState({location: location});
    this.setState({locChosen: true});
  };

  _showNumPicker = () => this.setState({isNumPickerVisible: true});

  _hideNumPicker = () => this.setState({isNumPickerVisible: false});

  _handleNumPicked = (num) => {
    if (num != 1) {
      this.setState({
        numPlayers: num,
        limitChosen: true,
      });
    }
  };

  _limitMessage = () => {
    return this.state.limitChosen ? 
      'Player Limit: ' + this.state.numPlayers :
      'No Limit Chosen';
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
        duration: this.props.navigation.getParam('duration', 'Default'),
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
        <View style={styles.contentContainer}>
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
          <View style={styles.pickerSection}>
            <Modal 
              isVisible={this.state.isNumPickerVisible}
              style={styles.bottomModal}
              backdropOpacity={0.5}
            >
              <View style={styles.modalContent}>
                <Text style={{opacity: 0.6}}>
                  Choose a maximum number of players
                </Text>
                <Picker
                  style={{width: 200}}
                  selectedValue={this.state.numPlayers}
                  onValueChange={this._handleNumPicked}
                >
                  {NumPlayerKeys.map((item, index) => {
                    return (<Picker.Item label={item} value={index + 1} />)
                  })}
                </Picker>
                <Button title='Confirm' onPress={this._hideNumPicker} />
              </View>
            </Modal>
            <AwesomeButton
              width={320}
              height={60}
              onPress={this._showNumPicker}
            >
              Select Player Limit
            </AwesomeButton>
            <Text style={styles.headerText}>
              {this._limitMessage()}
            </Text>
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
  contentContainer: {
    justifyContent: 'center',
    width: '100%',
    flex: 6,
  },
  textHeader: {
    color: '#707070',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  input: {
    flex: 3.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 12,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
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
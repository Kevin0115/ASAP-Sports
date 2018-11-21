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
    maxPlayers: 'No Limit Chosen',
    limitChosen: false,
  };

  _handleLocationChange = (location) => {
    this.setState({location: location});
    this.setState({locChosen: true});
  };

  _showNumPicker = () => this.setState({isNumPickerVisible: true});

  _hideNumPicker = () => this.setState({isNumPickerVisible: false});

  _handleNumPicked = (num) => {
    this.setState({
      maxPlayers: num,
      limitChosen: (num === 1) ? false : true,
    });
  };

  _limitMessage = () => {
    return this.state.limitChosen ? 
      'Player Limit: ' + this.state.maxPlayers :
      'No Limit Chosen';
  };

  _handleNextPress = () => {
    if (this.state.locChosen && this.state.limitChosen) {
      this.props.navigation.navigate('ReviewDetails',
      {
        sport: this.props.navigation.getParam('sport', 'Default'),
        title: this.props.navigation.getParam('title', 'Default'),
        desc: this.props.navigation.getParam('desc', 'Default'),
        compLevel: this.props.navigation.getParam('compLevel', 'Default'),
        time: this.props.navigation.getParam('time', 'Default'),
        duration: this.props.navigation.getParam('duration', 'Default'),
        date: this.props.navigation.getParam('date', 'Default'),
        maxPlayers: this.state.maxPlayers,
        location: this.state.location,
      });
    } else {
      Alert.alert('Please complete all fields');
    }
  }

  render() {
    return (
      <View style={styles.location}>
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
                selectedValue={this.state.maxPlayers}
                onValueChange={this._handleNumPicked}
              >
                {NumPlayerKeys.map((item, index) => {
                  return (<Picker.Item label={item} value={index + 1} />);
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
            onPress={this._handleNextPress}
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
  textHeader: {
    color: '#707070',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  input: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 14,
    alignItems: 'center',
    color: '#8c8c8c',
  },
  pickerSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Picker } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

import NumPlayerKeys from './NumPlayerKeys';

export default class TimeDate extends React.Component {
  state = {
    isTimePickerVisible: false,
    isDatePickerVisible: false,
    isNumPickerVisible: false,
    chosenTime: 'No Time Chosen',
    chosenDate: 'No Date Chosen',
    numPlayers: 1,
  };

  _showNumPicker = () => this.setState({isNumPickerVisible: true});

  _hideNumPicker = () => this.setState({isNumPickerVisible: false});

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleNumPicked = (num) => {this.setState({numPlayers: num});}

  _handleTimePicked = (time) => {
    this.setState({chosenTime: (time.toLocaleString('en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
    }))});
    this._hideTimePicker();
  };

  _handleDatePicked = (date) => {
    this.setState({chosenDate: (date.toLocaleString('en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }))});
    this._hideDatePicker();
  };

  render() {
    return (
      <View style={styles.timedate}>
        <View style={styles.timedateWindow}>
          <View style={styles.pickerSection}>
            <AwesomeButton
              width={320}
              height={60}
              onPress={this._showDatePicker}
            >
              Select a Date
            </AwesomeButton>
            <DateTimePicker
              mode='date'
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDatePicker}
            />
            <Text style={styles.headerText}>
              {this.state.chosenDate}
            </Text>
          </View>
          <View style={styles.pickerSection}>
            <AwesomeButton
              width={320}
              height={60}
              onPress={this._showTimePicker}
            >
              Select a Time
            </AwesomeButton>
            <DateTimePicker
              mode='time'
              titleIOS='Pick a Time'
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
            />
            <Text style={styles.headerText}>
              {this.state.chosenTime}
            </Text>
          </View>
          <View style={styles.pickerSection}>
            <Modal 
              isVisible={this.state.isNumPickerVisible}
              style={styles.bottomModal}
              backdropOpacity={0.5}
            >
              <View style={styles.modalContent}>
                <Text style={{opacity: 0.6}}>Pick a Player Limit</Text>
                <Picker
                  style={{width: 100}}
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
              Player Limit: {this.state.numPlayers}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={() => this.props.navigation.navigate('Location')}
          >
            Next
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timedate: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timedateWindow: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    alignItems: 'center',
    color: '#8c8c8c',
    fontFamily: 'Helvetica',
  },
  buttonContainer: {
    flex: 1,
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
});
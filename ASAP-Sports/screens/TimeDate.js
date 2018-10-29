import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Picker, Alert } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

import GameDurations from '../assets/components/GameDurations';

export default class TimeDate extends React.Component {
  state = {
    isTimePickerVisible: false,
    isDatePickerVisible: false,
    isDurPickerVisible: false,
    chosenTime: 'No Time Chosen',
    chosenDate: 'No Date Chosen',
    duration: 30,
    dateChosen: false,
    timeChosen: false,
    durChosen: false,
  };

  _showNumPicker = () => this.setState({
    isDurPickerVisible: true,
    durChosen: true,
  });

  _hideNumPicker = () => this.setState({isDurPickerVisible: false});

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleNumPicked = (minutes) => this.setState({duration: minutes});

  _handleTimePicked = (time) => {
    this.setState({
      chosenTime: (
        time.toLocaleString(
          'en-US',
          {
            hour: 'numeric',
            minute: 'numeric',
          }
        )
      ),
      timeChosen: true,
    });
    this._hideTimePicker();
  };

  _handleDatePicked = (date) => {
    this.setState({
      chosenDate: (
        date.toLocaleString(
          'en-US',
          {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }
        )
      ),
      dateChosen: true,
    });
    this._hideDatePicker();
  };

  _handleNextPress = () => {
    if (this.state.dateChosen && this.state.timeChosen && this.state.durChosen) {
      this.props.navigation.navigate('Location',
      {
        sport: this.props.navigation.getParam('sport', 'Default'),
        title: this.props.navigation.getParam('title', 'Default'),
        desc: this.props.navigation.getParam('desc', 'Default'),
        compLevel: this.props.navigation.getParam('compLevel', 'Default'),
        time: this.state.chosenTime,
        date: this.state.chosenDate,
        duration: this.state.duration,
      });
    } else {
      Alert.alert('Warning','Please select all options');
    }
  };

  _durationText = () => {
    return this.state.durChosen ? 
      'Game Duration: ' + this._convertMinToHour(this.state.duration) :
      'No Limit Chosen';
  };

  _convertMinToHour = (min) => {
    if (min < 60) {
      return min;
    } else if (min === 60) {
      return '1 hour';
    } else {
      return (min / 60) + ' hours';
    }
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
              isVisible={this.state.isDurPickerVisible}
              style={styles.bottomModal}
              backdropOpacity={0.5}
            >
              <View style={styles.modalContent}>
                <Text style={{opacity: 0.6}}>
                  Choose a time limit
                </Text>
                <Picker
                  style={{width: 200}}
                  selectedValue={this.state.duration}
                  onValueChange={this._handleNumPicked}
                >
                  {GameDurations.map((item) => {
                    return (<Picker.Item label={this._convertMinToHour(item)} value={item} />);
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
              Select Game Duration
            </AwesomeButton>
            <Text style={styles.headerText}>
              {this._durationText()}
            </Text>
          </View>
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
    fontSize: 16,
    marginTop: 14,
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
});
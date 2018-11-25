import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, Picker, Alert } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { COLORS } from '../const';

export default class GameInfo extends React.Component {
  state = {
    gameTitle: '',
    titleEntered: false,
    gameDesc: '',
    compLevel: '2',
  };
  _handleTitleChange = (title) => {
    this.setState({gameTitle: title});
    this.setState({titleEntered: true});
  };

  _handleLevelPicked = (level) => {
    this.setState({compLevel: level});
  };

  _handleNextPress = () => {
    if (this.state.titleEntered) {
      this.props.navigation.navigate('TimeDate',
      {
        sport: this.props.navigation.getParam('sport', 'Default'),
        title: this.state.gameTitle,
        desc: this.state.gameDesc,
        compLevel: this.state.compLevel,
      });
    } else {
      Alert.alert('Warning','Please enter a game title');
    }
  };

  render() {
    return (
      <View style={styles.gameinfo}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.textHeader}>Game Title</Text>
            <TextInput
              placeholder="Enter a Game Title"
              placeholderTextColor={COLORS.lightGrey}
              style={styles.titleInput}
              onChangeText={this._handleTitleChange}
              value={this.state.gameTitle}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
            />
            <Text style={styles.textHeader}>Game Description</Text>
            <TextInput
              placeholder="Enter a Game Description"
              placeholderTextColor={COLORS.lightGrey}
              style={styles.descInput}
              multiline={true}
              onChangeText={(gameDesc) => this.setState({gameDesc})}
              value={this.state.gameDesc}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
            />
          </View>
          <View style={styles.rankingContainer}>
            <Text style={styles.textHeader}>Competitive Level</Text>
            <Picker
              style={styles.compPicker}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.compLevel}
              onValueChange={this._handleLevelPicked}
            >
              <Picker.Item label="Casual" value='1' />
              <Picker.Item label="Intermediate" value='2' />
              <Picker.Item label="Competitive" value='3' />
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor={COLORS.darkBlue}
            backgroundDarker={COLORS.darkerBlue}
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
  gameinfo: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#707070',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rankingContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInput: {
    fontSize: 20,
    height: 48,
    width: '90%',
    borderColor: COLORS.lightGrey,
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
  },
  descInput: {
    fontSize: 16,
    height: '45%',
    width: '90%',
    borderColor: COLORS.lightGrey,
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
  },
  compPicker: {
    width: 200,
    height: 200,
  },
  pickerItem: {
    fontSize: 24,
  },
});
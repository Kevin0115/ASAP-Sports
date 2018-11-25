import React from 'react';
import { Picker, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View, Button, AsyncStorage, Image, Switch, TextInput } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';

import Ages from '../assets/components/Ages';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Async state variables
      userData: {},
      userName: '',
      userPic: '',
      displayAge: false,
      displayBio: false,
      userAge: null,
      userBio: '',

      // Local state variables
      bioFlexVal: 2.6,
      ageFlexVal: 0,
      isModalVisible: false,
    };
    this._retrieveData();
  }

  _retrieveData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('authUser'));
    console.log(userData);
    this.setState({
      userData: userData,
      userName: userData.first + " " + userData.last,
      userPic: userData.profile_pic_url,
      userAge: userData.age,
      userBio: userData.bio,
    });

    // We'll also need to grab age and bio from the db if exists
    // Also grab the toggle states from the db as well.
    // With that information, set the state vars
  }

  // The following 4 functions need to alter the async authUser as well as DB user
  _handleAgeToggle = () => {
    this.setState({
      displayAge: !this.state.displayAge,
      bioFlexVal: this.state.displayAge ? 2.6 : 2.1,
      ageFlexVal: this.state.displayAge ? 0 : 0.5,
    })
  }

  _handleBioToggle = () => {
    this.setState({displayBio: !this.state.displayBio})
  }

  _handleAgePicked = (age) => {
    this.setState({userAge: age});
  }

  _handleBioChange = (bio) => {
    this.setState({userBio: bio});
  }

  // Only affect local state
  _hideModal = () => {
    this.setState({isModalVisible: false});
  }
  
  _renderNameAndAge = () => {
    return this.state.userName + 
      (this.state.displayAge && this.state.userAge ? ', ' + this.state.userAge : '');
  }

  _renderBio = () => {
    return this.state.displayBio ? styles.bioText : {display: 'none'};
  }

  _bioFlex = () => {
    return {
      flex: this.state.bioFlexVal,
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  _ageFlex = () => {
    return this.state.displayAge ?
    {
      flex: this.state.ageFlexVal,
    }
    :
    {
      display: 'none'
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.profile}
        behavior="padding"
        keyboardVerticalOffset={20}
        enabled
      >
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profilePic}
            source={{uri: this.state.userPic}}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this._renderNameAndAge()}
          </Text>
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.toggleText}>
            Display age on profile
          </Text>
          <Switch
            style={styles.toggleSwitch} 
            value={this.state.displayAge}
            onValueChange={this._handleAgeToggle}
          />
        </View>
        <View style={styles.toggleSection}>
          <Text style={styles.toggleText}>
            Display bio on profile
          </Text>
          <Switch
            style={styles.toggleSwitch} 
            value={this.state.displayBio}
            onValueChange={this._handleBioToggle}
          />
        </View>
        <View style={this._ageFlex()}>
          <Modal
            isVisible={this.state.isModalVisible}
            style={styles.bottomModal}
            backdropOpacity={0.5}
          >
            <View style={styles.modalContent}>
              <Text style={{opacity: 0.6}}>
                Choose your age
              </Text>
              <Picker
                style={{width: 200}}
                selectedValue={this.state.userAge}
                onValueChange={this._handleAgePicked}
              >
                {Ages.map((item, index) => {
                  return (<Picker.Item key={item} label={item} value={item} />);
                })}
              </Picker>
              <Button title='Confirm' onPress={this._hideModal} />
            </View>
          </Modal>
          <Button
            onPress={() => this.setState({isModalVisible: true})}
            title='Select Age'
          />
        </View>
        <View style={this._bioFlex()}>
          <TextInput
            placeholder='Enter a Bio'
            placeholderTextColor='#c9c9c9'
            clearTextOnFocus={false}
            style={this._renderBio()}
            multiline={true}
            onChangeText={this._handleBioChange}
            value={this.state.userBio}
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={() => this.props.navigation.popToTop()}
          >
            Done
          </AwesomeButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#8c8c8c',
  },
  profilePicContainer: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  toggleSection: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    flex: 5.7,
    marginLeft: 14,
    fontSize: 18,
  },
  toggleSwitch: {
    flex: 1,
  },
  bioText: {
    fontSize: 16,
    height: '90%',
    width: '90%',
    borderColor: '#c9c9c9',
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
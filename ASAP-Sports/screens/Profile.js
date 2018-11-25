import React from 'react';
import { Picker, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View, Button, AsyncStorage, Image, Switch, TextInput } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';
import { APP_BASE_URL, COLORS }  from './../const';

import Ages from '../assets/components/Ages';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Async state variables
      userData: {},
      userName: '',
      userPic: '../assets/images/userbigblue.png',
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
      displayAge: userData.show_age,
      displayBio: userData.show_bio,
    });
  }

  // The following 4 functions need to alter the async authUser as well as DB user
  _handleAgeToggle = async () => {
    this.setState({
      displayAge: !this.state.displayAge,
    })
    await AsyncStorage.mergeItem(
      'authUser',
      JSON.stringify({show_age: !this.state.displayAge})
    );
    fetch(APP_BASE_URL + '/user/update', {
      method: 'POST',
      headers: {
        'Authorization': this.state.userData.asap_access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'show_age': this.state.displayAge})
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
      }
    })
    .catch((error) => {
      console.warn('Error: ', error);
    });
  }

  _handleBioToggle = async () => {
    this.setState({displayBio: !this.state.displayBio})
    await AsyncStorage.mergeItem(
      'authUser',
      JSON.stringify({show_bio: !this.state.displayBio})
    );
    fetch(APP_BASE_URL + '/user/update', {
      method: 'POST',
      headers: {
        'Authorization': this.state.userData.asap_access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'show_bio': this.state.displayBio})
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
      }
    })
    .catch((error) => {
      console.warn('Error: ', error);
    });
  }

  _handleAgePicked = async (age) => {
    this.setState({userAge: age});
    await AsyncStorage.mergeItem(
      'authUser',
      JSON.stringify({age: age})
    );
    fetch(APP_BASE_URL + '/user/update', {
      method: 'POST',
      headers: {
        'Authorization': this.state.userData.asap_access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'age': age})
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
      }
    })
    .catch((error) => {
      console.warn('Error: ', error);
    });
  }

  _handleBioChange = async (bio) => {
    this.setState({userBio: bio});
    await AsyncStorage.mergeItem(
      'authUser',
      JSON.stringify({bio: bio})
    );
    fetch(APP_BASE_URL + '/user/update', {
      method: 'POST',
      headers: {
        'Authorization': this.state.userData.asap_access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'bio': bio})
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
      }
    })
    .catch((error) => {
      console.warn('Error: ', error);
    });
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
      flex: this.state.displayAge ? 2.1 : 2.6,
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  _ageFlex = () => {
    return this.state.displayAge ?
    {
      flex: this.state.displayAge ? 0.5 : 0,
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
            placeholderTextColor={COLORS.lightGrey}
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
            backgroundColor={COLORS.darkBlue}
            backgroundDarker={COLORS.darkerBlue}
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
    marginRight: 8,
  },
  bioText: {
    fontSize: 16,
    height: '90%',
    width: '90%',
    borderColor: COLORS.lightGrey,
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
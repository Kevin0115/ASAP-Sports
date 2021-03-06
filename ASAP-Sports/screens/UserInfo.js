import React from 'react';
import { Picker, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View, Button, AsyncStorage, Image, Switch, TextInput } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';
import APP_BASE_URL  from './../const';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userName: '',
      userPic: '../assets/images/userbigblue.png',
      displayAge: false,
      displayBio: false,
      userAge: null,
      userBio: '',
    };
    
  }

  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = () => {
    // WILL BE USING THIS LINE OF CODE BELOW
    const userData = this.props.navigation.getParam('userInfo', 'Default');

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

  // Only affect local state 
  _renderNameAndAge = () => {
    return this.state.userName + 
      (this.state.displayAge && this.state.userAge ? ', ' + this.state.userAge : '');
  }

  render() {
    return (
      <View style={styles.profile}>
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
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            {this.state.displayBio ? this.state.userBio : null}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor='#004e89'
            backgroundDarker='#001a33'
            onPress={() => this.props.navigation.goBack()}
          >
            Done
          </AwesomeButton>
        </View>
      </View>
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
  bioContainer: {
    flex: 4.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioText: {
    fontSize: 16,
    height: '90%',
    width: '90%',
    padding: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
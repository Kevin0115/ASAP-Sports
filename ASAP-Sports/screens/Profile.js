import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userPic: "",
    };
    this._retrieveData();
  }

  _retrieveData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('fbGraphApiResponse'));
    const userPic = JSON.parse(await AsyncStorage.getItem('profilePicUrl'));
    console.log('Displaying profilePicUrl:');
    console.log(userPic);
    console.log('End profilePicUrl');
    this.setState({
      userData: userData,
      userPic: userPic
    });
  }

  render() {
    return (
      <View style={styles.profile}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Welcome, {this.state.userData.name}!
          </Text>
        </View>
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profilePic}
            source={{uri: this.state.userPic}}
          />
        </View>
        <View style={{flex: 3.5}} />
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.props.navigation.popToTop()}
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
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8c8c8c',
  },
  profilePicContainer: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
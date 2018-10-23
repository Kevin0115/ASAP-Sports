import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
    this._retrieveData();
  }

  _retrieveData = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('fbGraphApiResponse'));
    this.setState({
      userData: userData,
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
        <View style={{flex: 5.3, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            //source={{uri: {pic}}}
          />
        </View>
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
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8c8c8c',
    fontFamily: 'Helvetica',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
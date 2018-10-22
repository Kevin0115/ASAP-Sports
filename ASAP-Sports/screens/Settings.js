import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Settings extends React.Component {


  async logOut() {
    await AsyncStorage.removeItem('userAuth');
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <View style={styles.settings}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Welcome to Settings
          </Text>
          <View style={{paddingTop:20}}>
          <Text style={styles.textLogout}
          onPress={() => this.logOut()}>
            Logout
          </Text>
          </View>
        </View>
        <View style={{flex: 5.3}} />
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
  settings: {
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
    fontFamily: 'Helvetica',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogout: {
    color: "#004e89",
    textDecorationLine: 'underline',
    fontSize: 16,
  }
});
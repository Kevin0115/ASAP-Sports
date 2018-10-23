import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage, Alert} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Settings extends React.Component {
  async logOut() {
    await AsyncStorage.removeItem('userAuth');
    this.props.navigation.navigate('AuthLoading');
  };

  _handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.logOut()},
      ],
      {cancelable: true},
    )
  };

  render() {
    return (
      <View style={styles.settings}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Settings
          </Text>
        </View>
        <View style={{flex: 4.8}} />
        <View style={styles.logoutContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#e80606"
            backgroundDarker="#910000"
            onPress={this._handleLogout}
          >
            Logout
          </AwesomeButton>
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
  logoutContainer: {
    flex: 0.5,
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
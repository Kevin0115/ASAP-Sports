import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class SettingsButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Settings')}>
        <Image
          source={require('../images/settings.png')}
          style={{width: 40, height: 40, marginRight: 10}}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(SettingsButton);
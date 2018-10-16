import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class ProfileButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Profile')}>
        <Image
          source={require('../images/user.png')}
          style={{width: 40, height: 40, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ProfileButton);
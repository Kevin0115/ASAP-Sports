import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class CancelButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
            onPress={() => 
              Alert.alert(
                'Cancel',
                'Are you sure you want to discard this game?',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'OK', onPress: () => this.props.navigation.popToTop()},
                ],
                {cancelable: true},
              )}
            >
            <Image
              source={require('../images/garbage.png')}
              style={{width: 30, height: 30, marginRight: 10}}
            />
          </TouchableOpacity>
    );
  }
}

export default withNavigation(CancelButton);
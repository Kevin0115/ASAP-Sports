import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

// This component is no longer under use.
// Keeping it in case we need to recycle it later on.

class FilterButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('FilterModal')}>
        <Image
          source={require('../images/filterIcon.png')}
          style={{width: 30, height: 30, marginRight: 10}}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(FilterButton);
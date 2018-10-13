import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Location extends React.Component {
  render() {
    return (
      <View style={styles.location}>
        <Text>LOCATION</Text>
        <View>
          <Button
            title="Next"
            color="blue"
            onPress={() => this.props.navigation.navigate('ReviewDetails')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  location: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
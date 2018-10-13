import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Homescreen extends React.Component {
  static navigationOptions = {
    title: 'ASAP Sports',
    headerStyle: {
      height: 50,
      backgroundColor: '#77b2ff',
     },
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
  render() {
    return (
      <View style={styles.homescreen}>
        <Text>HOMESCREEN</Text>
        <View>
          <Button
            title="Create a Game"
            color="blue"
            onPress={() => this.props.navigation.navigate('Gametype')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  homescreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

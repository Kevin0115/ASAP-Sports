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
    },
  };
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerText}>
            Your Upcoming Games
          </Text>
        </View>
        <View style={{flex: 5}}/>
        <View style={styles.nextButton}>
          <Button
            title="Create a Game"
            color="#fff"
            onPress={() => this.props.navigation.navigate('Gametype')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  homeHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  nextButton: {
    flex: 0.8,
    backgroundColor: '#004e89',
    justifyContent: 'center',
  },
  listItem: {
    fontSize: 18,
  },
});

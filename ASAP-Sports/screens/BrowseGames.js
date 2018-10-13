import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class BrowseGames extends React.Component {
  static navigationOptions = {
    title: 'Game Results',
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
      <View style={styles.browsegames}>
        <Text>BROWSE GAMES</Text>
        <View>
          <Button
            title="Next"
            color="blue"
            onPress={() => this.props.navigation.navigate('GameInfo')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  browsegames: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
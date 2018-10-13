import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Gametype extends React.Component {
  static navigationOptions = {
    title: 'Choose Game Type',
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
      <View style={styles.gametype}>
        <Text>GAMETYPE</Text>
        <View>
          <Button
            title="Next"
            color="blue"
            onPress={() => this.props.navigation.navigate('BrowseGames')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  gametype: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
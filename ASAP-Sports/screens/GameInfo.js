import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class GameInfo extends React.Component {
  static navigationOptions = {
    title: 'Enter Game Details',
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
      <View style={styles.gameinfo}>
        <Text>GAME INFO</Text>
        <View>
          <Button
            title="Next"
            color="blue"
            onPress={() => this.props.navigation.navigate('TimeDate')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  gameinfo: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
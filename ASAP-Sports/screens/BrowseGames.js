import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class BrowseGames extends React.Component {
  render() {
    const sport = this.props.navigation.getParam('sport', 'default');
    return (
      <View style={styles.browse}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerText}>
            No Results Found for {sport}...
          </Text>
          <Text style={styles.headerText}>
            {'\n'}Try Creating Your Own!
          </Text>
        </View>
        <View style={{flex: 5}}/>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => {
              this.props.navigation.navigate('GameInfo', {
                sport: sport
              });
            }}
          >
            Create a Game
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  browse: {
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
    fontSize: 16,
    alignItems: 'center',
    color: '#8c8c8c',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

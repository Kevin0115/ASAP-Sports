import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class Gametype extends React.Component {
  static navigationOptions = {
    title: 'Select a Sport',
    headerStyle: {
      height: 50,
      backgroundColor: '#6699ff',
     },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.gametype}>
        <View style={{flex: 6, alignItems: 'center', justifyContent: 'space-around'}}>
          <FlatList
            data={[
              {key: 'Basketball'},
              {key: 'Volleyball'},
              {key: 'Soccer'},
              {key: 'Volleyball'},
              {key: 'Basketball'},
              {key: 'Soccer'},
              {key: 'Basketball'},
              {key: 'Volleyball'},
              {key: 'Basketball'},
              {key: 'Basketball'},
              {key: 'Soccer'},
              {key: 'Volleyball'},
              {key: 'Basketball'},
              {key: 'Basketball'},
              {key: 'Basketball'},
              {key: 'Soccer'},
              {key: 'Volleyball'},
              {key: 'Basketball'},
              {key: 'Basketball'},
            ]}
            renderItem={({item}) =>
              <AwesomeButton
                width={320}
                height={60}
                backgroundColor="#004e89"
                backgroundDarker="#001a33"
                // PASS IN PROPS HERE
                onPress={() => this.props.navigation.navigate('BrowseGames')}
                style={styles.button}
              >
              {item.key}
              </AwesomeButton>
            }
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

  listItem: {
    fontSize: 18,
  },
  button: {
    marginTop: 16,
  }
});

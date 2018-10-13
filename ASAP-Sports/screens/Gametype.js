import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default class Gametype extends React.Component {
  static navigationOptions = {
    title: 'Select a Sport',
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
      <View style={styles.gametype}>
        <View style={{flex: 6}}>
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
              {key: 'Volleyball'},
              {key: 'Soccer'},
              {key: 'Basketball'},
              {key: 'Basketball'},
              {key: 'Basketball'},
              {key: 'Soccer'},
              {key: 'Basketball'},
              {key: 'Volleyball'},
              {key: 'Basketball'},
              {key: 'Soccer'},
              {key: 'Basketball'},
              {key: 'Volleyball'},
              {key: 'Soccer'},
              {key: 'Basketball'},
              {key: 'Soccer'},
              {key: 'Basketball'},
              {key: 'Basketball'},
            ]}
            renderItem={({item}) =>
              <Button title={item.key}/>
            }
          />
        </View>
        <View style={styles.nextButton}>
          <Button
            title="Next"
            color="#fff"
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

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, SectionList, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// Disable Warnings
console.disableYellowBox = true;

class HomeScreen extends React.Component {
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
            onPress={() => this.props.navigation.navigate('Sport')}
          />
        </View>
      </View>
    );
  }
}

class CreationSportSelect extends React.Component {
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
      <View style={styles.screen}>
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
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Sport: CreationSportSelect,
    },
    {
      initialRouteName: 'Home',
    }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
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
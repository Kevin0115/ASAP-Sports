import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, SectionList, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { RootStack } from "./navigation/AppNavigator";
import {CreationSportSelect} from "./screens/BrowseGames"; // Version can be specified in package.json

// Disable Warnings
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export const styles = StyleSheet.create({
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
    // fontFamily: 'Helvetica',
  },
  nextButton: {
    flex: 0.8,
    backgroundColor: '#004e89',
    justifyContent: 'center',
  },
  listItem: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  }
});

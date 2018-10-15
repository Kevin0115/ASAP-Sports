import React from 'react';
import { StyleSheet, Text, View , } from 'react-native';
import {styles} from "../App";
import AwesomeButton from 'react-native-really-awesome-button';
import StaticStar from "../components/StaticStar";

export class ReviewDetails extends React.Component {
  static navigationOptions = {
    title: 'Confirm Details',
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
        <View style={styles2.titleHeader}>
          <Text style={styles2.titleText}>
            3v3 Basketball
          </Text>
        </View>
        <View style={styles2.container2}>
        <View>
          <Text style={styles.headerText}>
            Game Description
          </Text>
        </View>
        <View style={styles2.container3}>
          <Text >
            Looking for a competetive game of 3v3. Rain or shine. Games are up to 21. best of 5 out of 7 games. Please bring agua bitch
          </Text>
        </View>
        <View style={styles2.container3}>
          <Text style={styles.headerText}>
            Date
          </Text>
        </View>
        <View style={styles2.container3}>
          <Text style={styles.headerText}>
            Time
          </Text>
        </View>
        <View style={styles2.container3}>
          <Text style={styles.headerText}>
            Location
          </Text>
        </View>


        <View style={styles2.container}>
          <StaticStar/>
        </View>

        </View>
        <View style={{flex: 5}}/>
        <View style={styles.buttonContainer}>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.props.navigation.navigate('Home')}
          >
            Confirm
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
    // backgroundColor: '#F5FCFF',
  },
  titleHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    // fontFamily: 'Helvetica',
  },
  container2: {
    padding: 15
    // backgroundColor: '#F5FCFF',
  },
  container3: {
    paddingBottom: 10
    // backgroundColor: '#F5FCFF',
  },
});
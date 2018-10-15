import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import {styles} from "../App";
import RankingStar from "../components/RankingStar";
import AwesomeButton from 'react-native-really-awesome-button';

export class CreateGameInfo extends React.Component {
  static navigationOptions = {
    title: 'Game Info',
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
        <View style={styles2.infoHeader}>
          <Text style={styles.headerText}>
            Game Title
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <TextInput
            style={{
              borderColor: '#000000',
              borderWidth: 1,
            }}
            placeholder=" Enter title "
          />
        </View>
        <View style={styles2.infoHeader}>
          <Text style={styles.headerText}>
            Game Description
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <TextInput
            style={{
              borderColor: '#000000',
              borderWidth: 1,
              textAlignVertical: "top",
              height: 175
            }}
            placeholder=" Enter Description "
            multiline={true}
            // numberOfLines={8}
          />
        </View>
        <View style={styles2.infoHeader}>
          <Text style={styles.headerText}>
            Set Competitive Level
          </Text>
        </View>
        <View style={styles2.container}>
          <RankingStar/>
        </View>
        <View style={{flex: 5}}/>
          <View style={styles.buttonContainer}>
            <AwesomeButton
              width={320}
              height={60}
              backgroundColor="#004e89"
              backgroundDarker="#001a33"
              onPress={() => this.props.navigation.navigate('ReviewDetails')}
            >
              Next
            </AwesomeButton>
          </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  infoHeader: {
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
    // backgroundColor: '#F5FCFF',
  },
});
import React from 'react';
import { Button, View, Text, StyleSheet, SectionList, FlatList } from 'react-native';
import {styles} from '../App'

export class CreationSportSelect extends React.Component {
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
            onPress={() => this.props.navigation.navigate('CreateGameInfo')}
          />
        </View>
      </View>
    );
  }
}
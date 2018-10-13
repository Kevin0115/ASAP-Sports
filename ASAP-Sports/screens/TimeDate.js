import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TimeDate extends React.Component {
  static navigationOptions = {
    title: 'Enter Game Time',
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
      <View style={styles.timedate}>
        <Text>TIME DATE</Text>
        <View>
          <Button
            title="Next"
            color="blue"
            onPress={() => this.props.navigation.navigate('Location')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  timedate: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
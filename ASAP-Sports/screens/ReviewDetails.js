import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ReviewDetails extends React.Component {
  static navigationOptions = {
    title: 'Confirm Details',
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
      <View style={styles.review}>
        <Text>CONFIRM DETAILS</Text>
        <View>
          <Button
            title="Create My Game!"
            color="blue"
            onPress={() => this.props.navigation.navigate('ConfirmMessage')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  review: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
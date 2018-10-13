import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ReviewDetails extends React.Component {
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
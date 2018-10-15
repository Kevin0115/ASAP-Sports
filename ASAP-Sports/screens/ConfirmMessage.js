import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class ConfirmMessage extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <View style={styles.confirm}>
        <Text>DONE!</Text>
        <View>
          <Button
            title="Go Home"
            color="blue"
            onPress={() => this.props.navigation.navigate('Homescreen')}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  confirm: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
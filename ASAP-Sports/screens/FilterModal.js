import React from 'react';
import { StyleSheet, Text, View, Button, Slider } from 'react-native';

export default class FilterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { distance: 0 }
  } 
  getVal(val){
    console.warn(val);
  }     
  render() {    

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Distance Radius
        </Text>
        <Slider
         style={{ width: 300 }}
         step={1}
         minimumValue={0}
         maximumValue={100}
         value={this.state.distance}
         onValueChange={val => this.setState({ distance: val })}
         onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          {this.state.distance}km
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
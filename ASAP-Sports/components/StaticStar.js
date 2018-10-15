import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class StaticStar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {numStars: 2};
  }


  render() {
    let stars = [];
    for (var i = 0; i < 3; i++) {
      let starPNGPath = require('./../assets/star-unfilled.png');
      if (this.state.numStars > i) {
        starPNGPath = require('./../assets/star-filled.png');
      }
      let num = i;
      stars.push(
        <View style={styles.starContainer}>
            <Image
              style={styles.image}
              source={starPNGPath}
            />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {stars}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingHorizontal: 20
  },
  starContainer: {
    padding: 10
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1
  },
  image: {
    width: 70,
    height: 70,
    // flex: 1
  }
});
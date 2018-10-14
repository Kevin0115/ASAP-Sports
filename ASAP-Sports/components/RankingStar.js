import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native';

export default class RankingStar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {numStars: 0};
    this.setNumStars = this.setNumStars.bind(this);
  }

  setNumStars = (num) => {
    if (num != this.state.numStars) {
      this.setState({
        numStars: num,
      });
    } else if (num > 0 && num == this.state.numStars) {
      this.setState({
        numStars: num - 1,
      });
    }
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
          <TouchableWithoutFeedback onPress={() => this.setNumStars(num + 1)}>
            <Image
              style={styles.image}
              source={starPNGPath}
            />
          </TouchableWithoutFeedback>
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
  },
  starContainer: {
    padding: 5
  },
  image: {
    width: 50,
    height: 50
  }
});
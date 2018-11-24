import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import SportList from './SportList';
import { COLORS } from '../../const';

export default class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: null,
      date: "",
    };
  }

  componentDidMount() {
    this._findIcon();
    this._cullDate();
  }

  _findIcon = () => {
    for (let i = 0; i < SportList.length; i++) {
      const sportName = SportList[i].key.toLowerCase()
      if (this.props.gameInfo.sport == sportName) {
        this.setState({icon: SportList[i].image});
      }
    }
  }

  _cullDate = () => {
    let newDate = this.props.gameInfo.start_time.split(" ");
    let hour = newDate[4];
    if (hour.split(':')[0] < 10) {
      newDate.splice(4, 1, hour.substring(1));
    }
    newDate.splice(3, 1);
    newDate.splice(0, 1);
    this.setState({
      date: newDate.join(" "),
    })
  }

  render() {
    return (
      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.button}
          onPress={() => this.props.onPress && this.props.onPress()}
          >
          <View style={styles.logoContainer}>
            <Image
              source={this.state.icon}
              style={styles.logo}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>
              {this.props.gameInfo.title}
            </Text>
            <View style={styles.iconTextContainer}>
              <Image
                source={require('../images/clock.png')}
                style={styles.miniIcon}
              />
              <Text >
                {this.state.date}
              </Text>
            </View>
            <View style={styles.iconTextContainer}>
              <Image
                source={require('../images/pin.png')}
                style={styles.miniIcon}
              />
              <Text >
                {this.props.gameInfo.location_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchableContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    height: 140,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    borderRadius: 60,
    overlayColor: COLORS.white, // Android requires overlay colour for Image's with borderRadius
    backgroundColor: COLORS.lightGrey,
    height: 100,
    width: 100,
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniIcon: {
    height: 15,
    width: 15,
    margin: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
  },
});
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../const';

export default class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
  }

  _determineInfoFlex = () => {
  }

  render() {
    return (
      <View style={styles.touchableContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.onPress && this.props.onPress()}
        >
          <View style={styles.logoContainer}>
            <Image
              source={{uri: this.props.player.profile_pic_url}}
              style={styles.logo}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameAgeContainer}>
              <Text style={styles.nameAgeText}>
                {this.props.player.first} {this.props.player.last }{this.props.player.age != null? ", "+this.props.player.age: ""}
              </Text>
            </View>
            { this.props.player.gender !== null ?
              <View style={styles.iconTextContainer}>
                <View style = {{flexDirection: 'row'}}>
                  <Image
                    source={require('../images/genderion.png')}
                    style = {styles.miniIcon}
                  />
                  <Text>
                    {this.props.player.gender}
                  </Text>
                </View>
              </View>
            : null }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  touchableContainer: {
    flex: 1,
    padding: 2,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    height: 100,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    borderRadius: 40,
    overlayColor: COLORS.white, // Android requires overlay colour for Image's with borderRadius
    backgroundColor: COLORS.lightGrey,
    height: 80,
    width: 80,
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },
  nameAgeText: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniIcon: {
    marginRight: 5,
    height: 15,
    width: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
  },
});
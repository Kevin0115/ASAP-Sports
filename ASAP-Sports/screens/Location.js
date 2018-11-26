import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import { MapView, Location, Permissions} from 'expo';
import { vancouver, delta, COLORS } from './../const';
import AwesomeButton from 'react-native-really-awesome-button';


export default class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.mapViewDems = {x:0, y:0 , width:0 , height:0};
  }

  state = {
    userLocation: null,
    mapRegion: {
        latitude: vancouver.latitude,
        longitude: vancouver.longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      },
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _handleNextPress = () => {
      this.props.navigation.navigate('ReviewDetails',
      {
        sport: this.props.navigation.getParam('sport', 'Default'),
        title: this.props.navigation.getParam('title', 'Default'),
        desc: this.props.navigation.getParam('desc', 'Default'),
        compLevel: this.props.navigation.getParam('compLevel', 'Default'),
        time: this.props.navigation.getParam('time', 'Default'),
        duration: this.props.navigation.getParam('duration', 'Default'),
        date: this.props.navigation.getParam('date', 'Default'),
        maxPlayers: this.props.navigation.getParam('maxPlayers', 'Default'),
        location: this.state.mapRegion,
      });
  }

  onRegionChange(region) {
    this.setState({
      mapRegion: region,
    });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({userLocation: location});
      this.setState({mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
        }});
    }
  };

  render() {
    return (
        <View>
          <MapView
            onLayout={(event) => {
              this.mapViewDems = event.nativeEvent.layout;
            }}
            style={{ alignSelf: 'stretch', height: '100%' }}
            region={this.state.mapRegion}
            onRegionChangeComplete = {(region) => {this.onRegionChange(region)}}
          >
          </MapView>
            <Image
              style={{
                position: "absolute",
                bottom: this.mapViewDems.height / 2,
                left: this.mapViewDems.width / 2 - 25,
                width: 50,
                height: 50
              }}
              source={require('../assets/images/logoBlackSmall.png')}/>
          <View style = {{position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{paddingBottom: 15}}>
            <AwesomeButton
              width={320}
              height={60}
              backgroundColor={COLORS.darkBlue}
              backgroundDarker={COLORS.darkerBlue}
              onPress={this._handleNextPress}
            >
              Next
            </AwesomeButton>
            </View>
            </View>
          </View>
    );
  }
}
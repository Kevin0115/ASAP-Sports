import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MapView, Location, Permissions} from 'expo';
import AwesomeButton from 'react-native-really-awesome-button';

const Marker = MapView.Marker;
const delta  = { //TODO throw into a const file
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const vancouver  = { //TODO throw into a const file
  latitude: 49.282730,
  longitude: -123.120735,
};

export default class LocationScreen extends React.Component {

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
            style={{ alignSelf: 'stretch', height: '100%' }}
            region={this.state.mapRegion}
            onRegionChange={(region) => this.onRegionChange(region)}
          >
            <Marker key={1} coordinate={this.state.mapRegion} image={require('../assets/images/logoBlackSmall.png')}/>

          </MapView>
          <View style = {{position: "absolute", bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{paddingBottom: 15}}>
            <AwesomeButton
              width={320}
              height={60}
              backgroundColor='#004e89'
              backgroundDarker='#001a33'
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



const styles = StyleSheet.create({
  location: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#707070',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  input: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 14,
    alignItems: 'center',
    color: '#8c8c8c',
  },
  pickerSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 12,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  titleInput: {
    fontSize: 20,
    height: 48,
    width: '90%',
    borderColor: '#c9c9c9',
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
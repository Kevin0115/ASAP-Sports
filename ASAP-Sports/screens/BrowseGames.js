import React from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  AsyncStorage, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  DatePickerIOS, 
  DatePickerAndroid, 
  TimePickerAndroid,
  ActivityIndicator,
  Slider,
  Dimensions
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { APP_BASE_URL, COLORS, vancouver, delta } from './../const';
import { Ionicons } from '@expo/vector-icons';
import SportList from '../assets/components/SportList';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-elements';
import { MapView, Location, Permissions} from 'expo';

const Marker = MapView.Marker;

/**
 * NOTES
 * 
 * Icon cheatsheet: https://ionicons.com/cheatsheet.html
 *    For icons you must use the value of the icon name prefixed with 'md-' if you want
 *    the Android version or 'ios-' if you want the iOS version of the icon.
 * 
 * Expo Icons: https://docs.expo.io/versions/latest/guides/icons
 *    Not extremely useful UNLESS you want to create custom icons. Likely this
 *    is the ideal way to handle all of our sports icons.
 * 
 * Custom Icons from SVG: https://github.com/react-native-community/react-native-svg/issues/109
 *    Look at igorrKur and his comment. He suggests using IcoMoon to create a font from SVG's.
 *    Would be very nice if we could do that.
 * 
 */


function encodeQueryString(params) {
  const keys = Object.keys(params)
  return keys.length
      ? "?" + keys.map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        ).join("&")
      : ""
}

function meters2kmString(m) {
  return parseFloat(Math.round(m/100)/10).toFixed(1) + ' km';
}

const MARKER_SIZE = 40;
const ANY = {
  key: 'Any Sport',
  apikey: 'any',
  image: require('../assets/images/questions-circular-button.png'),
}

import GameCard from '../assets/components/GameCard';

// FOR TESTING ONLY - when we get the API call working, this should be deleted
const sampleGames = [
  {  
   "id":3,
   "host_id":32,
   "title":"3v3 Basketball",
   "description":"3v3 pickup basketball game\n",
   "max_players":6,
   "sport":"basketball", // IMPORTANT this is lowercase in the DB
   "start_time":"Tuesday, October 23, 2018 04:30 PM",
   "end_time":"Tuesday, October 23, 2018 05:30 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"UBC SRC Gym 2",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:26 PM"
  },
  {  
   "id":4,
   "host_id":32,
   "title":"1v1 Tennis",
   "description":"tennis \n",
   "max_players":2,
   "sport":"tennis",
   "start_time":"Thursday, August 23, 2018 12:25 PM",
   "end_time":"Thursday, August 23, 2018 12:55 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"Tennis Court",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:36 PM"
  },
  {  
   "id":5,
   "host_id":32,
   "title":"5x5 Soccer",
   "description":"tennis \n",
   "max_players":2,
   "sport":"soccer",
   "start_time":"Thursday, August 23, 2018 02:25 PM",
   "end_time":"Thursday, August 23, 2018 02:55 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"Soccer Field",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:36 PM"
  },
  {  
   "id":6,
   "host_id":32,
   "title":"4v4 Volleyball",
   "description":"tennis \n",
   "max_players":2,
   "sport":"volleyball",
   "start_time":"Thursday, August 23, 2018 02:25 PM",
   "end_time":"Thursday, August 23, 2018 02:55 PM",
   "location_lat":0.0,
   "location_lng":0.0,
   "location_name":"Volleyball Court",
   "comp_level":1,
   "creation_timestamp":"Tuesday, October 23, 2018 09:36 PM"
  }
];

export default class BrowseGames extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      sport: ANY,
      time: null,
      radius_m: 2500,
      mapRegion: {
        latitude: vancouver.latitude,
        longitude: vancouver.longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      },
      userLocation: null,
      loading: true,
      openFilter: null,
      error: null
    };
    this.mapViewDems = null;
    this.buttonLayoutInfo = {refs: {}};
    this.sportList = SportList.map(s => s);
    this.sportList.splice(0, 0, ANY);
  }

  async searchGames() {
    const userAuthToken = await AsyncStorage.getItem('userAuth');
    const timeStr = this.state.time === null ? new Date().toUTCString() : this.state.time.toUTCString();
    console.log("Searching with time:", timeStr);
    const queryParams = encodeQueryString({
      radius_m: this.state.radius_m,
      lng: this.state.mapRegion.longitude,
      lat: this.state.mapRegion.latitude,
      start_time: timeStr,
      sport: this.state.sport.apikey,
      page_num: 0
    });
    const url = APP_BASE_URL + '/games/search' + queryParams;
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': userAuthToken,
      },
    }).then((res) => res.json())
    .then((response) => {
      if (response.error) {
        console.warn("Error!", response.error);
        this.setState({loading: false});
        // TODO handle error with modal
      } else {
        this.setState({
          games: response,
          loading: false,
        });
      }
    })
    .catch((error) => {
      // TODO extract modal from screens/Login.js and open on error
      console.warn('Error: ', error);
      this.setState({loading: false})
    });
  }

  selectSport(sport) {
    this.setState({sport: sport, openFilter: null});
    this.searchGames();
  }

  async openTimeSelect() {
    this.setState({openFilter: this.state.openFilter === 'time' ? null : 'time'});
    if (Platform.OS === 'ios'){
      this.searchGames();
      return; // iOS time select is handled fully by state.
    }

    const prevSelectedTime = this.state.time === null ? new Date(): this.state.time;

    // Android handles Date/Time picking with Dialogs that must be invoked with JS
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: prevSelectedTime
      });
      if (action === DatePickerAndroid.dismissedAction || ![year, month, day].every(n => n !== undefined)) {
        // Selected year, month (0-11), day
        this.setState({openFilter: null});
        return;
      }

      let tp = await TimePickerAndroid.open({
        hour: prevSelectedTime.getHours(),
        minute: prevSelectedTime.getMinutes(), // NOTIDEAL Kinda goofy ATM. Not sure what to do about it.
        is24Hour: false,
      });
      if (tp.action === TimePickerAndroid.dismissedAction || ![tp.hour, tp.minute].every(n => n !== undefined)) {
        this.setState({openFilter: null});
        return;
      }

      // TODO show error modal when times are in the past
      this.setState({openFilter: null, time: new Date(year, month, day, hour, minute)});
      this.searchGames();
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  getUserTimeStr() {
    /**
     * This is trash and there has to be a better way to do this
     */
    // console.log("getUserTimeStr", this.state.time && this.state.time.toUTCString());
    if (this.state.time === null) return "Right Now";
    const now = new Date();
    const hours = this.state.time.getHours();
    const minutes = this.state.time.getMinutes();
    const hourStr = hours % 12 === 0 ? 12 : hours % 12;
    const amPmStr = Math.floor(hours / 12) === 0 ? "AM" : "PM";
    const minStr = minutes === 0 ? "" : ":" + (minutes < 10 ? "0" + minutes : minutes) + " ";
    const dayStr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.state.time.getDay()];
    const monthDay = this.state.time.toLocaleString('en-US').split(' ').slice(1, 3).join(' ');
    const daysBetween = (this.state.time.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (daysBetween < -1/24) {
      return "Invalid Time"; // NOTIDEAL: How to be clear they selected a time in the past? Raise Exception maybe?
    }
    if (now.getDate() === this.state.time.getDate() && Math.abs(daysBetween) < 1){
      return hourStr + minStr + amPmStr + " Today";
    }
    if (daysBetween < 1) {
      return "Tomorrow " + hourStr + minStr + amPmStr; // TODO: doesn't do it properly if time is tomorrow but more than 24 hrs in future
    } else if (daysBetween < 7) {
      return dayStr + " " + hourStr + minStr + amPmStr;
    }
    return monthDay + " " + hourStr + minStr + amPmStr; // TODO: This is broken and works differently on iOS and Android
  }

  async _getLocationAsync() {
    console.log("getLocationAsync");
    let { status } = await Permissions.askAsync(Permissions.LOCATION); // NOTIDEAL this asks for coarse and THEN fine. Maybe just ask for one???
    console.log("Asked");
    if (status === 'granted') {
      console.log("Granted")
      let location = await Location.getCurrentPositionAsync({});
      console.log("Got Location")
      this.setState({userLocation: location});
      this.setState({mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
        }});
    }
    this.searchGames();
  }

  componentWillMount() {
    this._getLocationAsync();
  }
  
  render() {
    return (
      <View style={styles.browse}>
        <View style={[styles.topBar,styles.shadowed]}>
          <View style={styles.filterButtonContainer}>
            <View
            ref={(ref) => { this.buttonLayoutInfo.refs['location'] = ref }}
            onLayout={({nativeEvent}) => {
              let ref = this.buttonLayoutInfo.refs['location'];
              if (ref) {
                  ref.measure((x, y, width, height, pageX, pageY) => {
                          this.buttonLayoutInfo['location'] = pageX + width/2;
                 })
              }
            }}
            >
            <AwesomeButton
            width={60}
            height={60}
            backgroundColor={COLORS.white}
            backgroundDarker={COLORS.transparent}
            textColor={COLORS.darkGrey}
            onPress={() => {
              this.setState({openFilter: this.state.openFilter !== 'location' ? 'location': null});
            }}>
              <Ionicons name={Platform.OS === 'android' ? "md-pin": "ios-pin"} size={32} color={COLORS.pink} />
            </AwesomeButton>
            </View>
            <Text style={styles.filterButtonText}>Within {meters2kmString(this.state.radius_m)}</Text>
          </View>
          <View style={styles.filterButtonContainer}>
            <View
            ref={(ref) => { this.buttonLayoutInfo.refs['time'] = ref }}
            onLayout={({nativeEvent}) => {
              let ref = this.buttonLayoutInfo.refs['time'];
              if (ref) {
                  ref.measure((x, y, width, height, pageX, pageY) => {
                          this.buttonLayoutInfo['time'] = pageX + width/2;
                 })
              }
            }}
            >
            <AwesomeButton
            width={60}
            height={60}
            backgroundColor={COLORS.white}
            backgroundDarker={COLORS.transparent}
            textColor={COLORS.darkGrey}
            onPress={() => {
              this.openTimeSelect();
            }}>
              <Ionicons name={Platform.OS === 'android' ? "md-calendar": "ios-calendar"} size={32} color={COLORS.pink} />
            </AwesomeButton>
            </View>
            <Text style={styles.filterButtonText}>{this.getUserTimeStr()}</Text>
          </View>
          <View style={styles.filterButtonContainer}>
            <View
            ref={(ref) => { this.buttonLayoutInfo.refs['sport'] = ref }}
            onLayout={({nativeEvent}) => {
              let ref = this.buttonLayoutInfo.refs['sport'];
              if (ref) {
                  ref.measure((x, y, width, height, pageX, pageY) => {
                          this.buttonLayoutInfo['sport'] = pageX + width/2;
                 })
              }
            }}
            >
            <AwesomeButton
            width={60}
            height={60}
            backgroundColor={COLORS.white}
            backgroundDarker={COLORS.transparent}
            textColor={COLORS.darkGrey}
            style={{padding: 0, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              this.setState({openFilter: this.state.openFilter !== 'sport' ? 'sport': null});
            }}>
              {/* NOTIDEAL: this button is slightly wonky. There is some implicit padding on the AwesomeButton so it is limited to this small size */}
              <Image 
              source={this.state.sport.image}
              style={{width: 35, height: 35, tintColor: COLORS.pink}}></Image>
            </AwesomeButton>
            </View>
            <Text style={styles.filterButtonText}>{this.state.sport.key}</Text>
          </View>
        </View>
        {this.state.openFilter !== null && !(this.state.openFilter === 'time' && Platform.OS === 'android') &&
        <View>
          <Ionicons 
          name='md-arrow-dropup' 
          size={32} 
          color={COLORS.darkBlue}
          style={{
            position: 'absolute',
            top: -12,
            zIndex: 200,
            padding: 0,
            left: this.buttonLayoutInfo[this.state.openFilter] - 6}}/>
          <View style={[styles.filterControlWindow, styles.shadowed]}>
            {this.state.openFilter === 'sport' &&
            <View style={styles.horizontallyCenter}>
              <FlatList
              style={{width: '100%'}}
              data={this.sportList}
              numColumns={4}
              renderItem={({item}) => 
                <View
                style={{width: '25%', alignItems: 'center'}}
                >
                  <TouchableOpacity 
                  style={{backgroundColor: COLORS.white, borderRadius: 6, alignItems: 'center', justifyContent: 'center', padding: 5, margin: 5}}
                  onPress={() => this.selectSport(item)}>
                    <Image 
                    source={item.image} 
                    style={{width: 55, height: 55, tintColor: item.apikey === this.state.sport.apikey ? COLORS.pink: COLORS.grey}}></Image>
                  </TouchableOpacity>
                  <Text style={{color: COLORS.white, fontSize: 11, textAlign: 'center'}}>{item.key}</Text>
                </View>
              }/>
            </View>
            }
            {this.state.openFilter === 'time' && Platform.OS === 'ios' &&
              <View style={styles.horizontallyCenter}>
                <DatePickerIOS
                  style={{width: '100%', backgroundColor: COLORS.white, marginBottom: 15, borderRadius: 5}}
                  date={this.state.time === null ? new Date(): this.state.time}
                  onDateChange={date => this.setState({time: date})}
                />
                <AwesomeButton
                textColor={COLORS.white}
                backgroundColor={COLORS.pink}
                backgroundDarker={COLORS.transparent}
                title='Update Search'
                onPress={() => this.setState({openFilter: null}) || this.searchGames()}>
                  Update Search
                </AwesomeButton>
              </View>
            }
            {this.state.openFilter === 'location' &&
              <View style={styles.horizontallyCenter}>
              <View
              style={{ height: 250, width: '100%', marginBottom: 20 }}
              >
                <MapView
                // Ton of good examplage here https://stackoverflow.com/questions/49899475/react-native-draw-a-circle-on-the-map
                onLayout={(event) => {
                  this.mapViewDems = event.nativeEvent.layout;
                }}
                style={{ height: '100%', width: '100%'}}
                region={this.state.mapRegion}
                showsUserLocation = { true }
                onRegionChangeComplete={(region) => this.setState({mapRegion: region})}
                >
                  <MapView.Circle
                  key = { (this.state.mapRegion.latitude + this.state.mapRegion.longitude).toString() }
                  center = { this.state.mapRegion }
                  radius = { this.state.radius_m }
                  strokeWidth = { 1 }
                  strokeColor = { COLORS.pink }
                  fillColor = { COLORS.clearPink }
                  // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                  />
                </MapView>
                {this.mapViewDems !== null &&
                  <Image 
                  source={require('../assets/images/logoBlackSmall.png')}
                  style={{
                    position: 'absolute', 
                    bottom: this.mapViewDems.height / 2,
                    left: this.mapViewDems.width / 2 - MARKER_SIZE / 2,
                    width: MARKER_SIZE,
                    height: MARKER_SIZE
                  }}
                  ></Image>
                }
              </View>
              <Slider
              style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}
              step={1}
              minimumValue={500}
              maximumValue={10000}
              value={this.state.radius_m}
              // onValueChange={(val) => null}
              onSlidingComplete={ (val) => this.setState({radius_m: val})}
              thumbTintColor={COLORS.white}
              />
              <View style={{marginTop: 25, marginBottom: 0}}></View>
              <AwesomeButton
              textColor={COLORS.white}
              backgroundColor={COLORS.pink}
              backgroundDarker={COLORS.transparent}
              title='Update Search'
              onPress={() => this.setState({openFilter: null}) || this.searchGames()}>
                Update Search
              </AwesomeButton>
              </View>
            }
          </View>
        </View>
        }
        {this.state.loading &&
          <View style={styles.centerScreenMessage}>
            <ActivityIndicator size="large" color={COLORS.darkBlue} />
          </View>
        }
        {!this.state.loading && this.state.games.length == 0 &&
        <View style={styles.centerScreenMessage}>
          <Text style={styles.headerText}>
            Could not find any games. Click the icons on the top to change the search filters
            and find a match!
          </Text>
        </View>
        }
        {!this.state.loading && this.state.games.length > 0 &&
          <Text style={styles.headerText}>
            {this.state.games.map(g => <Text>{g.title}</Text>)}
            {/* TODO get game cards */}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    // TODO animate top bar closed on filter press
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.darkBlue,
    shadowRadius: 4,
  },
  browse: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'stretch',
  },
  centerScreenMessage: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.darkGrey,
  },
  listButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    marginLeft: 6,
    marginRight: 6,
  },
  logo: {
    width: 70,
    height: 70,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  filterButtonText: {
    color: COLORS.white, 
    fontSize: 12
  },
  filterControlWindow: {
    position: 'absolute',
    zIndex: 100,
    marginLeft: 15,
    marginRight: 15,
    top: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.darkBlue,
    borderRadius: 15,
  },
  horizontallyCenter: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  shadowed: {
    // iOS
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    
    // Android
    elevation: 5,
  }
});

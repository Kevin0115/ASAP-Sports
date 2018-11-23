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
  Slider
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { APP_BASE_URL, COLORS } from './../const';
import { Ionicons } from '@expo/vector-icons';
import SportList from '../assets/components/SportList';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native-elements';


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

const ANY = {
  key: 'Any Sport',
  apikey: 'any',
  image: require('../assets/images/questions-circular-button.png'),
}

export default class BrowseGames extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      sport: ANY,
      time: null,
      location: {lng: 49.2827, lat: 123.1207, radius: 500200}, // TODO get user location
      loading: true,
      openFilter: null,
      error: null
    };
    this.sportList = SportList.map(s => s);
    this.sportList.splice(0, 0, ANY);
    this.searchGames();
  }

  async searchGames() {
    const userAuthToken = await AsyncStorage.getItem('userAuth');
    const timeStr = this.state.time === null ? new Date().toUTCString() : this.state.time.toUTCString();
    console.log("Searching with time:", timeStr);
    const queryParams = encodeQueryString({
      radius_m: this.state.location.radius,
      lng: this.state.location.lng,
      lat: this.state.location.lat,
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
      console.log('Error: ', error);
      this.setState({loading: false})
    });
  }

  selectSport(sport) {
    console.log("selectSport:", sport);
    this.setState({sport: sport, openFilter: null});
    this.searchGames();
  }

  async openTimeSelect() {
    this.setState({openFilter: this.state.openFilter === 'time' ? null : 'time'});
    if (Platform.OS === 'ios'){
      this.searchGames();
      return; // IOS time select is handled fully by state.
    }

    const prevSelectedTime = this.state.time === null ? new Date(): this.state.time;

    // Android handles Date/Time picking with Dialogs that must be invoked with JS
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: prevSelectedTime
      });
      console.log("DatePicker", action, year, month, day);
      if (action === DatePickerAndroid.dismissedAction || ![year, month, day].every(n => n !== undefined)) {
        // Selected year, month (0-11), day
        this.setState({openFilter: null});
        return;
      }

      // TODO timePickerAction is undefined
      let {timePickerAction, hour, minute} = await TimePickerAndroid.open({
        hour: prevSelectedTime.getHours(),
        minute: prevSelectedTime.getMinutes(), // TODO Kinda goofy ATM. Not sure what to do about it.
        is24Hour: false,
      });
      console.log("TimePicker", timePickerAction, hour, minute);
      if (timePickerAction === TimePickerAndroid.dismissedAction || ![hour, minute].every(n => n !== undefined)) {
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
      return "Invalid Time"; // TODO: How to be clear they selected a time in the past?
    }
    if (now.getDate() === this.state.time.getDate() && Math.abs(daysBetween) < 1){
      return hourStr + minStr + amPmStr + " Today";
    }
    if (daysBetween < 1) {
      return "Tomorrow " + hourStr + minStr + amPmStr; // TODO: doesn't do it properly if time is tomorrow but more than 24 hrs in future
    } else if (daysBetween < 7) {
      return dayStr + " " + hourStr + minStr + amPmStr;
    }
    return monthDay + " " + hourStr + minStr + amPmStr;
  }
  

  render() {
    console.log("Rendering!");
    return (
      <View style={styles.browse}>
        <View style={styles.topBar}>
          <View style={styles.filterButtonContainer}>
            <AwesomeButton
            width={60}
            height={60}
            backgroundColor={COLORS.white}
            backgroundDarker={COLORS.transparent}
            textColor={COLORS.darkGrey}
            onPress={() => {
              console.log("Press location select button!");
              this.setState({openFilter: this.state.openFilter !== 'location' ? 'location': null});
            }}>
              <Ionicons name={Platform.OS === 'android' ? "md-pin": "ios-pin"} size={32} color={COLORS.pink} />
            </AwesomeButton>
            <Text style={styles.filterButtonText}>Within {meters2kmString(this.state.location.radius)}</Text>
          </View>
          <View style={styles.filterButtonContainer}>
            <AwesomeButton
            width={60}
            height={60}
            backgroundColor={COLORS.white}
            backgroundDarker={COLORS.transparent}
            textColor={COLORS.darkGrey}
            onPress={() => {
              console.log("Press time select button!");
              this.openTimeSelect();
            }}>
              <Ionicons name={Platform.OS === 'android' ? "md-calendar": "ios-calendar"} size={32} color={COLORS.pink} />
            </AwesomeButton>
            <Text style={styles.filterButtonText}>{this.getUserTimeStr()}</Text>
          </View>
          <View style={styles.filterButtonContainer}>
            <AwesomeButton
            width={60}
            height={60}
            backgroundColor={COLORS.white}
            backgroundDarker={COLORS.transparent}
            textColor={COLORS.darkGrey}
            onPress={() => {
              console.log("Press sport select button!");
              this.setState({openFilter: this.state.openFilter !== 'sport' ? 'sport': null});
            }}>
              {/* TODO: this button is slightly wonky*/}
              <Image 
              source={this.state.sport.image}
              tintColor={COLORS.pink}
                style={{width: 32, height: 32}}></Image>
            </AwesomeButton>
            <Text style={styles.filterButtonText}>{this.state.sport.key}</Text>
          </View>
        </View>
        {this.state.openFilter !== null && !(this.state.openFilter === 'time' && Platform.OS === 'android') &&
        <View>
          <Ionicons name='md-arrow-dropup' size={32} color={COLORS.darkBlue} style={{padding: 0, marginTop: -11, marginLeft: (this.state.openFilter === 'location' ? 59 : (this.state.openFilter === 'time' ? 173 : 287))}}/>
          <View style={styles.filterControlWindow}>
            {this.state.openFilter === 'sport' &&
              <FlatList
              data={this.sportList}
              numColumns={4}
              renderItem={({item}) => 
                <View>
                  {/* TODO Change effect when you touch this button. */}
                  <TouchableOpacity 
                  style={{backgroundColor: COLORS.white, borderRadius: 6, width: 65, height: 65, padding: 5, margin: 5}}
                  onPress={() => this.selectSport(item)}>
                    <Image 
                    tintColor={item.apikey === this.state.sport.apikey ? COLORS.pink: COLORS.grey} 
                    source={item.image} 
                    style={{width: 55, height: 55}}></Image>
                  </TouchableOpacity>
                  <Text style={{color: COLORS.white, fontSize: 11, textAlign: 'center'}}>{item.key}</Text>
                </View>
              }/>
            }
            {this.state.openFilter === 'time' && Platform.OS === 'ios' &&
              <View>
                <DatePickerIOS
                  date={this.state.time === null ? new Date(): this.state.time}
                  onDateChange={date => this.setState({time: date})}
                />
                <Button
                textColor={COLORS.white}
                backgroundColor={COLORS.pink}
                onPress={() => this.setState({openFilter: null}) || this.searchGames()}>
                  Update Search
                </Button>
              </View>
            }
            {this.state.openFilter === 'time' && Platform.OS === 'android' &&
              <View>
                {/* Android manages DateTime picking with JS */}
              </View>
            }
            {this.state.openFilter === 'location' &&
              <View style={styles.horizontallyCenter}>
              <Slider
              style={{ width: 280 }}
              step={1}
              minimumValue={500}
              maximumValue={100000}
              value={this.state.location.radius}
              onValueChange={(val) => null}
              onSlidingComplete={ (val) => this.setState({ location: {radius: val}})}
              thumbTintColor={COLORS.white}
              />
              <View style={{marginTop: 25, marginBottom: 25}}></View>
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
            <ActivityIndicator size="large" color={COLORS.pink} />
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
  topBar: { // TODO shadow below bar
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
    textAlign: 'center',
    padding: 30,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.darkGrey,
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
  filterControlWindow: { // TODO this should be positioned above the background and shouldnt displace the background
    // TODO drop shadow on this AND on little triangle
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.darkBlue,
    margin: 15,
    marginTop: -12,
    borderRadius: 15,
  },
  horizontallyCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

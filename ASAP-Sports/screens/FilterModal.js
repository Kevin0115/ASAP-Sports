import React from 'react';
import { StyleSheet, Text, View, Button, Slider } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

export default class FilterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: 0,
      timeOfDay: 0,
      dateRange: 0,
      comp: 0, }
  } 
  getVal(val){
    console.warn(val);
  }     
  render() {    

    return (
      <View style={styles.container}>
        <View style={styles.filterOptions}>
          <View>
            <Text style={styles.sliderText}>
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
            <Text style={styles.sliderText}>
              {this.state.distance}km from Current Location
            </Text>
          </View>
          <View>
            <Text style={styles.sliderText}>
              Date Range
            </Text>
            <Slider
              style={{ width: 300 }}
              step={1}
              minimumValue={0}
              maximumValue={30}
              value={this.state.dateRange}
              onValueChange={val => this.setState({ dateRange: val })}
              onSlidingComplete={ val => this.getVal(val)}
            />
            <Text style={styles.sliderText}>
              {this.state.dateRange} Days from Today
            </Text>
          </View>
          <View>
            <Text style={styles.sliderText}>
              Time of Day
            </Text>
            <Slider
              style={{ width: 300 }}
              step={1}
              minimumValue={0}
              maximumValue={100}
              value={this.state.timeOfDay}
              onValueChange={val => this.setState({ timeOfDay: val })}
              onSlidingComplete={ val => this.getVal(val)}
            />
            <Text style={styles.sliderText}>
              {
                this.state.timeOfDay < 25 ? 
                'Morning': this.state.timeOfDay < 50 ?
                'Afternoon' : this.state.timeOfDay < 75 ?
                'Evening' : 'Night'
              }
            </Text>
          </View>
          <View>
            <Text style={styles.sliderText}>
              Competitive Level
            </Text>
            <Slider
              style={{ width: 300 }}
              step={1}
              minimumValue={0}
              maximumValue={2}
              value={this.state.comp}
              onValueChange={val => this.setState({ comp: val })}
              onSlidingComplete={ val => this.getVal(val)}
            />
            <Text style={styles.sliderText}>
              {
                this.state.comp < 1 ?
                'Casual' : this.state.comp < 2 ?
                'Intermediate' : 'Competitive'
              }
            </Text>
          </View>
        </View>
        <View style={styles.applyFilter}>
          <AwesomeButton
            width={160}
            height={60}
            backgroundColor='#ea2727'
            backgroundDarker='#681010'
            style={{marginRight: 10}}
            onPress={() => this.props.navigation.goBack()}
          >
            Cancel
          </AwesomeButton>
          <AwesomeButton
            width={160}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            style={{marginLeft: 10}}
            // This will be a callback function
            onPress={() => this.props.navigation.goBack()}
          >
            Apply Filter
          </AwesomeButton>
        </View>
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
  filterOptions: {
    flex: 6,
    justifyContent: 'space-around',
  },
  applyFilter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 6,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
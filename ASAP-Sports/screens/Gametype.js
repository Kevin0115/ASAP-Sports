import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import SportList from '../assets/components/SportList';

export default class Gametype extends React.Component {
  render() {
    return (
      <View style={styles.gametype}>
        <View style={{flex: 6, alignItems: 'center', justifyContent: 'space-around'}}>
          <FlatList
            data={SportList}
            numColumns={2}
            renderItem={({item}) =>
              <AwesomeButton
                width={160}
                height={160}
                backgroundColor="#004e89"
                backgroundDarker="#001a33"
                // PASS IN PROPS HERE
                onPress={() => this.props.navigation.navigate('Browse',
                  {
                    sport: item.key,
                  })
                }
                style={styles.button}
              >
                <View style={styles.buttonContainer}>
                  <Image
                    source={item.image}
                    style={styles.logo}
                  />
                  <Text style={styles.label}>{item.key}</Text>
                </View>
              </AwesomeButton>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gametype: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  homeHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  listItem: {
    fontSize: 18,
  },
  buttonContainer: {
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
  }
});

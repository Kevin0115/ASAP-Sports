import React from 'react';
import { Button, View, Text, StyleSheet, SectionList, FlatList, Alert } from 'react-native';
import {styles} from '../App'
// import {Expo} from 'expo';
import AwesomeButton from 'react-native-really-awesome-button';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'ASAP Sports',
        headerStyle: {
            height: 50,
            backgroundColor: '#77b2ff',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('169924577279041', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.homeHeader}>
                    <Text style={styles.headerText}>
                        Your Upcoming Games
                    </Text>
                </View>
              <AwesomeButton
                width={320}
                height={60}
                backgroundColor="#004e89"
                backgroundDarker="#001a33"
                onPress={() => this.logIn()}
              >
                Login
              </AwesomeButton>
                <View style={{flex: 5}}/>
                <View style={styles.nextButton}>
                    <Button
                        title="Create a Game"
                        color="#fff"
                        onPress={() => this.props.navigation.navigate('Sport')}
                    />
                </View>
            </View>
        );
    }
}
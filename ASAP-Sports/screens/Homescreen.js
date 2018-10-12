import React from 'react';
import { Button, View, Text, StyleSheet, SectionList, FlatList } from 'react-native';
import {styles} from '../App'

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
    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.homeHeader}>
                    <Text style={styles.headerText}>
                        Your Upcoming Games
                    </Text>
                </View>
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
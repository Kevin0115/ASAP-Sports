import React from "react";
import {
  AsyncStorage, Image, StyleSheet,
  Text, View, Button
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import {SignedInStack} from "../navigation/AppNavigator";
import Modal from 'react-native-modal';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isModalVisible: false,
    modalImage: require('../assets/images/error.png'),
    modalTitleText: 'We could not log you in',
    modalBodyText: 'Something went wrong.'
  };

  _hideModal = () => {
    this.setState({isModalVisible: false});
  };

  _showError = (err) => {
    this.setState({
      modalTitleText: 'We could not log you in',
      modalBodyText: err,
      isModalVisible: true,
    });
  };

  static navigationOptions = {
    header: null,
  };

  async logIn() {
    const APP_ID = '169924577279041';
    const options = {
      permissions: ['public_profile'],
    };
    try {
      const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, options);
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`
        );
        const fbGraphApiResponse = (await response.json());
        await AsyncStorage.setItem('fbGraphApiResponse', JSON.stringify(fbGraphApiResponse));
        const tokenStr = token.toString();
        const loginBody = JSON.stringify({'fb_access_token': tokenStr});

        try {
          let ASAPresponse = await fetch('http://asapsports.aidanrosswood.ca/authentication/login', {
            method: 'POST',
            body: loginBody,
          });
          console.log('ASAP login API response:');
          console.log(ASAPresponse);
          const ASAPresponseJSON = await ASAPresponse.json();
          if (ASAPresponse.ok) {
            // await console.log('API response converted to json:');
            console.log(ASAPresponseJSON);
            await AsyncStorage.setItem('userAuth', ASAPresponseJSON.asap_access_token);
            this.props.navigation.navigate('App');
          } else {
            if (ASAPresponseJSON.error) {
              this._showError(ASAPresponseJSON.error);
            } else { //500 error
              this._showError('Something went wrong on our end.');
            }
          }
        } catch (err) {
          this._showError('Failed to reach server.');
          console.log('Error: ', err);
        }
        //make this conditional to succes
      }
    } catch (err) {
      console.log('Error: ', err);
      this._showError('Failed to reach server.');
    }
  }



  render () {
    return (
      <View style={styles.homescreen}>
        <View style={{flex: 1}} />
        <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logotext.png')}
              style={styles.logoPlaceholder}
            />
        </View>
        <View style={styles.buttonContainer}>
          <Modal
            isVisible={this.state.isModalVisible}
            backdropOpacity={0.7}
          >
            <View style={styles.modalContent}>
              <Image
                source={this.state.modalImage}
                style={styles.check}
              />
              <Text style={styles.title}>
                {this.state.modalTitleText}
              </Text>
              <Text style={styles.desc}>
                {this.state.modalBodyText}
              </Text>
              <Button
                title="OK"
                onPress={this._hideModal}
              />
            </View>
          </Modal>
          <AwesomeButton
            width={320}
            height={60}
            backgroundColor="#004e89"
            backgroundDarker="#001a33"
            onPress={() => this.logIn()}>
            Login with Facebook
          </AwesomeButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homescreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  logoContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    opacity: 0.2,
    width: 300,
    height: 225,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  check: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  desc: {
    textAlign: 'center',
    margin: 14,
    fontSize: 16,
  },
});

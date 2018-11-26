import React from 'react';
import { AsyncStorage, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class ProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPicExists: false,
      userPicUrl: '',
    };
  }

  async componentDidMount() {
    const userData = JSON.parse(await AsyncStorage.getItem('authUser'));
    if (userData.profile_pic_url && userData.profile_pic_url != undefined) {
      this.setState({
        userPicExists: true,
        userPicUrl: userData.profile_pic_url,
      });
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Profile')}>
        { 
          this.state.userPicExists ?
          <Image
            source={{uri: this.state.userPicUrl}}
            style={styles.profilePic}
          />
          :
          <Image
            source={require('../images/user.png')}
            style={styles.defaultPic}
          />
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultPic: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  profilePic: {
    overlayColor: '#0000000',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.4,
    borderColor: 'white',
    marginLeft: 10
  }
});

export default withNavigation(ProfileButton);
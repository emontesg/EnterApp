import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, Linking, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

// function vw(percentageWidth) {
//   return Dimensions.get('window').width * (percentageWidth / 100);
// }

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class Enter extends Component {
  componentDidMount() {
    Linking
    .getInitialURL()
    .then(url => this.handleOpenURL({ url }))
    .catch(console.error);
  }
  componentWillUnmount() {
  }
  handleOpenURL(event) {
    if (event.url) {
      var route = event.url.replace(/.*?:\/\//g, '');
      var id = route.replace(/noticia\?id=/g, '');
      id = id.replace(/.*noticia\//g, '');
      console.log(id);
      Actions.news({id: id});
    }
  }

  render() {
    return (
      <LinearGradient colors={['#FF774D', '#FE8A47', '#FBB03B']} style={styles.linearGradient}>
        <Image source={require('./../assets/imgs/enter-background.png')} style={styles.background}/>
        <View style={styles.logoViewStyle}>
          <Image source={require('./../assets/imgs/enter-logo.png')} style={styles.logoStyle}/>
        </View>
        <TouchableWithoutFeedback onPress={() => Actions.home()}>
          <View style={styles.facebookButtonViewStyle}>
            <Image source={require('./../assets/imgs/facebook-button.png')} style={styles.facebookButton}/>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Actions.home()}>
          <View style={styles.enterWithoutLoginView}>
            <Image source={require('./../assets/imgs/enter-without-login-button.png')} style={styles.enterWithouLoginButton}/>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

const styles = {
  linearGradient: {
    height: vh(100)
  },
  background: {
    position: 'absolute',
    width: vw(723),
    height: vw(1101),
    top: vw(30),
    left: vw(-20)
  },
  logoStyle: {
    width: vw(304),
    height: vw(81)
  },
  logoViewStyle: {
    marginTop: vw(408),
    alignSelf: 'center'
  },
  facebookButton: {
    width: vw(500),
    height: vw(80)
  },
  facebookButtonViewStyle: {
    marginTop: vw(336),
    alignSelf: 'center'
  },
  enterWithoutLoginView: {
    marginTop: vw(22),
    alignSelf: 'center'
  },
  enterWithouLoginButton: {
    width: vw(500),
    height: vw(80)
  }
};

export default Enter;

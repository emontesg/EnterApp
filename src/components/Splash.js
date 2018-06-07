import React, { Component } from 'react';
import { View, Dimensions, Image, Platform } from 'react-native';
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

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.enter();
    }, 3000);
  }

  render() {
    return (
      <View style={styles.border}>
      <LinearGradient colors={['#FBB03B', '#FE8A47', '#FF774D']} style={styles.linearGradient}>
        <View style={styles.viewStyle}>
          <Image source={require('./../assets/imgs/big-logo.png')} style={styles.logoStyle}/>
        </View>
      </LinearGradient>
      </View>
    );
  }
}

const styles = {
  border: {
    borderStyle: 'solid',
    borderWidth: vw(20),
    borderColor: 'white'
  },
  linearGradient: {
    height: vh(96),
  },
  logoStyle: {
    width: vw(230),
    height: vw(233),
  },
  viewStyle: {
    position: 'absolute',
    top: vw(400),
    left: vw(203)
  }
};

export default Splash;

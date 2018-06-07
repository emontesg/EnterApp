import React, { Component } from 'react';
import { View, Dimensions, Image, Text, Platform } from 'react-native';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class Quote extends Component {
  render() {
    return (
      <View style={styles.quoteContainer}>
        <Image source={require('./../../assets/imgs/quote1.png')} style={styles.quote1}/>
        <Text style={styles.text}>{this.props.text}</Text>
        <Image source={require('./../../assets/imgs/quote2.png')} style={styles.quote2}/>
        <Text style={styles.author}>{this.props.author}</Text>
        <Image source={{uri: this.props.photo}} style={styles.photo}/>
      </View>
    );
  }
}

const styles = {
  quoteContainer: {
    marginTop: vw(27),
    marginBottom: vw(27),
    position: 'relative'
  },
  quote1: {
    width: vw(32),
    height: vw(23),
    position: 'absolute',
    top: vw(10)
  },
  quote2: {
    width: vw(32),
    height: vw(23),
    position: 'absolute',
    right: 0,
    bottom: vw(130)
  },
  text: {
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    fontSize: vw(40),
    lineHeight: vw(48),
    textAlign: 'center',
    marginLeft: vw(42),
    marginRight: vw(42),
    color: '#333',
    marginBottom: vw(40)
  },
  author: {
    fontFamily: 'FranklinGothicFS-BookIt',
    backgroundColor: 'transparent',
    fontSize: vw(28),
    lineHeight: vw(33.6),
    textAlign: 'right',
    marginRight: vw(70),
    color: '#999'
  },
  photo: {
    width: vw(55),
    height: vw(55),
    borderRadius: (Platform.OS === 'ios') ? vw(27) : vw(90),
    position: 'absolute',
    bottom: vw(-10),
    right: 0
  }
};

export { Quote };

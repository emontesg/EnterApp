import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class OrangeButton extends Component {
  state = { checked: false};

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>{this.props.value.toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: vw(30),
    lineHeight: vw(36),
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Soft Core'
  },
  viewStyle: {
    position: 'relative',
    paddingRight: vw(87),
    paddingLeft: vw(87),
    paddingBottom: vw(28),
    paddingTop: vw(28),
    alignSelf: 'flex-start',
    backgroundColor: '#FF774D',
    borderRadius: vw(45)
  }
};

export { OrangeButton };

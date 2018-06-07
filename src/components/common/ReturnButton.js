import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class ReturnButton extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.e()}>
        <View style={styles.viewStyle}>
          <Icon name="arrow-circle-o-left" size={vw(60)} color="white"/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  viewStyle: {
    position: 'absolute',
    top: vw(45),
    left: vw(43)
  }
};

export { ReturnButton };

import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class CheckBox extends Component {
  state = { checked: false};

  onEmailChange(text) {
    // this.props.passwordChanged(text);
  }

  onPassChange(text) {
    // this.props.passwordChanged(text);
  }

  renderCheckbox() {
    if(this.state.checked) {
      return (<Icon name="check-square-o" size={vw(30)} color="white" />)
    }
    else {
      return (<Icon name="square-o" size={vw(30)} color="white" />)
    }
  }

  render() {
    console.log(this.state.checked);
    return (
      <TouchableWithoutFeedback onPress={() => this.state.checked ? this.setState({checked: false}) : this.setState({checked: true})}>
      <View style={styles.viewStyle}>
        {this.renderCheckbox()}
        <Text style={styles.textStyle}>{this.props.text}</Text>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: vw(22),
    lineHeight: vw(26.4),
    color: 'white',
    position: 'absolute',
    top: vw(2),
    left: vw(40)
  },
  viewStyle: {
    position: 'relative'
  }
};

export { CheckBox };

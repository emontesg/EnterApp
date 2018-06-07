import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class Switch extends Component {
  state = { enabled: true};

  switchClicked() {
    this.state.enabled ? this.setState({enabled: false}) : this.setState({enabled: true});
    this.props.onClick(!this.state.enabled);
  }

  renderSwitch() {
    if(this.state.enabled) {
      return (<Image source={require('./../../assets/imgs/switch-enabled.png')} style={styles.switch}/>)
    }
    else {
      return (<Image source={require('./../../assets/imgs/switch-disabled.png')} style={styles.switch}/>)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.switchClicked()}>
        <View style={this.props.style}>
          {this.renderSwitch()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  switch: {
    width: vw(75),
    height: vw(44)
  }
};

export { Switch };

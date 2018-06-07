import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import * as Constants from './Constants';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class SaveButton extends Component {
  state = { checked: this.props.checked };

  SaveButtonClicked() {
    this.state.checked ? this.setState({checked: false}) : this.setState({checked: true});
    if(this.props.onClick)
    {
      this.props.onClick(!this.state.checked);
    }
  }

  renderSaveButton() {
    if(this.state.checked) {
      return (<Image source={require('./../../assets/imgs/saved-icon.png')} style={styles.saveButton}/>)
    }
    else {
      return (<Image source={require('./../../assets/imgs/save-icon.png')} style={styles.saveButton}/>)
    }
  }

  render() {
    if(Constants.SAVE_ENABLED) {
      return (
        <TouchableWithoutFeedback onPress={() => this.SaveButtonClicked()}>
          <View style={this.props.style}>
            {this.renderSaveButton()}
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  saveButton: {
    width: vw(28),
    height: vw(40)
  }
};

export { SaveButton };

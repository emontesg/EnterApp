import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class SelectButton extends Component {
  state = { checked: false };

  color = this.props.category == 'noticia' ? ['#FBB03B', '#FF774D'] :
          this.props.category == 'deporte' ? ['#FFFF00', '#9DD750', '#22B573'] :
          this.props.category == 'vida' ? ['#FFBA33', '#FFE800'] :
          this.props.category == 'entretenimiento' ? ['#D4145A', '#FB5258'] :
          this.props.category == 'tecnologia' ? ['#12ECBF', '#37C3D3'] :
          this.props.category == 'economia' ? ['#3DA6F4', '#0068E1'] :
          ['white', 'white'];

  buttonClicked() {
    this.state.checked ? this.setState({checked: false}) : this.setState({checked: true});
    this.props.onClicked(!this.state.checked);
  }

  renderSelectButton() {
    if(this.state.checked) {
      return (<LinearGradient colors={this.color} style={styles.linearGradient} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
                <Text style={styles.selectedText}>{this.props.value}</Text>
              </LinearGradient>)
    }
    else {
      return (<View style={styles.view}>
                <Text style={styles.text}>{this.props.value}</Text>
               </View>)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.buttonClicked()}>
          {this.renderSelectButton()}
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  text: {
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    fontSize: vw(22),
    lineHeight: vw(26.4),
    color: '#CCCCCC'
  },
  selectedText: {
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    fontSize: vw(22),
    lineHeight: vw(26.4),
    color: 'white'
  },
  view: {
    position: 'relative',
    paddingRight: vw(38),
    paddingLeft: vw(38),
    paddingBottom: vw(20),
    paddingTop: vw(20),
    alignSelf: 'flex-start',
    borderRadius: vw(45),
    borderStyle: 'solid',
    borderColor: '#E6E6E6',
    borderWidth: vw(3),
    marginRight: vw(8),
    marginLeft: vw(8)
  },
  linearGradient: {
    position: 'relative',
    paddingRight: vw(41),
    paddingLeft: vw(41),
    paddingBottom: vw(23),
    paddingTop: vw(23),
    alignSelf: 'flex-start',
    borderRadius: vw(45),
    marginRight: vw(8),
    marginLeft: vw(8)
  }
};

export { SelectButton };

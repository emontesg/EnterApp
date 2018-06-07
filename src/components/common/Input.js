import React, { Component } from 'react';
import { TextInput, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { VDimensions } from './VDimensions';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class Input extends Component {
  state = {secureText: this.props.secureTextEntry};

  image = this.props.icon == 'email' ? require('./../../assets/imgs/email-icon.png') :
              this.props.icon == 'password' ? require('./../../assets/imgs/password-icon.png') :
              require('./../../assets/imgs/name-icon.png');
  text = '';
  
  renderEye() {
    if(this.state.secureText) {
      return (
          <TouchableWithoutFeedback onPress={() => this.setState({secureText: false})}>
            <Icon name="eye" size={vw(30)} color="white" style={styles.eyeStyle} />
          </TouchableWithoutFeedback>
        )
    }
    else if(this.state.secureText == false){
      return (
          <TouchableWithoutFeedback onPress={() => this.setState({secureText: true})}>
            <Icon name="eye-slash" size={vw(30)} color="white" style={styles.eyeStyle} />
          </TouchableWithoutFeedback>
        )
    }
    else
      return null;
  }

  onChangeText(pText)
  {
    this.text = pText;
    this.props.onChangeText(pText);
  }

  render() {
    return (
      <View style={this.props.style}>
      <View style={styles.viewStyle}>
        <TextInput
          secureTextEntry={this.state.secureText}
          placeholder={this.props.placeholder}
          autoCorrect={false}
          style={styles.inputStyle}
          value={this.props.value}
          onChangeText={(text) => this.onChangeText(text)}
          underlineColorAndroid='transparent'
        />
        <View style={styles.imageViewStyle}>
            <Image source={this.image} style={styles.imageStyle}/>
        </View>
        <View style={styles.rightIconViewStyle}>
          {this.renderEye()}
        </View>
      </View>
      </View>
    );
  }
}

const styles = {
  viewStyle:{
    position: 'relative'
  },
  inputStyle: {
    backgroundColor: 'white',
    color: '#333',
    paddingRight: vw(90),
    paddingLeft: vw(96),
    fontSize: vw(25),
    lineHeight: vw(30),
    width: vw(500),
    height: vw(80),
    borderRadius: vw(45)
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageViewStyle: {
    position: 'absolute',
    top: vw(27),
    left: vw(42)
  },
  imageStyle: {
    width: vw(26),
    height: vw(26)
  },
  eyeStyle: {
    color: '#CCCCCC'
  },
  rightIconViewStyle: {
    position: 'absolute',
    top: vw(25),
    left: vw(426)
  }
};

export { Input };

import React, { Component } from 'react';
import { Text, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Switch } from './common';

// function vw(percentageWidth) {
//   return Dimensions.get('window').width * (percentageWidth / 100);
// }

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class FirstNotificationSettings extends Component {
  state = { enabled: true};

  switchClicked(enabled) {
    this.setState({enabled: enabled});
  }

  renderIcon() {
    if(this.state.enabled) {
      return(<Image source={require('./../assets/imgs/first-notification-icon-enabled.png')} style={styles.notificationIcon}/>);
    } else {
      return(<Image source={require('./../assets/imgs/first-notification-icon-disabled.png')} style={styles.notificationIcon}/>);
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        {this.renderIcon()}
        <Text style={styles.title}>Notificaciones</Text>
        <Text style={styles.text}>Recibirás notificaciones únicamente</Text>
        <Text style={styles.text}>de las noticias más destacadas.</Text>
        <Switch onClick={this.switchClicked.bind(this)} style={styles.switch}/>
        <Text style={styles.text}>Activá o desactivá las notificaciones desde</Text>
        <Text style={styles.text}>ajustes, en cualquier momento.</Text>
        <TouchableWithoutFeedback onPress={() => Actions.home()}>
          <View style={styles.nextButtonView}>
            <Image source={require('./../assets/imgs/next-button-enabled.png')} style={styles.nextButton}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    position: 'absolute',
    height: vh(100),
    width: vw(640),
    backgroundColor: 'white'
  },
  notificationIcon: {
    width: vw(193),
    height: vw(193),
    marginTop: vw(96),
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'GothamRnd-Bold',
    backgroundColor: 'transparent',
    fontSize: vw(30),
    lineHeight: vw(36),
    alignSelf: 'center',
    marginTop: vw(70),
    marginBottom: vw(65),
    color: '#333333'
  },
  text: {
    fontFamily: 'franklingothic-book',
    backgroundColor: 'transparent',
    fontSize: vw(26),
    lineHeight: vw(31.2),
    alignSelf: 'center',
    color: '#808080'
  },
  switch: {
    marginTop: vw(100),
    marginBottom: vw(120),
    alignSelf: 'center'
  },
  nextButton: {
    width: vw(53),
    height: vw(53),
    alignSelf: 'center'
  },
  nextButtonView: {
    marginTop: vw(70)
  }
};

export default FirstNotificationSettings;

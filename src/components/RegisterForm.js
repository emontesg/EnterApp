import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { Input, CheckBox, OrangeButton, ReturnButton } from './common';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class RegisterForm extends Component {
  onNameChange(text) {
  }

  onEmailChange(text) {
  }

  onPassChange(text) {
  }

  render() {
    return (
      <LinearGradient colors={['#FF774D', '#FE8A47', '#FBB03B']} style={styles.linearGradient}>
      <ReturnButton e={Actions.enter}/>
      <View style={styles.viewStyle}>
        <Image source={require('./../assets/imgs/select-photo-button.png')} style={styles.photoButton}/>
        <Text style={styles.title}>Nueva cuenta</Text>
        <Input
            placeholder="Nombre y Apellidos"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.fullname}
            icon="name"
            style={styles.nameInput}
          />
        <Input
            placeholder="Correo electrónico"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            icon="email"
            style={styles.emailPassInput}
          />
        <Input
            secureTextEntry
            placeholder="Contraseña"
            onChangeText={this.onPassChange.bind(this)}
            value={this.props.password}
            icon="password"
            style={styles.emailPassInput}
          />
      </View>
      <Text style={styles.terms}>Al ingresar, aceptás los términos y condiciones</Text>
      <View style={styles.checkbox}><CheckBox text="Recordar mi cuenta"/></View>
      <View style={styles.registerButton}><OrangeButton value="Crear"/></View>
      <Text style={styles.text2}>¿Ya abriste una cuenta?</Text>
      <TouchableWithoutFeedback onPress={() => Actions.login()}>
        <View><Text style={styles.loginButton}>Ingresar</Text></View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

const styles = {
  linearGradient: {
    height: vh(100)
  },
  viewStyle: {
    alignItems: 'center'
  },
  photoButton: {
    width: vw(161),
    height: vw(130),
    marginTop: vw(65)
  },
  title: {
    marginTop: vw(40),
    color: 'white',
    fontSize: vw(30),
    lineHeight: vw(36)
  },
  nameInput: {
    marginTop: vw(40)
  },
  emailPassInput: {
    marginTop: vw(32)
  },
  terms: {
    fontSize: vw(24),
    lineHeight: vw(28.8),
    marginTop: vw(35),
    color: 'white',
    marginLeft: vw(80)
  },
  checkbox: {
    marginTop: vw(30),
    marginLeft: vw(80)
  },
  registerButton: {
    marginTop: vw(65),
    alignSelf: 'center'
  },
  text2: {
    marginTop: vw(60),
    alignSelf: 'center',
    color: 'white',
    fontSize: vw(24),
    lineHeight: vw(28.8)
  },
  loginButton: {
    alignSelf: 'center',
    fontSize: vw(22),
    lineHeight: vw(26.4),
    color: 'white',
    marginTop: vw(10)
  }
};

export default RegisterForm;

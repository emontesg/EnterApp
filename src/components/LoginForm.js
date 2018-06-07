import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Input, CheckBox, OrangeButton, ReturnButton } from './common';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class LoginForm extends Component {
  onEmailChange(text) {
    // this.props.passwordChanged(text);
  }

  onPassChange(text) {
    // this.props.passwordChanged(text);
  }

  render() {
    return (
      <LinearGradient colors={['#FF774D', '#FE8A47', '#FBB03B']} style={styles.linearGradient}>
      <ReturnButton e={Actions.enter}/>
      <View style={styles.viewStyle}>
        <Text style={styles.title}>Mi cuenta</Text>
        <Input
            placeholder="Correo electrónico"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            icon="email"
            style={styles.emailInput}
          />
        <Input
            secureTextEntry
            placeholder="Contraseña"
            onChangeText={this.onPassChange.bind(this)}
            value={this.props.password}
            icon="password"
            style={styles.passInput}
          />
      </View>
      <TouchableWithoutFeedback>
        <View style={styles.recoverPassView}>
          <Text style={styles.recoverPass}>Recuperar contraseña</Text>
        </View>
      </TouchableWithoutFeedback>
      
      <Text style={styles.terms}>Al ingresar, aceptás los términos y condiciones</Text>
      <View style={styles.checkbox}><CheckBox text="Recordar mi cuenta"/></View>
      <View style={styles.enterButton}><OrangeButton value="Ingresar"/></View>
      <Text style={styles.text2}>¿Aún no tenés una cuenta?</Text>
      <TouchableWithoutFeedback onPress={() => Actions.register()}>
        <View><Text style={styles.createAccountButton}>Crear cuenta</Text></View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

const styles = {
  linearGradient: {
    height: vh(100)
  },
  emailInputStyle: {
    
  },
  viewStyle: {
    alignItems: 'center'
  },
  title: {
    marginTop: vw(150),
    color: 'white',
    fontSize: vw(30),
    lineHeight: vw(36)
  },
  emailInput: {
    marginTop: vw(55)
  },
  passInput: {
    marginTop: vw(32)
  },
  recoverPass: {
    marginTop: vw(40),
    fontSize: vw(22),
    lineHeight: vw(26.4),
    color: 'white',
    marginBottom: vw(12)
  },
  recoverPassView: {
    borderStyle: 'solid',
    borderBottomColor: '#FFBA33',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    alignSelf: 'flex-start',
    marginLeft: vw(80)
  },
  terms: {
    fontSize: vw(24),
    lineHeight: vw(28.8),
    marginTop: vw(74),
    color: 'white',
    marginLeft: vw(80)
  },
  checkbox: {
    marginTop: vw(48),
    marginLeft: vw(80)
  },
  enterButton: {
    marginTop: vw(78),
    alignSelf: 'center'
  },
  text2: {
    marginTop: vw(78),
    alignSelf: 'center',
    color: 'white',
    fontSize: vw(24),
    lineHeight: vw(28.8)
  },
  createAccountButton: {
    alignSelf: 'center',
    fontSize: vw(22),
    lineHeight: vw(26.4),
    color: 'white',
    marginTop: vw(10)
  }
};

export default LoginForm;

import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';
import { MenuItem } from './MenuItem';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class Menu extends Component {
  state = { enabled: true};

  homeClicked() {
    if(Actions.currentScene !== 'home'){
      Actions.home();
    }
    this.props.callback();
  }

  profileClicked() {
    this.props.callback();
  }

  collectionClicked() {
    this.props.callback();
  }

  categoryClicked() {
    if(Actions.currentScene !== 'categories'){
      Actions.categories();
    }
    this.props.callback();
  }

  settingClicked() {
    this.props.callback();
  }
  
  render() {
    return (
      <View style={styles.menuView}>
        <LinearGradient colors={['#FBB03B', '#FE8A47', '#FF774D']} style={styles.linearGradientMenu} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
          <Image source={require('./../../assets/imgs/elenaRojas.png')} style={styles.photo}/>
          <Text style={styles.username}>Elena Rojas</Text>
          <Text style={styles.email}>elerom12@gmail.com</Text>
          <View style={styles.items}>
            <MenuItem type={'home'} title={'Inicio'} onClick={this.homeClicked.bind(this)}/>
            {/*<MenuItem type={'profile'} title={'Mi perfil'} onClick={this.profileClicked.bind(this)}/>
            <MenuItem type={'collection'} title={'Colecciones'} onClick={this.collectionClicked.bind(this)}/>*/}
            <MenuItem type={'category'} title={'Categorías'} onClick={this.categoryClicked.bind(this)}/>
            {/*<MenuItem type={'setting'} title={'Ajustes'} onClick={this.settingClicked.bind(this)}/>*/}
          </View>
          <TouchableWithoutFeedback onPress={() => console.log('logout')}>
            <View style={styles.logout}>
              <Text style={styles.logoutText}>Salir de la cuenta</Text>
              <Image style={styles.arrow} source={require('./../../assets/imgs/menu-arrow.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.callback()}>
            <View style={styles.closeButtonView}>
              <Image source={require('./../../assets/imgs/close.png')} style={styles.closeButton}/>
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </View>
    );
  }
}

const styles = {
  menuView: {
    height: vh(100),
    elevation: 3,
    position: 'absolute',
    top: 0
  },
  linearGradientMenu: {
    height: '100%',
    width: vw(640)
  },
  photo: {
    width: vw(100),
    height: vw(100),
    borderRadius: (Platform.OS) ? vw(50) : vw(90),
    position: 'absolute',
    top: vw(40),
    left: vw(40)
  },
  items: {
    height: vw(210),
    marginTop: vw(80)
  },
  username: {
    marginTop: vw(205),
    fontSize: vw(25),
    lineHeight: vw(30),
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    color: 'white',
    marginLeft: vw(45)
  },
  email: {
    marginTop: vw(15),
    fontSize: vw(25),
    lineHeight: vw(30),
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    color: 'white',
    marginLeft: vw(45)
  },
  logout: {
    flex: 1,
    flexDirection: 'row',
    marginTop: vw(400)
  },
  logoutText: {
    fontSize: vw(22),
    lineHeight: vw(26.4),
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    color: 'white',
    marginLeft: vw(45),
    width: vw(522)
  },
  arrow: {
    width: vw(20),
    height: vw(18.5),
    marginRight: vw(42)
  },
  closeButton: {
    width: vw(53),
    height: vw(53),
  },
  closeButtonView: {
    position: 'absolute',
    top: vw(46),
    right: vw(46)
  }
};

export { Menu };

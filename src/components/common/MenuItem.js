import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Image, Text } from 'react-native';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class MenuItem extends Component {
  state = { enabled: true};

  icon = this.props.type == 'home' ? require('./../../assets/imgs/menu-home-icon.png') :
         this.props.type == 'profile' ? require('./../../assets/imgs/menu-profile-icon.png') :
         this.props.type == 'collection' ? require('./../../assets/imgs/menu-collection-icon.png') :
         this.props.type == 'category' ? require('./../../assets/imgs/menu-category-icon.png') :
         require('./../../assets/imgs/menu-setting-icon.png');

  menuItemClicked() {
    this.state.enabled ? this.setState({enabled: false}) : this.setState({enabled: true});
    this.props.onClick(!this.state.enabled);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.menuItemClicked()}>
        <View style={styles.item}>
          <Image source={this.icon} style={styles.icon}/>
          <Text style={styles.title}>{this.props.title}</Text>
          <Image style={styles.arrow} source={require('./../../assets/imgs/menu-arrow.png')} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  item: {
    flex: 1,
    flexDirection: 'row',
    marginTop: vw(30),
    marginBottom: vw(30)
  },
  icon: {
    width: vw(23),
    height: vw(23), 
    marginLeft: vw(45),
    marginRight: vw(60)
  },
  title: {
    fontSize: vw(25),
    lineHeight: vw(30),
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    color: 'white',
    width: vw(381),
    marginRight: vw(60)
  },
  arrow: {
    width: vw(20),
    height: vw(18.5),
    marginRight: vw(42)
  }
};

export { MenuItem };

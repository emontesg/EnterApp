import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import { SaveButton } from './SaveButton';
import * as Constants from './Constants';
import LinearGradient from 'react-native-linear-gradient';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class HighlightedNewsItem extends Component {
  state = { enabled: true};  

  icon = Constants.NEWS_COLOR_BACKGROUND_ICON;

  color = ['#FBB03B', '#FF774D'];

  constructor(props) {
    super(props);
    this.updateData();
  }

  newsClicked() {
    this.props.data.clicked(this.props.data);
  }

  updateData() {
    this.icon = this.props.data.category == Constants.ENTERTAINMENT_NAME ? Constants.ENTERTAINMENT_COLOR_BACKGROUND_ICON :
         this.props.data.category == Constants.NEWS_NAME ? Constants.NEWS_COLOR_BACKGROUND_ICON :
         this.props.data.category == Constants.LIFE_NAME ? Constants.LIFE_COLOR_BACKGROUND_ICON :
         this.props.data.category == Constants.SPORT_NAME ? Constants.SPORT_COLOR_BACKGROUND_ICON :
         this.props.data.category == Constants.TECHNOLOGY_NAME ? Constants.TECHNOLOGY_COLOR_BACKGROUND_ICON :
         this.props.data.category == Constants.ECONOMY_NAME ? Constants.ECONOMY_COLOR_BACKGROUND_ICON :
         Constants.NEWS_COLOR_BACKGROUND_ICON;

    this.color = this.props.data.category == Constants.NEWS_NAME ? ['#FBB03B', '#FF774D'] :
            this.props.data.category == Constants.SPORT_NAME ? ['#22B573', '#9DD750', '#FFFF00'] :
            this.props.data.category == Constants.LIFE_NAME ? ['#FFBA33', '#FFE800'] :
            this.props.data.category == Constants.ENTERTAINMENT_NAME ? ['#FB5258', '#D4145A'] :
            this.props.data.category == Constants.TECHNOLOGY_NAME ? ['#37C3D3', '#12ECBF'] :
            this.props.data.category == Constants.ECONOMY_NAME ? ['#0068E1', '#3DA6F4'] :
            ['#FBB03B', '#FF774D'];
  }

  componentWillUpdate(nextProps, nextState) {
    this.updateData();
  }

  renderColor() {
    switch(this.props.data.category) {
      case Constants.ENTERTAINMENT_NAME:
        return (<View style={styles.entertainmentColor}></View>);
      case Constants.NEWS_NAME:
        return (<View style={styles.newsColor}></View>);
      case Constants.LIFE_NAME:
        return (<View style={styles.lifeColor}></View>);
      case Constants.SPORT_NAME:
        return (<View style={styles.sportColor}></View>);
      case Constants.TECHNOLOGY_NAME:
        return (<View style={styles.technologyColor}></View>);
      case Constants.ECONOMY_NAME:
        return (<View style={styles.economyColor}></View>);
    }
  }

  renderSubcategory() {
    switch(this.props.data.category) {
      case Constants.ENTERTAINMENT_NAME:
        return (<Text style={styles.subcategory, styles.entertainment}>{this.props.data.subcategory}</Text>);
      case Constants.NEWS_NAME:
        return (<Text style={styles.subcategory, styles.news}>{this.props.data.subcategory}</Text>);
      case Constants.LIFE_NAME:
        return (<Text style={styles.subcategory, styles.life}>{this.props.data.subcategory}</Text>);
      case Constants.SPORT_NAME:
        return (<Text style={styles.subcategory, styles.sport}>{this.props.data.subcategory}</Text>);
      case Constants.TECHNOLOGY_NAME:
        return (<Text style={styles.subcategory, styles.technology}>{this.props.data.subcategory}</Text>);
      case Constants.ECONOMY_NAME:
        return (<Text style={styles.subcategory, styles.economy}>{this.props.data.subcategory}</Text>);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.newsClicked()}>
          <View style={styles.newsContainer}>
            <LinearGradient colors={this.color} style={styles.colorBackground} start={{x: 0, y: 0}} end={{x: 1, y:0}}></LinearGradient>
            <Image source={{uri:this.props.data.cover}} style={styles.image}/>
            <Image source={this.icon} style={styles.icon}/>
            <View style={styles.timeSubContainer}>
              <Text style={styles.time}>{this.props.data.time}</Text>
              {this.renderSubcategory()}
            </View>
            <Text style={styles.title}>{this.props.data.title}</Text>
            <Text style={styles.subtitle}>{this.props.data.abstract}</Text>
          </View>
        </TouchableWithoutFeedback>
        <SaveButton checked={this.props.data.saved} style={styles.saveButton} />
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    marginRight: vw(20)
  },
  newsContainer: {
    backgroundColor: 'white',
    minHeight: (Platform.OS === 'ios') ? vw(810) : vw(760),
    maxHeight: (Platform.OS === 'ios') ? vw(810) : vw(760),
    width: vw(560),
  },
  colorBackground: {
    width: (Platform.OS === 'ios') ? vw(560) : vw(570),
    height: (Platform.OS === 'ios') ? vw(430) :vw(425)
  },
  image: {
    width: (Platform.OS === 'ios') ? vw(560) : vw(570),
    height: (Platform.OS === 'ios') ? vw(430) : vw(425),
    position: 'absolute'
  },
  icon: {
    width: vw(65),
    height: vw(65),
    position: 'absolute',
    top: vw(32),
    left: vw(32)
  },
  timeSubContainer: {
    flexDirection: 'row',
    marginBottom: vw(30),
    marginTop: vw(20),
    marginLeft: vw(32),
    marginRight: vw(32)
  },
  time: {
    color: '#B3B3B3',
    fontSize: vw(24),
    lineHeight: vw(28.8),
    fontFamily: 'GothamRounded-Medium',
    backgroundColor: 'transparent',
    marginRight: vw(15),
    marginTop: (Platform.OS === 'ios') ? 0 : vw(5)
  },
  subcategory: {
    fontSize: vw(24),
    lineHeight: vw(28.8),
    backgroundColor: 'transparent',
    fontFamily: 'GothamRounded-Bold'
  },
  entertainment: {
    color: Constants.ENTERTAINMENT_COLOR
  },
  news: {
    color: Constants.NEWS_COLOR
  },
  life: {
    color: Constants.LIFE_COLOR
  },
  sport: {
    color: Constants.SPORT_COLOR
  },
  technology: {
    color: Constants.TECHNOLOGY_COLOR
  },
  economy: {
    color: Constants.ECONOMY_COLOR
  },
  title: {
    color: '#333',
    fontSize: vw(40),
    lineHeight: (Platform.OS === 'ios') ? 0 : vw(48),
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    marginLeft: vw(32),
    marginRight: vw(32),
    marginBottom: (Platform.OS === 'ios') ? vw(25) : vw(18),
    height: (Platform.OS === 'ios') ? vw(135) : vw(128)
  },
  subtitle: {
    color: '#666',
    fontSize: vw(26),
    lineHeight: vw(31.2),
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    marginLeft: vw(32),
    marginRight: vw(32),
    maxHeight: (Platform.OS === 'ios') ? vw(67) : vw(61),
    marginBottom: vw(50)
  },
  saveButton: {
    position: 'absolute',
    left: vw(496),
    top: vw(450),
    elevation: 2
  },
  entertainmentColor: {
    backgroundColor: Constants.ENTERTAINMENT_COLOR,
    width: vw(8),
    height: vw(266),
    position: 'absolute'
  },
  newsColor: {
    backgroundColor: Constants.NEWS_COLOR,
    width: vw(8),
    height: vw(266),
    position: 'absolute'
  },
  lifeColor: {
    backgroundColor: Constants.LIFE_COLOR,
    width: vw(8),
    height: vw(266),
    position: 'absolute'
  },
  sportColor: {
    backgroundColor: Constants.SPORT_COLOR,
    width: vw(8),
    height: vw(266),
    position: 'absolute'
  },
  technologyColor: {
    backgroundColor: Constants.TECHNOLOGY_COLOR,
    width: vw(8),
    height: vw(266),
    position: 'absolute'
  },
  economyColor: {
    backgroundColor: Constants.ECONOMY_COLOR,
    width: vw(8),
    height: vw(266),
    position: 'absolute'
  }
};

export { HighlightedNewsItem };

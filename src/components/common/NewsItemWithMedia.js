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

class NewsItemWithMedia extends Component {
  state = { enabled: true};

  color = this.props.category == Constants.NEWS_NAME ? ['#FBB03B', '#FF774D'] :
          this.props.category == Constants.SPORT_NAME ? ['#22B573', '#9DD750', '#FFFF00'] :
          this.props.category == Constants.LIFE_NAME ? ['#FFBA33', '#FFE800'] :
          this.props.category == Constants.ENTERTAINMENT_NAME ? ['#FB5258', '#D4145A'] :
          this.props.category == Constants.TECHNOLOGY_NAME ? ['#37C3D3', '#12ECBF'] :
          this.props.category == Constants.ECONOMY_NAME ? ['#0068E1', '#3DA6F4'] :
          ['white', 'white'];

  bannerIcon = this.props.category == Constants.NEWS_NAME ? require('./../../assets/imgs/news-icon.png') :
          this.props.category == Constants.SPORT_NAME ? require('./../../assets/imgs/sport-icon.png') :
          this.props.category == Constants.LIFE_NAME ? require('./../../assets/imgs/life-icon.png') :
          this.props.category == Constants.ENTERTAINMENT_NAME ? require('./../../assets/imgs/entertainment-icon.png') :
          this.props.category == Constants.TECHNOLOGY_NAME ? require('./../../assets/imgs/technology-icon.png') :
          this.props.category == Constants.ECONOMY_NAME ? require('./../../assets/imgs/economy-icon.png') :
          null;

  newsClicked() {
    this.props.clicked(this.props);
  }

  renderColor() {
    switch(this.props.category) {
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
    switch(this.props.category) {
      case Constants.ENTERTAINMENT_NAME:
        return (<Text style={styles.subcategory, styles.entertainment}>{this.props.subcategory}</Text>);
      case Constants.NEWS_NAME:
        return (<Text style={styles.subcategory, styles.news}>{this.props.subcategory}</Text>);
      case Constants.LIFE_NAME:
        return (<Text style={styles.subcategory, styles.life}>{this.props.subcategory}</Text>);
      case Constants.SPORT_NAME:
        return (<Text style={styles.subcategory, styles.sport}>{this.props.subcategory}</Text>);
      case Constants.TECHNOLOGY_NAME:
        return (<Text style={styles.subcategory, styles.technology}>{this.props.subcategory}</Text>);
      case Constants.ECONOMY_NAME:
        return (<Text style={styles.subcategory, styles.economy}>{this.props.subcategory}</Text>);
    }
  }

  renderMedia() {
    if(this.props.video !== undefined) {
      return(
        <View style={styles.mediaContainer}>
          <LinearGradient colors={this.color} style={styles.colorBackground} start={{x: 0, y: 0}} end={{x: 1, y:0}}></LinearGradient>
          <Image source={{uri:this.props.preview}} style={styles.image}/>
          <Image source={require('./../../assets/imgs/video-icon.png')} style={styles.videoIcon}/>
        </View>
      )
    } else if(this.props.preview !== undefined) {
      return(
        <View style={styles.mediaContainer}>
         <LinearGradient colors={this.color} style={styles.colorBackground} start={{x: 0, y: 0}} end={{x: 1, y:0}}></LinearGradient>
         <Image source={{uri:this.props.preview}} style={styles.image}/>
        </View>
      )
    } else {
      return (
        <LinearGradient colors={this.color} style={styles.banner} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
          <Image source={this.bannerIcon} style={styles.bannerIcon}/>
        </LinearGradient>);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.newsClicked()}>
          <View style={styles.border}>
            {this.renderMedia()}
            <View style={styles.newsContainer}>
              <View style={styles.timeSubContainer}>
                <Text style={styles.time}>{this.props.time}</Text>
                {this.renderSubcategory()}
              </View>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <SaveButton checked={this.props.saved} style={styles.saveButton} />
        {this.renderColor()}
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: vw(8),
    marginBottom: vw(8),
    position: 'relative'
  },
  border: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    paddingTop: vw(43),
    paddingBottom: vw(43),
    paddingLeft: vw(42),
    paddingRight: vw(36),
    minHeight: vw(474),
    maxHeight: vw(474)
  },
  newsContainer: {
    paddingTop: vw(43),
  },
  mediaContainer: {
    width: '100%',
    height: vw(154),
    overflow: 'hidden'
  },
  colorBackground: {
    width: '100%',
    height: '100%'
  },
  videoIcon: {
    width: vw(60),
    height: vw(60),
    position: 'absolute',
    left: vw(254),
    top: vw(48)
  },
  image: {
    width: vw(570),
    height: vw(154),
    position: 'absolute'
  },
  banner: {
    width: '100%',
    height: vw(154)
  },
  bannerIcon: {
    width: vw(88),
    height: vw(83),
    marginTop: vw(32),
    alignSelf: 'center'
  },
  timeSubContainer: {
    flexDirection: 'row',
    marginBottom: vw(40)
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
    fontSize: vw(34),
    lineHeight: (Platform.OS === 'ios') ? 0 : vw(43.2),
    backgroundColor: 'transparent',
    fontFamily: 'GothamRounded-Bold',
    height: vw(114)
  },
  saveButton: {
    position: 'absolute',
    left: vw(540),
    top: vw(246),
    elevation: 3
  },
  entertainmentColor: {
    backgroundColor: Constants.ENTERTAINMENT_COLOR,
    width: vw(8),
    height: (Platform.OS === 'ios') ? vw(390) : vw(376),
    position: 'absolute',
    top: vw(43),
    elevation: 3
  },
  newsColor: {
    backgroundColor: Constants.NEWS_COLOR,
    width: vw(8),
    height: (Platform.OS === 'ios') ? vw(390) : vw(376),
    position: 'absolute',
    top: vw(43),
    elevation: 3
  },
  lifeColor: {
    backgroundColor: Constants.LIFE_COLOR,
    width: vw(8),
    height: (Platform.OS === 'ios') ? vw(390) : vw(376),
    position: 'absolute',
    top: vw(43),
    elevation: 3
  },
  sportColor: {
    backgroundColor: Constants.SPORT_COLOR,
    width: vw(8),
    height: (Platform.OS === 'ios') ? vw(390) : vw(376),
    position: 'absolute',
    top: vw(43),
    elevation: 3
  },
  technologyColor: {
    backgroundColor: Constants.TECHNOLOGY_COLOR,
    width: vw(8),
    height: (Platform.OS === 'ios') ? vw(390) : vw(376),
    position: 'absolute',
    top: vw(43),
    elevation: 3
  },
  economyColor: {
    backgroundColor: Constants.ECONOMY_COLOR,
    width: vw(8),
    height: (Platform.OS === 'ios') ? vw(390) : vw(376),
    position: 'absolute',
    top: vw(43),
    elevation: 3
  }
};

export { NewsItemWithMedia };

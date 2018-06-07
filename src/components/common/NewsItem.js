import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { SaveButton } from './SaveButton';
import * as Constants from './Constants';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class NewsItem extends Component {
  state = { enabled: true};

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

  render() {
    return (
      <View style={styles.container}>
        {this.renderColor()}
        <TouchableWithoutFeedback onPress={() => this.newsClicked()}>
          <View style={styles.newsContainer}>
            <View style={styles.timeSubContainer}>
              <Text style={styles.time}>{this.props.time}</Text>
              {this.renderSubcategory()}
            </View>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <SaveButton checked={this.props.saved} style={styles.saveButton} />
      </View>
    );
  }
}

const styles = {
  container: {
    paddingLeft: vw(30),
    paddingRight: vw(36),
    marginTop: vw(8),
    marginBottom: vw(8),
    position: 'relative'
  },
  newsContainer: {
    backgroundColor: 'white',
    paddingTop: vw(43),
    paddingBottom: vw(43),
    paddingLeft: vw(42),
    paddingRight: vw(36),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 2,
    minHeight: vw(266),
    maxHeight: vw(266)
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
    top: vw(40),
    elevation: 3
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

export { NewsItem };

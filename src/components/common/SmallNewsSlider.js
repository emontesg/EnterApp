import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import * as Constants from './Constants';
import LinearGradient from 'react-native-linear-gradient';
import { SaveButton } from './SaveButton';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class SmallNewsSlider extends Component {
  state = {
    slider1ActiveSlide: 0,
  }

  color = this.props.category == Constants.NEWS_NAME ? ['#FBB03B', '#FF774D'] :
          this.props.category == Constants.SPORT_NAME ? ['#22B573', '#9DD750', '#FFFF00'] :
          this.props.category == Constants.LIFE_NAME ? ['#FFBA33', '#FFE800'] :
          this.props.category == Constants.ENTERTAINMENT_NAME ? ['#FB5258', '#D4145A'] :
          this.props.category == Constants.TECHNOLOGY_NAME ? ['#37C3D3', '#12ECBF'] :
          this.props.category == Constants.ECONOMY_NAME ? ['#0068E1', '#3DA6F4'] :
          ['white', 'white'];

  newsClicked(data) {
    data.clicked(data);
  }

  renderSubcategory(subcategory) {
    switch(this.props.category) {
      case Constants.ENTERTAINMENT_NAME:
        return (<Text style={styles.subcategory, styles.entertainment}>{subcategory}</Text>);
      case Constants.NEWS_NAME:
        return (<Text style={styles.subcategory, styles.news}>{subcategory}</Text>);
      case Constants.LIFE_NAME:
        return (<Text style={styles.subcategory, styles.life}>{subcategory}</Text>);
      case Constants.SPORT_NAME:
        return (<Text style={styles.subcategory, styles.sport}>{subcategory}</Text>);
      case Constants.TECHNOLOGY_NAME:
        return (<Text style={styles.subcategory, styles.technology}>{subcategory}</Text>);
      case Constants.ECONOMY_NAME:
        return (<Text style={styles.subcategory, styles.economy}>{subcategory}</Text>);
    }
  }

  renderNews({item, index}) {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => this.newsClicked(item)}>
          <View style={styles.newsContainer}>
            <View style={styles.timeSubContainer}>
              <Text style={styles.time}>{item.time}</Text>
              {this.renderSubcategory(item.subcategory)}
            </View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <SaveButton checked={this.props.saved} style={styles.saveButton} />
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={this.color} style={styles.linearGradient} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
        <Text style={styles.sliderTitle}>SIMILARES</Text>
        <Carousel
            data={this.props.data}
            renderItem={this.renderNews.bind(this)}
            sliderWidth={vw(640)}
            itemWidth={vw(580)}
            hasParallaxImages={false}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.8}
            apparitionDelay={0}
            enableMomentum={false}
            activeSlideAlignment={'start'}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
        <Pagination
            dotsLength={this.props.data.length}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
        {/*<View style={styles.newsContainer}>
                  <View style={styles.timeSubContainer}>
                    <Text style={styles.time}>30 M</Text>
                    {this.renderSubcategory('Nacionales')}
                  </View>
                  <Text style={styles.title}>Semillas de maracuyá: remedio contra las manchas.</Text>
                </View>*/}
      </LinearGradient>
    );
  }
}

const styles = {
  linearGradient: {
    height: vw(510)
  },
  sliderTitle: {
    color: 'white',
    fontSize: vw(28),
    lineHeight: vw(33.6),
    fontFamily: 'Soft Core',
    backgroundColor: 'transparent',
    marginTop: vw(46),
    marginBottom: vw(46),
    marginLeft: vw(40)
  },
  newsContainer: {
    backgroundColor: 'white',
    paddingTop: vw(43),
    paddingBottom: vw(43),
    paddingLeft: vw(40),
    paddingRight: vw(36),
    minHeight: vw(266),
    maxHeight: vw(266),
    width: vw(570),
    marginRight: vw(10)
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
    fontSize: vw(36),
    lineHeight: (Platform.OS === 'ios') ? 0 : vw(43.2),
    backgroundColor: 'transparent',
    fontFamily: 'GothamRounded-Bold',
    height: vw(114)
  },
  saveButton: {
    position: 'absolute',
    left: vw(504),
    top: vw(40),
    elevation: 3
  },
  paginationContainer: {
    paddingVertical: vw(50)
  },
  paginationDot: {
      width: vw(16),
      height: vw(16),
      borderRadius: vw(8),
      marginHorizontal: vw(10),
      backgroundColor: 'rgba(255, 255, 255, 0.92)'
  },
};

export { SmallNewsSlider };

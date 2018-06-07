import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import * as Constants from './Constants';
import LinearGradient from 'react-native-linear-gradient';

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

class PhotoGallery extends Component {
  state = {
    slider1ActiveSlide: 0,
  }

  color = this.props.category == Constants.NEWS_NAME ? ['#FBB03B', '#FF774D'] :
          this.props.category == Constants.ENTERTAINMENT_NAME ? ['#FB5258', '#D4145A'] :
          this.props.category == Constants.LIFE_NAME ? ['#FFE800', '#FFBA33'] :
          this.props.category == Constants.SPORT_NAME ? ['#FFFF00', '#9DD750', '#22B573'] :
          this.props.category == Constants.TECHNOLOGY_NAME ? ['#37C3D3', '#12ECBF'] :
          this.props.category == Constants.ECONOMY_NAME ? ['#0068E1', '#3DA6F4'] :
          ['#FBB03B', '#FF774D'];

  rgbcolor = this.props.category == Constants.NEWS_NAME ? ['rgba(251, 176, 59, 0)', 'rgba(251, 176, 59, 0)', 'rgba(254, 138, 71, 0.2)', '#FF774D'] :
             this.props.category == Constants.ENTERTAINMENT_NAME ? ['rgba(251, 82, 88, 0)', 'rgba(251, 82, 88, 0)', 'rgba(212, 20, 90, 0.2)', '#D4145A'] :
             this.props.category == Constants.LIFE_NAME ? ['rgba(255, 232, 0, 0)', 'rgba(255, 232, 0, 0)', 'rgba(255, 186, 51, 0.2)', '#FFBA33'] :
             this.props.category == Constants.SPORT_NAME ? ['rgba(157, 215, 80, 0)', 'rgba(157, 215, 80, 0.2)', 'rgba(34, 181, 115, 0)', '#22B573'] :
             this.props.category == Constants.TECHNOLOGY_NAME ? ['rgba(55, 195, 211, 0)', 'rgba(55, 195, 211, 0)', 'rgba(18, 236, 191, 0.2)', '#12ECBF'] :
             this.props.category == Constants.ECONOMY_NAME ? ['rgba(0, 104, 225, 0)', 'rgba(0, 104, 225, 0)', 'rgba(61, 166, 244, 0.2)', '#3DA6F4'] :
             ['rgba(251, 176, 59, 0)', 'rgba(251, 176, 59, 0)', 'rgba(254, 138, 71, 0.2)', '#FF774D'];

  renderPhoto({item, index}) {
    var url = 'https:' + item.fields.file.url;
    var originalWidth = item.fields.file.details.image.width;
    var originalHeight = item.fields.file.details.image.height;
    var split = item.fields.description.split(/[!\[*\]]/);
    var author = '';
    var description = '';
    for(var i = 0, l = split.length; i < l; i++) {
      if(split[i] == 'autor' && i+1 < l) {
        author = split[i+1];
      } else if(split[i] == 'descripcion' && i+1 < l) {
        description = split[i + 1]
      }
    }

    if(originalHeight > originalWidth)
    {
      // var height = 1068;
      var width = 640;
      var ratios = originalHeight / originalWidth;
      // var width = height / ratios;
      var height = width * ratios;
      if(height > 1068)
        height = 1068;
      return (
        <View style={styles.slideContainer}>
          <Image source={{uri: url}} style={{width: vw(width), height: vw(height)}}/>
          <LinearGradient colors={this.rgbcolor} style={styles.linearGradient2}>
          </LinearGradient>
          <View style={styles.caption}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      );
    }
    else
    {
      var width = 640;
      var ratios = originalWidth / originalHeight;
      var height = width / ratios;
      return (
        <LinearGradient colors={this.color} style={styles.linearGradient}>
          <View style={styles.slideContainer}>
            <Image source={{uri: url}} style={{width: vw(width), height: vw(height)}}/>
            <View style={styles.caption}>
              <Text style={styles.author}>{author}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </LinearGradient>
      );
    }
  }

  render() {
    return (
      <View style={styles.galleryContainer}>
        <Carousel
            data={this.props.data}
            renderItem={this.renderPhoto.bind(this)}
            sliderWidth={vw(640)}
            itemWidth={vw(640)}
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
      </View>
    );
  }
}

const styles = {
  galleryContainer: {
    height: vh(91.2),
    width: vw(640),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white'
  },
  linearGradient: {
    height: vh(91.2),
    width: vw(640),
  },
  slideContainer:
  {
    height: vh(91.2),
    width: vw(640),
    position: 'relative',
    justifyContent: 'center'
  },
  caption: {
    marginRight: vw(32),
    marginLeft: vw(32),
    position: 'absolute',
    bottom: vw(70)
  },
  author: {
    fontSize: vw(26),
    lineHeight: vw(31.2),
    color: 'white',
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    marginBottom: vw(30)
  },
  description: {
    fontSize: vw(26),
    lineHeight: vw(31.2),
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'FranklinGothicFS-Demi'
  },
  linearGradient2: {
    height: vh(91.2),
    width: vw(640),
    position: 'absolute',
    top: 0,
    left: 0
  },
};

export { PhotoGallery };

import React, { Component } from 'react';
import { View, Dimensions, Image, Text, ScrollView, TouchableWithoutFeedback, Share, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import * as Constants from './common/Constants';
import { Quote, SmallNewsSlider, PhotoGallery } from './common';
import EnterServices from './../EnterServices';
import VideoPlayer from 'react-native-video-controls';
import VideoPlayer2 from 'react-native-video-player';

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class News extends Component {
  color = ['white', 'white'];
  whiteIcon = undefined;
  colorIcon = undefined;

  constructor(props) {
    super(props);
    this.service = new EnterServices();
    if(this.props.data !== undefined) {
      this.state = this.props.data;
      this.initialize();
    } else {
      console.log(this.props.id);
      this.state = this.createEmptyNews();
      this.service.getNoticiaById(this.props.id, this.getNewsCallback.bind(this));
    }
  }

  createEmptyNews() {
    return({
      id: '',
      title: '',
      abstract: '',
      category: 'noticia',
      categoryId: 0,
      subcategory: '',
      image: undefined,
      saved: false,
      time: '',
      clicked: null,
      content: '',
      preview: undefined,
      cover: undefined,
      video: undefined,
      author: '',
      images: [],
      quote: undefined,
      similar: []
    });
  }

  initialize() {

    this.service.getNoticiasSimilares(this.state.categoryId, 4, this.getSimilarCallback.bind(this));

    this.color = this.state.category == Constants.NEWS_NAME ? ['#FBB03B', '#FF774D'] :
          this.state.category == Constants.SPORT_NAME ? ['#22B573', '#9DD750', '#FFFF00'] :
          this.state.category == Constants.LIFE_NAME ? ['#FFBA33', '#FFE800'] :
          this.state.category == Constants.ENTERTAINMENT_NAME ? ['#FB5258', '#D4145A'] :
          this.state.category == Constants.TECHNOLOGY_NAME ? ['#37C3D3', '#12ECBF'] :
          this.state.category == Constants.ECONOMY_NAME ? ['#0068E1', '#3DA6F4'] :
          ['white', 'white'];

    this.whiteIcon = this.state.category == Constants.NEWS_NAME ? Constants.NEWS_WHITE_BACKGROUND_ICON :
          this.state.category == Constants.SPORT_NAME ? Constants.SPORT_WHITE_BACKGROUND_ICON :
          this.state.category == Constants.LIFE_NAME ? Constants.LIFE_WHITE_BACKGROUND_ICON :
          this.state.category == Constants.ENTERTAINMENT_NAME ? Constants.ENTERTAINMENT_WHITE_BACKGROUND_ICON :
          this.state.category == Constants.TECHNOLOGY_NAME ? Constants.TECHNOLOGY_WHITE_BACKGROUND_ICON :
          this.state.category == Constants.ECONOMY_NAME ? Constants.ECONOMY_WHITE_BACKGROUND_ICON :
          Constants.NEWS_WHITE_BACKGROUND_ICON;

    this.colorIcon = this.state.category == Constants.NEWS_NAME ? Constants.NEWS_COLOR_BACKGROUND_ICON :
          this.state.category == Constants.SPORT_NAME ? Constants.SPORT_COLOR_BACKGROUND_ICON :
          this.state.category == Constants.LIFE_NAME ? Constants.LIFE_COLOR_BACKGROUND_ICON :
          this.state.category == Constants.ENTERTAINMENT_NAME ? Constants.ENTERTAINMENT_COLOR_BACKGROUND_ICON :
          this.state.category == Constants.TECHNOLOGY_NAME ? Constants.TECHNOLOGY_COLOR_BACKGROUND_ICON :
          this.state.category == Constants.ECONOMY_NAME ? Constants.ECONOMY_COLOR_BACKGROUND_ICON :
          Constants.NEWS_WHITE_BACKGROUND_ICON;
  }

  componentDidMount() {

  }

  getNewsCallback(data) {
    var itemFields = data.fields;
    var category = this.getCategory(itemFields.subcategoria.fields.categoria.sys.id);
    var date = this.getDate(data.sys.createdAt);
    var props = {
        id: data.sys.id,
        category: category,
        time: date,
        subcategory: itemFields.subcategoria.fields.nombre,
        categoryId: itemFields.subcategoria.fields.categoria.sys.id,
        title: itemFields.titulo,
        saved: false,
        clicked: this.similarClicked.bind(this),
        content: itemFields.contenido,
        preview: itemFields.preview == undefined ? undefined : 'https:' + itemFields.preview.fields.file.url,
        cover: itemFields.portada == undefined ? undefined : 'https:' + itemFields.portada.fields.file.url,
        video: itemFields.video == undefined ? undefined : 'https:' + itemFields.video.fields.file.url,
        author: itemFields.autor,
        images: itemFields.imagenes,
        quote: itemFields.frase,
        similar: []
      };

    this.setState(props);
    this.initialize();
  }

  getSimilarCallback(data) {
    var similarItems = [];
    var length = data.length;

    for(var i = 0; i < length; i++)
    {
      if(data[i].sys.id !== this.state.id) {
        var itemFields = data[i].fields;
        var category = this.getCategory(itemFields.subcategoria.fields.categoria.sys.id);
        var date = this.getDate(data[i].sys.createdAt);
        var props = {
            id: data[i].sys.id,
            category: category,
            time: date,
            subcategory: itemFields.subcategoria.fields.nombre,
            categoryId: itemFields.subcategoria.fields.categoria.sys.id,
            title: itemFields.titulo,
            saved: false,
            clicked: this.similarClicked.bind(this),
            content: itemFields.contenido,
            preview: itemFields.preview == undefined ? undefined : 'https:' + itemFields.preview.fields.file.url,
            cover: itemFields.portada == undefined ? undefined : 'https:' + itemFields.portada.fields.file.url,
            video: itemFields.video == undefined ? undefined : 'https:' + itemFields.video.fields.file.url,
            author: itemFields.autor,
            images: itemFields.imagenes,
            quote: itemFields.frase,
            similar: [],
            key: i
          };

        similarItems.push(props);

        if(similarItems.length == 3)
          break;
      }
    }

    this.setState({similar: similarItems});
  }

  getCategory(id) {
    var category = id === Constants.NEWS_ID ? Constants.NEWS_NAME :
                   id === Constants.TECHNOLOGY_ID ? Constants.TECHNOLOGY_NAME :
                   id === Constants.ENTERTAINMENT_ID ? Constants.ENTERTAINMENT_NAME :
                   id === Constants.LIFE_ID ? Constants.LIFE_NAME :
                   id === Constants.SPORT_ID ? Constants.SPORT_NAME :
                   id === Constants.ECONOMY_ID ? Constants.ECONOMY_NAME :
                   Constants.NEWS_NAME;

    return category;
  }

  getDate(string) {
    var d = new Date(string);
    var dateString = '';
    var now = new Date();
    var diff = Math.abs(d - now) / 36e5;

    if(diff > 48) {
      return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    } else if(diff > 24) {
      return 'ayer';
    } else if(diff > 12) {
      if(d.getDate() === now.getDate())
        return 'hoy';
      else
        return 'ayer';
    } else if(diff > 1) {
      return Math.floor(diff) + ' H';
    } else {
      return Math.floor(diff * 60) + ' M';
    }
  }

  similarClicked(data) {
    Actions.refresh({data: data});
    this.setState(data)
    this.initialize();
    this.refs.scroll.scrollTo({x: 0, y: 0, animated: true});
  }

  closeClicked() {
    if(this.state.showGallery) {
      this.setState({showGallery: false});
    } else {
      Actions.pop();
    }

  }

  shareClicked() {
    var content = {
      message: 'http://www.koko.cr/proyectos/enter/noticia/' + this.state.id,
      title: this.state.title
    };
    Share.share(content).catch((err) => { err && console.log(err); })
  }

  renderContent() {
    var split = this.state.content.split('\n');

    var contents = [];

    for(var i = 0, l = split.length; i < l; i++) {
      if(split[i] !== '') {
        var frase = split[i].match(/\[frase\]/g);
        if(frase === null)
        {
          var image = split[i].match(/\!\[*\]*/g);
          if(image === null) {
            var props = {
              style: styles.paragraph,
              key: i
            };
            contents.push(React.createElement(Text, props, split[i]));
          } else {
            var imageInfo = split[i].split(/[()]+/);
            var url = 'https:' + imageInfo[1];
            var title = imageInfo[0].split(/[!\[\]]/)[2];
            var autor = '';
            var descripcion = '';
            if(this.state.images !== undefined) {
              for(var j = 0, l2 = this.state.images.length; j < l2; j++) {
                if(this.state.images[j].fields.title == title) {
                  var temp = this.state.images[j].fields.description.split(/[\[\]]+/);
                  if(temp.length > 1) {
                    if(temp[1] == 'autor') {
                      autor = temp[2];
                    } else if(temp[1] == 'descripcion') {
                      descripcion = temp[2];
                    }

                    if(temp.length > 3) {
                      if(temp[3] == 'autor') {
                        autor = temp[4];
                      } else if(temp[3] == 'descripcion') {
                        descripcion = temp[4];
                      }
                    }
                  }
                }
              }
            }

            var imageArray = [];
            imageArray.push(React.createElement(Image, {style: styles.image, source: {uri:url}, key: 0}));
            if(autor !== '') {
              imageArray.push(React.createElement(Text, {style: styles.imageAuthor, key: 1}, autor));
            }
            if(descripcion !== '') {
              imageArray.push(React.createElement(Text, {style: styles.imageText, key: 2}, descripcion));
            }

            contents.push(React.createElement(View, {style: styles.imageContainer, key: i}, imageArray));
          }
        } else {
          if(this.state.quote !== undefined)
          {
            var props = {
              text: this.state.quote.fields.frase,
              style: styles.paragraph,
              author: this.state.quote.fields.autor,
              photo: this.state.quote.fields.foto === undefined ? undefined : 'https:' + this.state.quote.fields.foto.fields.file.url,
              key: i
            };
            contents.push(React.createElement(Quote, props));
          }
        }

      }
    }

    return(React.createElement(View, null, contents));
  }

  renderHeader2() {
    if(this.state.cover !== undefined) {
      return (
        <View>
          <Image source={{uri:this.state.cover}} style={styles.coverImage}/>
          <View style={styles.blackBackground}></View>
          <Image source={this.colorIcon} style={styles.icon}/>
          {
            this.state.images !== undefined && this.state.images.length > 1 ?
            <Image source={require('./../assets/imgs/images-indicator.png')} style={styles.indicator} />
            : null
          }
        </View>
      );
    } else {
      return(
        <View>
          <Image source={this.whiteIcon} style={styles.icon}/>
          {
            this.state.images !== undefined && this.state.images.length > 1 ?
            <Image source={require('./../assets/imgs/images-indicator.png')} style={styles.indicator} />
            : null
          }
        </View>
      );
    }
  }

  renderHeader() {
    if(this.state.images !== undefined && this.state.images.length > 1) {
      return (
        <TouchableWithoutFeedback onPress={() => this.setState({showGallery: true})}>
          <LinearGradient colors={this.color} style={styles.linearGradient}>
            {this.renderHeader2()}
            <View style={styles.headerText}>
              <Text style={styles.subcategory}>{this.state.subcategory}</Text>
              <Text style={styles.date}>{this.state.time}</Text>
              <Text style={styles.title}>{this.state.title}</Text>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <LinearGradient colors={this.color} style={styles.linearGradient}>
          {this.renderHeader2()}
          <View style={styles.headerText}>
            <Text style={styles.subcategory}>{this.state.subcategory}</Text>
            <Text style={styles.date}>{this.state.time}</Text>
            <Text style={styles.title}>{this.state.title}</Text>
          </View>
        </LinearGradient>
      );
    }
  }

  renderGallery() {
    if(this.state.showGallery !== undefined && this.state.showGallery) {
      // console.log(this.state.images);
      return(<PhotoGallery data={this.state.images} category={this.state.category}/>)
    }
  }

  renderVideo() {
    // console.log(this.state.video);
    if(this.state.video !== undefined) {
      return (
        <View style={styles.mediaContainer}>
          {/*<VideoPlayer style={styles.videoNews}
            source={{ uri: this.state.video }}
          />*/}
          <VideoPlayer2 video={{uri: this.state.video}} videoWidth={vw(640)} videoHeight={vw(362)} autoplay/>
        </View>);
    }
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.view} ref='scroll'>
          {this.renderHeader()}
          {this.renderVideo()}
          <View style={styles.newsContainer}>
            <Text style={styles.author}>{this.state.author}</Text>
            {this.renderContent()}
          </View>
          <SmallNewsSlider data={this.state.similar} category={this.state.category} title={'SIMILARES'}/>
        </ScrollView>
        {this.renderGallery()}
        <View style={styles.footer}>
          <TouchableWithoutFeedback onPress={() => this.closeClicked()}>
            <View style={styles.closeButtonView}><Image source={require('./../assets/imgs/news-close-button.png')} style={styles.closeButton}/></View>
          </TouchableWithoutFeedback>
          {/*<Image source={require('./../assets/imgs/news-save-button-gray.png')} style={styles.saveButton}/>*/}
          <TouchableWithoutFeedback onPress={() => this.shareClicked()}>
            <View style={styles.shareButtonView}><Image source={require('./../assets/imgs/news-share-button.png')} style={styles.shareButton}/></View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = {
  linearGradient: {
    height: vw(800),
    position: 'relative'
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: vw(800),
    width: vw(640)
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: vw(800),
    width: vw(640),
    backgroundColor: 'rgba(51,51,51,0.65)'
  },
  icon: {
    width: vw(65),
    height: vw(65),
    marginTop: vw(26),
    marginLeft: vw(35)
  },
  indicator: {
    width: vw(73.5),
    height: vw(10.5),
    position: 'absolute',
    top: vw(180),
    left: vw(275)
  },
  view: {
    width: vw(640),
    height: vh(91.2)
  },
  headerText: {
    position: 'absolute',
    bottom: vw(44),
    left: vw(35)
  },
  subcategory: {
    fontSize: vw(24),
    lineHeight: vw(28.8),
    color: 'white',
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    marginTop: vw(224)
  },
  date: {
    fontSize: vw(24),
    lineHeight: vw(28.8),
    color: 'white',
    fontFamily: 'GothamRounded-Medium',
    backgroundColor: 'transparent',
    marginTop: vw(34)
  },
  title: {
    fontSize: vw(65),
    lineHeight: (Platform.OS === 'ios') ? 0 : vw(78),
    color: 'white',
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    marginTop: vw(50),
    marginRight: vw(70)
  },
  newsContainer: {
    backgroundColor: 'white',
    paddingLeft: vw(35),
    paddingRight: vw(35),
    paddingBottom: vw(27)
  },
  author: {
    fontSize: vw(28),
    lineHeight: vw(33.6),
    fontFamily: 'FranklinGothicFS-BookIt',
    backgroundColor: 'transparent',
    color: '#999',
    marginTop: vw(58),
    marginBottom: vw(27)
  },
  paragraph:
  {
    fontSize: vw(30),
    lineHeight: vw(36),
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    color: '#666',
    marginTop: vw(27),
    marginBottom: vw(27)
  },
  imageContainer: {
    marginTop: vw(27),
    marginBottom: vw(27)
  },
  image: {
    width: vw(570),
    height: vw(250),
    marginBottom: vw(42)
  },
  imageAuthor: {
    fontSize: vw(26),
    lineHeight: vw(31.2),
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    color: '#B3B3B3',
    marginBottom: vw(34)
  },
  imageText: {
    fontSize: vw(26),
    lineHeight: vw(31.2),
    fontFamily: 'FranklinGothicFS-Demi',
    backgroundColor: 'transparent',
    color: '#B3B3B3'
  },
  footer: {
    height: vh(8.8),
    backgroundColor: 'white',
    position: 'relative'
  },
  closeButtonView: {
    position: 'absolute',
    left: vw(35),
    top: vw(32)
  },
  closeButton: {
    width: vw(32),
    height: vw(32),
  },
  saveButton: {
    width: vw(28),
    height: vw(39),
    position: 'absolute',
    left: vw(305),
    top: vw(30)
  },
  shareButton:{
    width: vw(43),
    height: vw(33)
  },
  shareButtonView: {
    position: 'absolute',
    right: (32),
    top: vw(34)
  },
  mediaContainer: {
    width: '100%',
    height: vw(370),

  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
};

export default News;

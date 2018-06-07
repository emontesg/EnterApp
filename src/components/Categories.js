import React, { Component } from 'react';
import { View, Dimensions, Image, Text, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { Menu, NewsItem, NewsItemWithMedia } from './common';
import * as Constants from './common/Constants';
import EnterServices from './../EnterServices';

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class Categories extends Component {
  color = {};
  categoriesText = {};
  whiteIcon = {};
  colorIcon = {};
  state = {};

  service = null;

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      showNews: false,
      selectedCategory: '',
      news: [],
      sport: [],
      technology: [],
      entertainment: [],
      life: [],
      economy: [],
      showItemsQuantity: 3
    };

    this.service = new EnterServices();
    this.service.getNoticiasSimilares(Constants.NEWS_ID, 100, this.getNewsCallback.bind(this));
    this.service.getNoticiasSimilares(Constants.TECHNOLOGY_ID, 100, this.getTechnologyCallback.bind(this));
    this.service.getNoticiasSimilares(Constants.ENTERTAINMENT_ID, 100, this.getEntertainmentCallback.bind(this));
    this.service.getNoticiasSimilares(Constants.LIFE_ID, 100, this.getLifeCallback.bind(this));
    this.service.getNoticiasSimilares(Constants.SPORT_ID, 100, this.getSportCallback.bind(this));
    this.service.getNoticiasSimilares(Constants.ECONOMY_ID, 100, this.getEconomyCallback.bind(this));

    this.categoriesText[Constants.NEWS_NAME] = 'Noticias';
    this.categoriesText[Constants.SPORT_NAME] = 'Deportes';
    this.categoriesText[Constants.LIFE_NAME] = 'Vida & Bienestar';
    this.categoriesText[Constants.TECHNOLOGY_NAME] = 'Tecnología';
    this.categoriesText[Constants.ECONOMY_NAME] = 'Economía';
    this.categoriesText[Constants.ENTERTAINMENT_NAME] = 'Entretenimiento';

    this.color[Constants.NEWS_NAME] = ['#FBB03B', '#FF774D'];
    this.color[Constants.SPORT_NAME] = ['#22B573', '#9DD750', '#FFFF00'];
    this.color[Constants.LIFE_NAME] = ['#FFBA33', '#FFE800'];
    this.color[Constants.TECHNOLOGY_NAME] = ['#37C3D3', '#12ECBF'];
    this.color[Constants.ECONOMY_NAME] = ['#0068E1', '#3DA6F4'];
    this.color[Constants.ENTERTAINMENT_NAME] = ['#FB5258', '#D4145A'];

    this.whiteIcon[Constants.NEWS_NAME] = Constants.NEWS_WHITE_BACKGROUND_ICON;
    this.whiteIcon[Constants.SPORT_NAME] = Constants.SPORT_WHITE_BACKGROUND_ICON;
    this.whiteIcon[Constants.LIFE_NAME] = Constants.LIFE_WHITE_BACKGROUND_ICON;
    this.whiteIcon[Constants.TECHNOLOGY_NAME] = Constants.TECHNOLOGY_WHITE_BACKGROUND_ICON;
    this.whiteIcon[Constants.ECONOMY_NAME] = Constants.ECONOMY_WHITE_BACKGROUND_ICON;
    this.whiteIcon[Constants.ENTERTAINMENT_NAME] = Constants.ENTERTAINMENT_WHITE_BACKGROUND_ICON;

    this.colorIcon[Constants.NEWS_NAME] = Constants.NEWS_COLOR_BACKGROUND_ICON;
    this.colorIcon[Constants.SPORT_NAME] = Constants.SPORT_COLOR_BACKGROUND_ICON;
    this.colorIcon[Constants.LIFE_NAME] = Constants.LIFE_COLOR_BACKGROUND_ICON;
    this.colorIcon[Constants.TECHNOLOGY_NAME] = Constants.TECHNOLOGY_COLOR_BACKGROUND_ICON;
    this.colorIcon[Constants.ECONOMY_NAME] = Constants.ECONOMY_COLOR_BACKGROUND_ICON;
    this.colorIcon[Constants.ENTERTAINMENT_NAME] = Constants.ENTERTAINMENT_COLOR_BACKGROUND_ICON;
  }

  componentDidMount() {

  }

  getNewsCallback(data) {
    this.setState({news: data});
  }

  getSportCallback(data) {
    this.setState({sport: data});
  }

  getLifeCallback(data) {
    this.setState({life: data});
  }

  getEntertainmentCallback(data) {
    this.setState({entertainment: data});
  }

  getTechnologyCallback(data) {
    this.setState({technology: data});
  }

  getEconomyCallback(data) {
    this.setState({economy: data});
  }

  closeMenu() {
    this.setState({showMenu: false});
  }

  categoryButtonPressed(category) {
    this.setState({showNews: true, selectedCategory: category, showItemsQuantity: 3});
  }

  newsPressed(data) {
    Actions.news({data: data});
  }

  moreNewsPressed() {
    this.setState({showItemsQuantity: this.state.showItemsQuantity + 3})
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

  renderMenu() {
    if(this.state.showMenu)
    {
      return (
        <Menu callback={this.closeMenu.bind(this)}/>
      );
    }
  }

  renderHeader() {
    if(!this.state.showNews) {
      return (
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this.setState({showMenu: true})}>
            <View style={styles.menuIconView}>
              <Image source={require('./../assets/imgs/menu-icon.png')} style={styles.menuIcon}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      return (
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this.setState({showNews: false})}>
            <View style={styles.menuIconView}>
              <Image source={require('./../assets/imgs/return-button-gray.png')} style={styles.returnIcon}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  renderButton(category, icon) {
    return (
      <TouchableWithoutFeedback onPress={() => this.categoryButtonPressed(category)}>
        <LinearGradient colors={this.color[category]} style={styles.categoryButton} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
          <Image source={this.whiteIcon[category]} style={styles.icon}/>
          <Text style={styles.buttonText}>{this.categoriesText[category]}</Text>
          <Image source={require('./../assets/imgs/category-arrow.png')} style={styles.arrow}/>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }

  renderCategoriesButton() {
    if(!this.state.showNews) {
      return (
        <ScrollView style={styles.mainContainer}>
          {this.renderButton(Constants.NEWS_NAME)}
          {this.renderButton(Constants.SPORT_NAME)}
          {this.renderButton(Constants.LIFE_NAME)}
          {this.renderButton(Constants.ENTERTAINMENT_NAME)}
          {this.renderButton(Constants.TECHNOLOGY_NAME)}
          {this.renderButton(Constants.ECONOMY_NAME)}
        </ScrollView>
      );
    }
  }

  renderCategoryNews() {
    if(this.state.showNews) {
      var category = this.state.selectedCategory;
      var news = category == Constants.NEWS_NAME ? this.state.news :
                 category == Constants.ENTERTAINMENT_NAME ? this.state.entertainment :
                 category == Constants.LIFE_NAME ? this.state.life :
                 category == Constants.SPORT_NAME ? this.state.sport :
                 category == Constants.TECHNOLOGY_NAME ? this.state.technology :
                 this.state.economy;

      return (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Image source={this.colorIcon[category]} style={styles.icon}/>
            <Text style={styles.title}>{this.categoriesText[category]}</Text>
            <Text style={styles.description}>{news.length} {news.length < 2 ? 'noticia encontrada' : 'noticias encontradas'}</Text>
          </View>
          {this.renderNews(0, this.state.showItemsQuantity, news)}
          {
            this.state.showItemsQuantity < news.length ? 
            <TouchableWithoutFeedback onPress={() => this.moreNewsPressed()}>
              <View style={styles.moreNewsButton}>
                <Text style={styles.moreNewsText}>CARGAR MÁS NOTICIAS</Text>
              </View>
            </TouchableWithoutFeedback>
            : null
          }
        </ScrollView>
      );
    }
  }

  renderNewsItem(startIndex, quantity, array) {
    // var item = [{category: Constants.ENTERTAINMENT_NAME, time: '20 M', subcategory: 'Viajes', title: '10 mejores lugares extermos para hacer rafting.', saved: false, clicked: this.newsClicked.bind(this)},
                // {category: Constants.NEWS_NAME, time: '28 M', subcategory: 'Naturaleza', title: 'Descubren nueva especie de orquídea.', saved: false}];
    var newsItem = [];
    var length = array.length <= startIndex + quantity ? array.length : 
            quantity + startIndex;
    for(var i = startIndex; i < length; i++)
    {
      var itemFields = array[i].fields;
      var category = this.getCategory(itemFields.subcategoria.fields.categoria.sys.id);
      var date = this.getDate(array[i].sys.createdAt);

      var props = {
        id: array[i].sys.id,
        category: category, 
        categoryId: itemFields.subcategoria.fields.categoria.sys.id,
        time: date, 
        subcategory: itemFields.subcategoria.fields.nombre, 
        title: itemFields.titulo,
        saved: false,
        clicked: this.newsPressed.bind(this),
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

      if(itemFields.preview == undefined && itemFields.video == undefined) {
        newsItem.push(React.createElement(NewsItem, props));
      } else {
        newsItem.push(React.createElement(NewsItemWithMedia, props));
      }
    }

    return newsItem;
  }

  renderNews(startIndex, quantity, array) {
    if(array !== null) {
      var items = this.renderNewsItem(startIndex, quantity, array);
      return (
        React.createElement(View, null, items)
      );
    } else {
      return (
        <View> 
          <NewsItem category={Constants.ENTERTAINMENT_NAME} time={'20 M'} subcategory={'Viajes'} title={'10 mejores lugares extermos para hacer rafting.'} saved={false}/>
          <NewsItem category={Constants.NEWS_NAME} time={'28 M'} subcategory={'Naturaleza'} title={'Descubren nueva especie de orquídea.'} saved={false}/>
          <NewsItem category={Constants.LIFE_NAME} time={'30 M'} subcategory={'Salud'} title={'Semillas de maracuyá: remedio contra las manchas.'} saved={false}/>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderCategoriesButton()}
        {this.renderCategoryNews()}
        {this.renderMenu()}
      </View>
    );
  }
}

const styles = {
  header: {
    height: vw(90),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  menuIconView: {
    alignSelf: 'flex-start'
  },
  menuIcon: {
    width: vw(33),
    height: vw(35),
    marginTop: vw(28),
    marginLeft: vw(30)
  },
  returnIcon: {
    width: vw(46),
    height: vw(46),
    marginTop: vw(23),
    marginLeft: vw(32)
  },
  mainContainer: {
    backgroundColor: 'white',
    height: (Platform.OS === 'ios') ? vh(92.1) : vh(91.5)
  },
  categoryButton: {
    position: 'relative',
    paddingTop: vw(62),
    paddingBottom: vw(62),
    paddingLeft: vw(33),
    marginTop: vw(10)
  },
  icon: {
    width:vw(120),
    height: vw(120)
  },
  buttonText: {
    fontSize: vw(30),
    lineHeight: vw(36),
    color: 'white',
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: vw(200),
    top: vw(112)
  },
  arrow: {
    width: vw(19),
    height: vw(17.6),
    position: 'absolute',
    right: vw(54),
    top: vw(118)
  },
  headerContainer: {
    marginTop: vw(10),
    paddingTop: vw(62),
    paddingLeft: vw(33),
    borderStyle: 'solid',
    borderTopColor: '#DDD',
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  }, 
  title: {
    fontSize: vw(30),
    lineHeight: vw(36),
    color: '#333',
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: vw(200),
    top: vw(112)
  },
  description: {
    color: '#808080',
    fontSize: vw(26),
    lineHeight: vw(31.2),
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    marginTop: vw(46),
    marginBottom: vw(57)
  },
  moreNewsButton: {
    height: vw(99),
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FF774D'
  },
  moreNewsText: {
    color: 'white',
    fontSize: vw(30),
    lineHeight: vw(36),
    backgroundColor: 'transparent',
    fontFamily: 'Soft Core'
  },
};

export default Categories;

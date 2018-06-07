import React, { Component } from 'react';
import { View, Dimensions, Text, ScrollView, Image, TouchableWithoutFeedback, Platform, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { NewsItem, NewsItemWithMedia, HighlightedNewsItem, OrangeButton, Menu } from './common';
import * as Constants from './common/Constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import EnterServices from './../EnterServices';

// function vw(percentageWidth) {
//   return Dimensions.get('window').width * (percentageWidth / 100);
// }

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class Home extends Component {

  service = null;

  constructor(props) {
    super(props);

    var latestNews = this.createEmptyNewsArray(6);
    var highlightedNews = this.createEmptyNewsArray(1);

    this.state = {
      slider1ActiveSlide: 0,
      searching: false,
      searchText: '',
      hasSearchResult: false,
      showResult: false,
      searchResult: [],
      searchShowItems: 3,
      showMenu: false,
      latestNews: latestNews,
      highlightedNews: highlightedNews,
      searchFocus: false
    }

    this.service = new EnterServices();
    this.service.getlastNews(6, this.getNewsCallback.bind(this));
    this.service.getNoticiasByArrayIds(['1hTCLph22IMAmOQMKw8Iqc', '7KHtI9IitiIIw2OacAK4ms', '6VlOZNya0oU2Ee6kK4Wsq8'], this.getHighlightCallback.bind(this));
  }

  componentDidMount(entry) {

  }

  createEmptyNewsArray(length) {
    var items = [];
    for(i = 0; i < length; i++) {
      items.push({
        id: '',
        title: '',
        abstract: '',
        category: 'noticia',
        categoryId: 0,
        subcategory: '',
        image: undefined,
        saved: false,
        time: '',
        clicked: this.emptyClicked.bind(this),
        content: '',
        preview: undefined,
        cover: undefined,
        video: undefined,
        author: '',
        images: [],
        quote: undefined,
        similar: [],
        key: i
      });
    }

    return items;
  }

  createNewsArray(array) {
    var newsItem = [];
    for(var i = 0, l = array.length; i < l; i++)
    {
      var itemFields = array[i].fields;
      var category = this.getCategory(itemFields.subcategoria.fields.categoria.sys.id);
      var date = this.getDate(array[i].sys.createdAt);

      var json = {
        id: array[i].sys.id,
        category: category,
        time: date,
        abstract: this.truncateText(itemFields.contenido, 75),
        subcategory: itemFields.subcategoria.fields.nombre,
        categoryId: itemFields.subcategoria.fields.categoria.sys.id,
        title: itemFields.titulo,
        saved: false,
        clicked: this.newsClicked.bind(this),
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

      newsItem.push(json);
    }

    return newsItem;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.refs.searchInput !== undefined && this.state.searchFocus) {
      this.refs.searchInput.focus();
      this.refs.searchInput.clear();
      this.setState({searchFocus: false});
    }
  }

  getNewsCallback(entry) {
    console.log(entry);
    var news = this.createNewsArray(entry);
    // console.log(news);
    this.setState({latestNews: news});
  }

  getHighlightCallback(entry) {
    var news = this.createNewsArray(entry);
    this.setState({highlightedNews: news});
  }

  emptyClicked() {

  }

  newsClicked(data) {
    Actions.news({data: data});
  }

  searchClicked() {
    this.setState({searching: true, searchFocus: true});
  }

  searchSubmit() {
    this.service.findNoticiasByContent(this.state.searchText, this.searchResult.bind(this));
  }

  searchResult(data) {
    // console.log(data);
    var news = this.createNewsArray(data);
    this.setState({showResult: true, searchResult: news, searchFocus: false, searchShowItems: 3});
    if(data.length == 0) {
      this.setState({hasSearchResult: false});
    } else {
      this.setState({hasSearchResult: true});
    }
  }

  closeClicked() {
    this.setState({searching: false, hasSearchResult: false, showResult: false, searchShowItems: 3});
  }

  closeMenu() {
    this.setState({showMenu: false});
  }

  moreResultPressed() {
    this.setState({searchShowItems: this.state.searchShowItems + 3});
  }

  newSearchPressed() {
    this.setState({searchShowItems: 3, showResult: false, searchFocus: true, hasSearchResult: false});
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

  truncateText(text, length) {
    return text.substr(0, length) + "...";
  }

  getColor() {
    var category = this.state.highlightedNews[this.state.slider1ActiveSlide].category;
    return (category == Constants.NEWS_NAME ? ['#FBB03B', '#FF774D'] :
          category == Constants.SPORT_NAME ? ['#22B573', '#9DD750', '#FFFF00'] :
          category == Constants.LIFE_NAME ? ['#FFBA33', '#FFE800'] :
          category == Constants.ENTERTAINMENT_NAME ? ['#FB5258', '#D4145A'] :
          category == Constants.TECHNOLOGY_NAME ? ['#37C3D3', '#12ECBF'] :
          category == Constants.ECONOMY_NAME ? ['#0068E1', '#3DA6F4'] :
          ['#FBB03B', '#FF774D'] );
  }

  renderHighlightedItem({item, index}) {
    return (<HighlightedNewsItem data={item}/>);
  }

  renderHeader() {
    if(!this.state.searching) {
      return (
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this.setState({showMenu: true})}>
            <View style={styles.menuIconView}>
              <Image source={require('./../assets/imgs/menu-icon.png')} style={styles.menuIcon}/>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.searchClicked()}>
            <View style={styles.searchIconView}>
              <Image source={require('./../assets/imgs/search-icon.png')} style={styles.searchIcon}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    } else {
      return (
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this.setState({showMenu: true})}>
            <View style={styles.menuIconView}>
              <Image source={require('./../assets/imgs/menu-icon.png')} style={styles.menuIcon}/>
            </View>
          </TouchableWithoutFeedback>
          <TextInput placeholder={'¿Qué estás buscando?'}
                     style={styles.searchInput}
                     underlineColorAndroid='transparent'
                     placeholderTextColor={'#CCCCCC'}
                     autoCorrect={false}
                     returnKeyType={'search'}
                     onSubmitEditing={this.searchSubmit.bind(this)}
                     onChangeText={(text) => this.setState({searchText: text})}
                     ref={'searchInput'}/>
          <TouchableWithoutFeedback onPress={() => this.closeClicked()}>
            <View style={styles.closeIconView}>
              <Image source={require('./../assets/imgs/close-gray.png')} style={styles.closeIcon}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
      if(array[i].preview === undefined && array[i].video === undefined) {
        newsItem.push(React.createElement(NewsItem, array[i]));
      } else {
        newsItem.push(React.createElement(NewsItemWithMedia, array[i]));
      }
    }

    return newsItem;
  }

  renderNews(startIndex, quantity, array) {
    if(array.length > 0) {
      var items = this.renderNewsItem(startIndex, quantity, array);
      return (
        React.createElement(View, null, items)
      );
    }
  }

  renderHomeScreen() {
    // if(!this.state.searching){
      return (
        <ScrollView style={styles.mainContainer}>
          <LinearGradient colors={this.getColor()} style={styles.highlightedContainer}>
            <Text style={styles.whiteTitle}>DESTACADAS HOY</Text>
            <Carousel
                data={this.state.highlightedNews}
                renderItem={this.renderHighlightedItem}
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
                dotsLength={this.state.highlightedNews.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
          </LinearGradient>
          <Text style={styles.title}>ÚLTIMAS NOTICIAS</Text>
          {this.renderNews(0, 3, this.state.latestNews)}
          <Text style={styles.title}>MÁS NOTICIAS</Text>
          {this.renderNews(3, 3, this.state.latestNews)}
          {/*<Image source={{uri:'https://cdn4.decoracionyjardines.com/wp-content/uploads/2016/07/cuidados-de-la-orqu%C3%ADdea-7.jpg'}} style={{width: 400, height: 400}}/> */}
        </ScrollView>
      );
    // }
  }

  renderSearchScreen() {
    if(this.state.searching) {
      if(!this.state.showResult) {
        return (
          <View style={styles.searchView}>
            <LinearGradient colors={['#FBB03B', '#FE8A47', '#FF774D']} style={styles.linearGradient} start={{x: 0, y: 0}} end={{x: 1, y:0}}>

            </LinearGradient>
          </View>
        );
      } else if(!this.state.hasSearchResult) {
        return (
          <View style={styles.searchView}>
            <LinearGradient colors={['#FBB03B', '#FE8A47', '#FF774D']} style={styles.linearGradient} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
              <View style={styles.noResultView}>
                <Image source={require('./../assets/imgs/big-x-icon.png')} style={styles.noResultIcon}/>
                <Text style={styles.noResultText1}>No hay resultados</Text>
                <Text style={styles.noResultText2}>No logramos encontrar ninguna noticia que correspondiera con tu búsqueda.</Text>
                  <View style={styles.newSearchButton}><OrangeButton value={'Nueva búsqueda'} onPress={this.newSearchPressed.bind(this)}/></View>
              </View>
            </LinearGradient>
          </View>
        );
      } else {
        return (
          <ScrollView style={styles.mainContainer, styles.searchView}>
            <Text style={styles.title}>MÁS RECIENTES</Text>
            {this.renderNews(0, this.state.searchShowItems, this.state.searchResult)}
            <Text style={styles.result}>{this.state.searchResult.length} {this.state.searchResult.length == 1 ? 'resultado' : 'resultados'} en total</Text>
            {this.state.searchResult.length > this.state.searchShowItems ?
              <TouchableWithoutFeedback onPress={() => this.moreResultPressed()}>
                <View style={styles.moreResultButton}>
                  <Text style={styles.moreResultText}>MÁS RESULTADOS</Text>
                </View>
              </TouchableWithoutFeedback>
              : null
            }
          </ScrollView>
        );
      }
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

  render() {
    // Image.getSize(myUri, (width, height) => {this.setState({width, height})});
    return (
      <View>
        {this.renderHeader()}
        {this.renderHomeScreen()}
        {this.renderSearchScreen()}
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
    shadowOffset: { width: 0, height: 0 },
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
    marginTop: (Platform.OS === 'ios') ? vw(32) : vw(28),
    marginLeft: vw(30)
  },
  searchIconView: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? vw(29) : vw(25),
    left: vw(570)
  },
  searchIcon: {
    width: vw(39),
    height: vw(39)
  },
  closeIconView: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? vw(38) : vw(33),
    left: vw(570),
  },
  closeIcon: {
    width: vw(31),
    height: vw(31)
  },
  searchInput: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? vw(39) : vw(12),
    left: vw(100),
    width: vw(430),
    fontSize: vw(28),
    lineHeight: vw(30),
    backgroundColor: 'transparent',
    fontFamily: 'GothamRounded-Bold'
  },
  mainContainer: {
    backgroundColor: 'white',
    height: (Platform.OS === 'ios') ? vh(92.1) : vh(91.5)
  },
  highlightedContainer: {
    // paddingBottom: vw(106),
    marginTop: vw(12),
    height: (Platform.OS === 'ios') ? vw(1037) :vw(976)
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
  title: {
    marginTop: vw(35),
    marginBottom: vw(35),
    marginLeft: vw(30),
    color: '#FF774D',
    fontSize: vw(28),
    lineHeight: vw(33.6),
    fontFamily: 'Soft Core',
    backgroundColor: 'transparent'
  },
  whiteTitle: {
    color: 'white',
    marginTop: vw(35),
    marginBottom: vw(35),
    marginLeft: vw(30),
    fontSize: vw(28),
    lineHeight: vw(33.6),
    fontFamily: 'Soft Core',
    backgroundColor: 'transparent'
  },
  searchView: {
    height: (Platform.OS === 'ios') ? vh(92.1) : vh(91.5),
    width: vw(640),
    backgroundColor: 'white',
    position: 'absolute',
    top: vw(90),
    left: 0
  },
  linearGradient: {
    height: '100%',
    width: vw(640),
    marginTop: vw(12)
  },
  result: {
    color: '#808080',
    fontSize: vw(26),
    lineHeight: vw(31.2),
    marginTop: vw(48),
    marginBottom: vw(48),
    marginLeft: vw(32),
    backgroundColor: 'transparent',
    fontFamily: 'FranklinGothicFS-Book'
  },
  moreResultButton: {
    height: vw(99),
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FF774D'
  },
  moreResultText: {
    color: 'white',
    fontSize: vw(30),
    lineHeight: vw(36),
    fontFamily: 'Soft Core',
    backgroundColor: 'transparent'
  },
  noResultView: {
    height: vh(91),
    alignItems: 'center',
    justifyContent:'center',
  },
  noResultIcon: {
    width: vw(200),
    height: vw(200)
  },
  noResultText1: {
    color: 'white',
    fontSize: vw(30),
    lineHeight: vw(36),
    fontFamily: 'GothamRounded-Bold',
    backgroundColor: 'transparent',
    marginTop: vw(65)
  },
  noResultText2: {
    color: 'white',
    fontSize: vw(26),
    lineHeight: vw(31.2),
    fontFamily: 'FranklinGothicFS-Book',
    backgroundColor: 'transparent',
    marginTop: vw(56),
    marginBottom: vw(215),
    textAlign: 'center'
  }
};

export default Home;

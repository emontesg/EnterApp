/**
 * Created by jimmivila on 8/25/17.
 */
import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, Platform, StyleSheet, StatusBar, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {OrangeButton, SliderEntry} from './common';
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

const SLIDER_1_FIRST_ITEM = 0;


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const sliderWidth = viewportWidth;

const slideWidth = vw(640);

const itemHorizontalMargin = vw(0);

const itemWidth = slideWidth + itemHorizontalMargin * vw(4);

const userLoggued = false;


class Tutorial extends Component {

    constructor (props) {
        super(props);
        this.state = {
            entries : LOGGED,
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        };
    }

    _renderItem ({item, index}) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
            />
        );
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    get gradient () {
        return (
            <LinearGradient
                colors={[colors.background1, colors.background2]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.gradient}
            />
        );
    }

    get loggedTuto (){
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Carousel
                    data={LOGGED}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.6}
                    enableMomentum={false}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                    dotsLength={LOGGED.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
                <View style={styles.enterButton}><OrangeButton value="Iniciar"/></View>

            </View>
        );
    }

    get notLoggedTuto(){
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>

                <Carousel
                    data={NOTLOGGED}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.6}
                    enableMomentum={false}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                    dotsLength={NOTLOGGED.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
                <TouchableWithoutFeedback onPress={() => this.trigger()}>
                    <View style={styles.facebookButtonViewStyle}>
                        <Image source={require('./../assets/imgs/facebook-button.png')} style={styles.facebookButton}/>
                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={() => Actions.home()}>
                    <View style={styles.closeButtonViewStyle}>
                        <Image source={require('./../assets/imgs/close.png')} style={styles.closeButton}/>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
    }

    //Actions.firstInterestSettings()

    trigger(){
        Service = new EnterServices();
        // Service.getNoticiaById('2s78VSD3bOuOwMIAEkko22');
        // Service.getlastNews(2);
        // Service.getTresNoticiasById('2s78VSD3bOuOwMIAEkko22','6VlOZNya0oU2Ee6kK4Wsq8','7KHtI9IitiIIw2OacAK4ms')
        // Service.getNoticiasByArrayIds(['2s78VSD3bOuOwMIAEkko22','6VlOZNya0oU2Ee6kK4Wsq8','7KHtI9IitiIIw2OacAK4ms'])
        Service.getNoticiasSimilares('holanda');
    }


    render() {

        return (

            <View style={styles.container}>
                { this.gradient }

                {userLoggued ? this.loggedTuto : this.notLoggedTuto}
            </View>
        );
    }
// <LinearGradient colors={['#FBB03B', '#FE8A47', '#FF774D']} style={styles.linearGradient} start={{x: 0, y: 0}} end={{x: 1, y:0}}>
// <View style={styles.viewStyle}>
//
// </View>
// </LinearGradient>
// <Pagination
// dotsLength={ENTRIES1.length}
// activeDotIndex={slider1ActiveSlide}
// containerStyle={styles.paginationContainer}
// dotStyle={styles.paginationDot}
// inactiveDotOpacity={0.4}
// inactiveDotScale={0.6}
// />
}


const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#FF774D',
    background2: '#FBB03B'
};

const styles = {
    linearGradient: {
        height: vh(100),
        borderStyle: 'solid',
    },
    logoStyle: {
        width: vw(230),
        height: vw(233),
    },
    viewStyle: {
        position: 'absolute',
        top: vw(400),
        left: vw(203)
    }
    ,

    container: {
        width:vw(640),
        height:vh(100),
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        width:vw(640),
        height:vh(100),
        // paddingTop: vw(200)
        // marginTop : vw(200)
    },
    scrollviewContentContainer: {
        // paddingBottom: vw(100)
    },
    exampleContainer: {
        marginBottom: vw(60)
    },
    title: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: vw(40),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: vw(10),
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: vw(23),
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        // marginTop: vw(50)
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: vw(40)
    },
    paginationDot: {
        width: vw(16),
        height: vw(16),
        borderRadius: vw(8),
        marginHorizontal: vw(10),
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    enterButton: {
        marginTop: vw(78),
        alignSelf: 'center'
    },
    facebookButton: {
        width: vw(500),
        height: vw(80)
    },
    facebookButtonViewStyle: {
        marginTop: vw(100),
        alignSelf: 'center'
    },
    closeButton:{
        // position:'absolute',
        // position:'relative',
        width:vw(53),
        height:vw(53),
        // right:vw(46),
        // top: vw(44)
    },

    closeButtonViewStyle: {
        // marginTop: vw(100),
        position:'absolute',
        elevation:10,
        // width:vw(53),
        // height:vw(53),
        right:vw(46),
        top: vw(44)
    },

};


const LOGGED = [
    {
        title: 'Notificaciones',
        subtitle: 'Recibí notificaciones de las noticias\nmás destacadas para que estes siempre\nenterado de lo último.',
        illustration: function () {return require('./../assets/imgs/notificacionTuto.png');},
        imgW:200,
        imgH:200,
    },
    {
        title: 'Intereses',
        subtitle: 'Escogé tus principales intereses para\nenterarte de las últimas noticias sobre tus\ntemas favoritos.',
        illustration: function () {return require('./../assets/imgs/interesesTuto.png');},
        imgW:510,
        imgH:415,
    },
    {
        title: 'Colecciones',
        subtitle: 'Guardá las noticias que más te gusten\ny tene acceso a ellas cuando querás. Además\ncreá colecciones para organizarlas.',
        illustration:  function () {return require('./../assets/imgs/colecciontuto.png');},
        imgW:200,
        imgH:200,
    },
];

const NOTLOGGED = [
    {
        title: 'Funciones Extra',
        subtitle: 'Disfrutá de las funciones extra solo con\ningresar con tu cuenta de Facebook.',
        illustration: function () {return require('../assets/imgs/extraTuto.png');},
        imgW:200,
        imgH:200,
    },
    {
        title: 'Colecciones',
        subtitle: 'Creá colecciones para guardar de manera\norganizada las noticas que te gustan.',
        illustration:  function () {return require('./../assets/imgs/colecciontuto.png');},
        imgW:200,
        imgH:200,
    },
    {
        title: 'Intereses',
        subtitle: 'Enterarte de las últimas noticias sobre tus\ntemas favoritos al personalizar las categorías.',
        illustration: function () {return require('./../assets/imgs/interstarTuto.png');},
        imgW:200,
        imgH:200,
    },
    {
        title: 'Notificaciones',
        subtitle: 'Recibí notificaciones de las noticias\ndestacadas para no perderte lo más importante.',
        illustration: function () {return require('./../assets/imgs/notificacionTuto.png');},
        imgW:200,
        imgH:200,
    },
];

export default Tutorial;

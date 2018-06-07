/**
 * Created by jimmivila on 8/28/17.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, Platform } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';

function vh(percentageHeight) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}
//640
function vw(w) {
    return Dimensions.get('window').width * (w / 640);
}


const colors = {
    // black: '#1a1917',
    // gray: '#888888',
    background1: '#FBB03B',
    background2: '#FF774D'
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const slideHeight = viewportHeight * vw(0.8);

const entryBorderRadius = vw(16);

const slideWidth = vw(640);

const itemHorizontalMargin = vw(0);

const itemWidth = slideWidth + itemHorizontalMargin * vw(4);


class SliderEntry extends Component {

    // static propTypes = {
    //     data: PropTypes.object.isRequired,
    //     even: PropTypes.bool,
    //     parallax: PropTypes.bool,
    //     parallaxProps: PropTypes.object
    // };

    get image () {
        const { data: { illustration,imgW,imgH }, parallax, parallaxProps, even } = this.props;
        // console.log(imgH,imgW);
        // console.log(illustration);
        return (
            <Image
                source={ illustration() }
                style={[styles.image,{width:vw(imgW), height:vw(imgH)}, (imgH>399) ? styles.largeImage:{} ]}

            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <View
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => { alert(`You've clicked '${title}'`); }}
            >
                <View style={[styles.imageContainer]}>
                    { this.image }
                    <View style={[styles.radiusMask]} />
                </View>

                <View style={[styles.textContainer]}>
                    { uppercaseTitle }
                    <Text
                        style={[styles.subtitle]}
                        // numberOfLines={3}
                    >
                        { subtitle }
                    </Text>
                </View>
            </View>
        );
    }

}

const styles = {
    slideInnerContainer: {
        // paddingTop: vw(200)
        marginTop:vw(180),
        width: itemWidth,
            height: slideHeight,
            paddingHorizontal: itemHorizontalMargin,
            justifyContent: 'center',
            alignItems:'center'
            // paddingBottom: vw(3 6) // needed for shadow
    },
    imageContainer: {
        width:vw(640),
        margin: 'auto',
        justifyContent: 'center',
        alignItems:'center'

    },

    image: {
        position:'relative',
        marginBottom:vw(20),
    },
    largeImage:{
        position:'relative',
        bottom: 100,
        marginBottom:vw(-180)
    },

    textContainer: {
        width:vw(544),
        height:vw(200),
        margin: 'auto',
        justifyContent: 'center',
        alignItems:'center'
    },
    title: {
        color: 'white',
            fontSize: vw(30),
            fontWeight: 'bold',
            letterSpacing: vw(1)
    },
    subtitle: {
        textAlign:'center',
        marginTop: vw(30),
            color: 'white',
            fontSize: vw(26),
    },

    multipleItemsImage: {
        width: vw(530),
        height: vw(437),
    },
};


export {SliderEntry};


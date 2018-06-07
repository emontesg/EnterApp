import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { SelectButton } from './common';
import { Actions } from 'react-native-router-flux';

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

function vw(w) {
  return Dimensions.get('window').width * (w / 640);
}

class FirstInterestSettings extends Component {
  state = { checked: false };

  componentWillMount() {
    this.options = [[{value: 'Transporte', category: 'noticia'},
               {value: 'Gadgets', category: 'tecnologia'},
               {value: 'Ciclismo', category: 'deporte'},
               {value: 'Educación y Familia', category: 'vida'}, 
               {value: 'Arte', category: 'entretenimiento'}],
              [{value: 'Juegos', category: 'tecnologia'},
               {value: 'Mercado', category: 'economia'},
               {value: 'Vivienda', category: 'noticia'}, 
               {value: 'Salud', category: 'noticia'},
               {value: 'Belleza y moda', category: 'vida'}],
              [{value: 'Sucesos', category: 'noticia'},
               {value: 'Fútbol', category: 'deporte'},
               {value: 'Celebridades', category: 'entretenimiento'},
               {value: 'Negocios y Familia', category: 'economia'},
               {value: 'Viajes', category: 'entretenimiento'}],
              [{value: 'Surf', category: 'deporte'},
               {value: 'Futuro', category: 'tecnologia'},
               {value: 'Comida', category: 'entretenimiento'},
               {value: 'Animales', category: 'vida'},
               {value: 'Finanzas', category: 'economia'}]];
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.scrollView2.scrollTo({x: 500, y: 0, animated: false});
      this.refs.scrollView4.scrollTo({x: 500, y: 0, animated: false});
    }, 0.1)
    this.interestCount = 0;
  }

  optionClicked(value) {
    if(value) {
      this.interestCount++;
      if(this.interestCount >= 6 && !this.state.checked) {
        console.log('+ 6 intereses');
        this.setState({checked: true});
      }
    } else {
      if(this.interestCount > 0)
      {
        this.interestCount--;
        if(this.interestCount < 6 && this.state.checked) {
          console.log('- 6 intereses');
          this.setState({checked: false});
        }
      }
    }
  }

  renderOptions(index, ref) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={ref}>
        <SelectButton value={this.options[index][0].value} category={this.options[index][0].category} onClicked={this.optionClicked.bind(this)}/>
        <SelectButton value={this.options[index][1].value} category={this.options[index][1].category} onClicked={this.optionClicked.bind(this)}/>
        <SelectButton value={this.options[index][2].value} category={this.options[index][2].category} onClicked={this.optionClicked.bind(this)}/>
        <SelectButton value={this.options[index][3].value} category={this.options[index][3].category} onClicked={this.optionClicked.bind(this)}/>
        <SelectButton value={this.options[index][4].value} category={this.options[index][4].category} onClicked={this.optionClicked.bind(this)}/>
      </ScrollView>
    )
  }

  renderNextButton() {
    if(this.state.checked) {
      return (
        <TouchableWithoutFeedback onPress={() => Actions.firstNotificationSettings()}>
          <View style={styles.nextButtonView}>
            <Image source={require('./../assets/imgs/next-button-enabled.png')} style={styles.nextButton}/>
          </View>
        </TouchableWithoutFeedback>)
    } else {
      return (
        <View style={styles.nextButtonView}>
          <Image source={require('./../assets/imgs/next-button-disabled.png')} style={styles.nextButton}/>
        </View>)
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>
          <View style={styles.imageView}>
            <Image source={require('./../assets/imgs/first-interest-icon.png')} style={styles.image}/>
          </View>
          <Text style={styles.title}>Seleccioná 6 intereses</Text>
          {this.renderOptions(0, 'scrollView1')}
          {this.renderOptions(1, 'scrollView2')}
          {this.renderOptions(2, 'scrollView3')}
          {this.renderOptions(3, 'scrollView4')}
          <View style={styles.textView}>
            <Text style={styles.text}>Modificá o ampliá tu lista de intereses</Text>
            <Text style={styles.text}>en la selección de categorías.</Text>
          </View>
          {this.renderNextButton()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    position: 'absolute',
    backgroundColor: 'white',
    width: vw(640),
    height: vh(100)
  },
  imageView: {
    marginTop: vw(85),
    marginBottom: vw(65)
  },
  image: {
    width: vw(193),
    height: vw(193),
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'GothamRnd-Bold',
    backgroundColor: 'transparent',
    fontSize: vw(30),
    lineHeight: vw(36),
    alignSelf: 'center',
    marginBottom: vw(42),
    color: '#333333'
  },
  text: {
    fontFamily: 'franklingothic-book',
    backgroundColor: 'transparent',
    fontSize: vw(26),
    lineHeight: vw(31.2),
    alignSelf: 'center',
    color: '#808080'
  },
  textView: {
    marginTop: vw(55),
    marginBottom: vw(63)
  },
  nextButton: {
    width: vw(53),
    height: vw(53),
    alignSelf: 'center'
  },
  nextButtonView: {
    marginBottom: vw(70)
  }
};

export default FirstInterestSettings;

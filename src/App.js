import React, { Component } from 'react';
import { StatusBar,Alert } from 'react-native';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  componentDidMount() {
      // Alert.alert('hi');
    // this.getContentFromcontentful();

  }

  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      // <Provider store={store}>
        <Router/>
      // </Provider>
    );
  }
}

export default App;

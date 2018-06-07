import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Splash from './components/Splash';
import Enter from './components/Enter';
import FirstInterestSettings from './components/FirstInterestSettings';
import FirstNotificationSettings from './components/FirstNotificationSettings';
import Home from './components/Home';
import Tutorial from './components/Tutorial';
import News from './components/News';
import Categories from './components/Categories';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="main">
	      <Scene key="splash" component={Splash} hideNavBar initial/>
	      <Scene key="enter" component={Enter} hideNavBar type={ActionConst.RESET}/>
        <Scene key="tutorial" component={Tutorial} hideNavBar/>
	      <Scene key="login" component={LoginForm} hideNavBar/>
	      <Scene key="register" component={RegisterForm} hideNavBar/>
        <Scene key="firstInterestSettings" component={FirstInterestSettings} hideNavBar type={ActionConst.RESET}/>
        <Scene key="firstNotificationSettings" component={FirstNotificationSettings} hideNavBar/>
        <Scene key="home" component={Home} hideNavBar type={ActionConst.RESET} />
        <Scene key="news" component={News} hideNavBar/>
        <Scene key="categories" component={Categories} hideNavBar type={ActionConst.RESET} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;

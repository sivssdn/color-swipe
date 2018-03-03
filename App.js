import React from 'react';
import {StackNavigator} from 'react-navigation';
import Menu from "./pages/Menu";
import ColorSwipe from "./pages/ColorSwipe";
import Scores from "./pages/Scores";

const Navigation = StackNavigator({
    Home: {screen: Menu},
    ColorSwipe: {screen: ColorSwipe},
    Scores: {screen: Scores}
},{
    navigationOptions:{
        header: false,
    }
});

export default class App extends React.Component {
  render() {
    return (
      <Navigation/>
    );
  }
}

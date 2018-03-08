import React from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Menu from "./pages/Menu";
import ColorSwipe from "./pages/ColorSwipe";
import Scores from "./pages/Scores";

const Navigation = StackNavigator({
    Home: {screen: Menu},
    ColorSwipe: {screen: ColorSwipe},
    Scores: {screen: Scores}
}, {
    navigationOptions: {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

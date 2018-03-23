import React from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Menu from "./pages/Menu";
import ColorSwipe from "./pages/ColorSwipe";
import Scores from "./pages/Scores";
import CountrySwipe from "./pages/CountrySwipe";

const Navigation = StackNavigator({
    Home: {screen: Menu},
    ColorSwipe: {screen: ColorSwipe},
    CountrySwipe:{screen: CountrySwipe},
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

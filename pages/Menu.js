import React from 'react';
import {BackHandler, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (

            <View style={styles.container}>
                <Image source={require('../background-1853244_1280.jpg')}
                       style={styles.ImageBackground}/>


                <View style={styles.containerOverlay}>
                    <Text style={styles.header}>MENU</Text>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate('ColorSwipe')
                    }}>
                        <Text>Color Swipe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate('Scores')
                    }}>
                        <Text>High Scores</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        BackHandler.exitApp()
                    }}>
                        <Text>Exit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 50
    },
    button: {
        /*alignSelf: 'stretch',*/
        alignSelf: 'center',
        backgroundColor: '#3d19bb',
        padding: 20,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 9,
        width: '70%',
    },
    ImageBackground: {
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    containerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

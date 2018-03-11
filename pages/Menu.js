import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (

            <View style={styles.container}>
                <Image source={require('../background-1853244_1280.jpg')}
                       style={styles.ImageBackground}/>


                    <Text style={styles.header}>Menu</Text>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate('ColorSwipe')
                    }}>
                        <Text>Color Swipe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate('Scores')
                    }}>
                        <Text>Scores</Text>
                    </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1, justifyContent:'center', alignItems:'center'
    },
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom:50
    },
    button: {
        /*alignSelf: 'stretch',*/
        alignSelf: 'center',
        backgroundColor: '#3d19bb',
        padding: 20,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 9,
        width:'70%'
    },
    ImageBackground: {
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});

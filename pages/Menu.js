import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View>
                <Text style={styles.header}>Menu</Text>

                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('ColorSwipe')}}>
                    <Text>Color Swipe</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate('Scores')}}>
                    <Text>Scores</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#3d19bb',
        padding: 20,
        marginBottom:10,
        alignItems: 'center',
    }
});

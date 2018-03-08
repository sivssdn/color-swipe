import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render(){
        const listData = [
            {key: '1. element'},
            {key: '2. element'},
            {key: '3. element'},
        ];
        return(
            <View>
                <Text style={styles.header}>Scores</Text>
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
    }
});
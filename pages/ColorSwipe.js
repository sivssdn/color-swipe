import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ColorSwipe extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <View>
                <Text style={styles.header}>Color Swipe</Text>
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
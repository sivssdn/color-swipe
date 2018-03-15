import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderRow() {
        return (
            <View style={[styles.tableRowView, {flexDirection: 'column',}]}>
                <View style={styles.tableRowView}>
                    <View style={styles.td}><Text style={styles.thText}>{'Level'}</Text></View>
                    <View style={styles.td}><Text style={styles.thText}>{'Learning Time'}</Text></View>
                    <View style={styles.td}><Text style={styles.thText}>{'Recall Time'}</Text></View>
                </View>
                <View style={styles.tableRowView}>
                    <View style={styles.td}><Text style={styles.thText}>{'Level'}</Text></View>
                    <View style={styles.td}><Text style={styles.thText}>{'Learning Time'}</Text></View>
                    <View style={styles.td}><Text style={styles.thText}>{'Recall Time'}</Text></View>
                </View>
                <View style={styles.tableRowView}>
                    <View style={styles.td}><Text style={styles.thText}>{'Level'}</Text></View>
                    <View style={styles.td}><Text style={styles.thText}>{'Learning Time'}</Text></View>
                    <View style={styles.td}><Text style={styles.thText}>{'Recall Time'}</Text></View>
                </View>

            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={require('../cup.jpg')}
                       style={styles.ImageBackground}/>
                <View style={styles.containerOverlay}>
                    <Text style={styles.header}>Colors</Text>

                    <View style={{height: '50%'}}>
                        {this.renderRow()}
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 50,
        color: '#fff',
        fontWeight: 'bold',
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
        alignItems: 'center',
    },
    tableRowView: {
        marginLeft: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        paddingTop: 0
    },
    td: {
        flex: 1,
        alignSelf: 'stretch'
    },
    thText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
import React from 'react';
import {AsyncStorage, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';

export default class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorsHighScore1: ["NA", "NA", "NA"],
            colorsHighScore2: ["NA", "NA", "NA"],
            colorsHighScore3: ["NA", "NA", "NA"],
        }
    }

    getColorsHighScore() {
        //getting Colors High Score
        try {
            AsyncStorage.getItem("colorScore1").then((score1) => {
                if (score1 !== null) {
                    this.setState({colorsHighScore1: score1.split(",")});
                }
            }).catch((error)=>{
                console.log("Api call error"+error);
            });

            AsyncStorage.getItem("colorScore2").then(( score2) => {
                if (score2 !== null) {
                    this.setState({colorsHighScore2: score2.split(",")});
                }
            }).catch((error)=>{
                console.log("Api call error"+error);
            });

            AsyncStorage.getItem("colorScore3").then((score3) => {
                if (score3 !== null) {
                    this.setState({colorsHighScore1: score3.split(",")});
                }
            }).catch((error)=>{
                console.log("Api call error "+error);
            });

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount(){
        this.getColorsHighScore();
    }


    render() {
        const tableHead = ['Level', 'Learning Time', 'Recall Time'];
        const colorsTableData = [
            this.state.colorsHighScore1,
            this.state.colorsHighScore2,
            this.state.colorsHighScore3,
        ];
        const tableData = [
            ['1', '2', '3'],
            ['a', 'b', 'c'],
            ['a', 'b', 'c'],
            ['a', 'b', 'c'],
            ['a', 'b', 'c'],
        ];

        return (
            <View style={styles.container}>
                <Image source={require('../cup.jpg')}
                       style={styles.ImageBackground}/>
                <View style={styles.containerOverlay}>
                    <ScrollView style={{width: '100%'}}>
                        <Text style={styles.header}>Colors</Text>
                        <Table style={styles.table}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={colorsTableData} style={styles.row} textStyle={styles.text}/>
                        </Table>
                        <Text style={styles.header}>Countries</Text>
                        <Table style={styles.table}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
                        </Table>
                    </ScrollView>
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
        marginLeft: '40%',
        marginTop: 30,
        marginBottom: 20,
        color: '#fff',
        fontWeight: '100',
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
    head: {height: 40, backgroundColor: '#000',},
    text: {marginLeft: 5, color: '#fff'},
    row: {height: 30},
    table: {width: '98%', marginLeft: '1%'}
});
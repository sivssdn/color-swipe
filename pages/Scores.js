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
            CountryScore1: ["NA", "NA", "NA"],
            CountryScore2: ["NA", "NA", "NA"],
            CountryScore3: ["NA", "NA", "NA"],
        }
    }

    getColorsHighScore() {
        //getting Colors High Score
        try {
            let score = [];
            AsyncStorage.getItem("colorScore1").then((score1) => {
                if (score1 !== null) {
                    score = score1.split(",");
                    score[1] = score[1] + " sec";
                    score[2] = score[2] + " sec";
                    this.setState({colorsHighScore1: score});
                }
            }).catch((error) => {
                console.log("Api call error" + error);
            });

            AsyncStorage.getItem("colorScore2").then((score2) => {
                if (score2 !== null) {
                    score = score2.split(",");
                    score[1] = score[1] + " sec";
                    score[2] = score[2] + " sec";
                    this.setState({colorsHighScore2: score});
                }
            }).catch((error) => {
                console.log("Api call error" + error);
            });

            AsyncStorage.getItem("colorScore3").then((score3) => {
                if (score3 !== null) {
                    score = score3.split(",");
                    score[1] = score[1] + " sec";
                    score[2] = score[2] + " sec";
                    this.setState({colorsHighScore3: score});
                }
            }).catch((error) => {
                console.log("Api call error " + error);
            });

        } catch (error) {
            console.log(error);
        }
    }

    getCountriesHighScore() {
        //getting Colors High Score
        try {
            let score = [];
            AsyncStorage.getItem("CountryScore1").then((score1) => {
                if (score1 !== null) {
                    score = score1.split(",");
                    score[1] = score[1] + " sec";
                    score[2] = score[2] + " sec";
                    this.setState({CountryScore1: score});
                }
            }).catch((error) => {
                console.log("Api call error" + error);
            });

            AsyncStorage.getItem("CountryScore2").then((score2) => {
                if (score2 !== null) {
                    score = score2.split(",");
                    score[1] = score[1] + " sec";
                    score[2] = score[2] + " sec";
                    this.setState({CountryScore2: score});
                }
            }).catch((error) => {
                console.log("Api call error" + error);
            });

            AsyncStorage.getItem("CountryScore3").then((score3) => {
                if (score3 !== null) {
                    score = score3.split(",");
                    score[1] = score[1] + " sec";
                    score[2] = score[2] + " sec";
                    this.setState({CountryScore3: score});
                }
            }).catch((error) => {
                console.log("Api call error " + error);
            });

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getColorsHighScore();
        this.getCountriesHighScore();
    }


    render() {
        const tableHead = ['Level', 'Learning Time', 'Recall Time'];
        const colorsTableData = [
            this.state.colorsHighScore1,
            this.state.colorsHighScore2,
            this.state.colorsHighScore3,
        ];
        const countriesTableData = [
            this.state.CountryScore1,
            this.state.CountryScore2,
            this.state.CountryScore3,
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
                            <Rows data={countriesTableData} style={styles.row} textStyle={styles.text}/>
                        </Table>
                        <Text style={[styles.header, {bottom: 1, fontSize: 15, marginLeft: '30%'}]}>Upgrade to Swiping
                            Pro</Text>
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
    head: {
        height: 40,
        backgroundColor: '#000',
    },
    text: {
        marginLeft: 5,
        color: '#fff'
    },
    row: {
        height: 30
    },
    table: {
        width: '98%',
        marginLeft: '1%'
    }
});
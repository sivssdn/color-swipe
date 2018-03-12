import React, {Component} from 'react';
import {ListView, StyleSheet, Text, View,} from 'react-native';
import {LinearGradient} from 'expo';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'; // 0.4.6
//import 'prop-types'; // 15.6.0

const color_data = [
    {key: 1, label: '#59323c'},
    {key: 2, label: '#260126'},
    {key: 3, label: '#F2EEB3'},
    {key: 4, label: '#BFAF80'},
    {key: 5, label: '#8C6954'},
    {key: 6, label: '#380303'},
    {key: 7, label: '#030537'},
    {key: 8, label: '#1B2343'},
    {key: 9, label: '#54709E'},
    {key: 10, label: '#00404A'},
    {key: 11, label: '#3E2F94'},
    {key: 12, label: '#636ABD'},
    {key: 13, label: '#FFDDA9'},
    {key: 14, label: '#BF5B19'},
    {key: 15, label: '#00657F'},
    {key: 16, label: '#4F280C'},
    {key: 17, label: '#010945'},
    {key: 18, label: '#D78D1E'},
    {key: 19, label: '#BF2E21'},
    {key: 20, label: '#1E2A38'},
    {key: 21, label: '#CC0005'},
    {key: 22, label: '#7F0003'},
    {key: 23, label: '#FF4C50'},
    {key: 24, label: '#FF0006'},
    {key: 25, label: '#8C1B85'},
];
var visibleColorList = [];

export default class ColorSwipe extends Component {


    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let validColors = this.createColorList();
        this.state = {
            swipesLeft: 3,
            phase: 'learning',
            phaseMessage: 'Swipe right to select',
            validColorsList: validColors,
            listViewData: validColors.map((row) => <View style={[styles.rowFront, {backgroundColor: row}]}></View>),
        };

    }


    createColorList() {
        visibleColorList = [];
        let loop1 = 10;
        while (loop1 !== 0) {
            let randomNumber = Math.floor(Math.random() * 24) + 0; //24 is ending value, 0 is starting
            if (visibleColorList.indexOf(color_data[randomNumber].label) === -1) {
                //color not found
                visibleColorList.push(color_data[randomNumber].label);
                loop1--;
            }
        }
        return visibleColorList;
    }

    shuffleVisibleColors(array) {
        //Fisher-Yates (aka Knuth) Shuffle
        var copy = [], n = array.length, i;

        // While there remain elements to shuffle…
        while (n) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * array.length);

            // If not already shuffled, move it to the new array.
            if (i in array) {
                copy.push(array[i]);
                delete array[i];
                n--;
            }
        }
        return copy;
    }

    //function for deleting a row from Swipeable List
    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }

    countSwipes() {
        let swipesLeft = this.state.swipesLeft - 1;
        if (swipesLeft > 0) {

            this.setState({swipesLeft: swipesLeft});
        } else if (swipesLeft === 0 && this.state.phase === 'learning') {
            this.setState({swipesLeft: 0}); //display no swipes left and after a while, chane state

            setTimeout(() => {
                visibleColorList = this.shuffleVisibleColors(this.state.validColorsList);
                this.setState({
                    swipesLeft: 3,
                    phase: 'recall',
                    phaseMessage: 'RECALLING PHASE',
                    listViewData: visibleColorList.map((row) => <View style={[styles.rowFront, {backgroundColor: row}]}></View>)
                });

            }, 200);


        } else if (swipesLeft === 0 && this.state.phase === 'recall') {
            this.setState({
                swipesLeft: 0,
                phase: 'over'
            });

            setTimeout(() => {alert('Over Bro')}, 200);

        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({phaseMessage: 'LEARNING PHASE'})
        }, 3000);
    }

    render() {

        return (
            <View style={styles.container}>
                <LinearGradient
                    /*colors={['#ffe259', '#ffa751']}*/
                    colors={['#1488cc', '#2b32b2']}
                    style={styles.gradient}>
                    <View style={styles.swipeLeftHeaderContainer}>

                        <Text style={styles.headerCounter}>
                            {this.state.swipesLeft}
                        </Text>
                        <Text style={styles.headerText}>
                            SWIPES LEFT
                        </Text>

                    </View>

                    <View style={styles.levelHeaderContainer}>

                        <Text style={styles.headerCounter}>
                            3
                        </Text>
                        <Text style={styles.headerText}>
                            LEVEL
                        </Text>

                    </View>
                </LinearGradient>


                <View style={{width: '100%', height: '10%', flex: 1, top: 121, alignContent: 'center'}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign: 'center'}}>
                        {this.state.phaseMessage}
                    </Text>
                </View>


                <View style={styles.list_container}>

                    <SwipeListView

                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        /*onRowClose={(data, rowKey, rowMap) => {
                            console.log('close' + data)
                        }}
                        onRowOpen={(rowKey, rowMap) => {
                            console.log('open' + rowMap[rowKey])
                        }}*/
                        onRowDidOpen={() => {
                            this.countSwipes();
                        }}
                        renderRow={(data, secId, rowId, rowMap) => (
                            <SwipeRow
                                disableLeftSwipe={true}
                                leftOpenValue={200}
                                rightOpenValue={-150}>
                                <View style={styles.rowBack}>
                                    <Text>Saving</Text>
                                    {/*<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                                        <Text style={styles.backTextWhite}>Right</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                                        onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                        <Text style={styles.backTextWhite}>Delete</Text>
                                    </TouchableOpacity>*/}
                                </View>
                                {/*Front row*/}
                                {data}

                                {/*<TouchableHighlight
                                    onPress={_ => console.log('You touched me')}
                                    style={styles.rowFront}
                                    underlayColor={'#AAA'}>

                                </TouchableHighlight>*/}
                            </SwipeRow>
                        )}
                    />

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        top: 0,
        left: 0
    },
    list_container: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top: 165,
        bottom: 0,
        left: 0,
        right: 0
    },
    swipeLeftHeaderContainer: {
        flex: 1,
        flexDirection: 'column',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    levelHeaderContainer: {
        flex: 1,
        flexDirection: 'column',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 70,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#01B20E',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '18%',
        width: '100%',
    },
    headerText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
        paddingTop: 10,
    },
    headerCounter: {
        backgroundColor: 'transparent',
        fontSize: 25,
        color: '#fff',
        paddingTop: 21,
    }
});

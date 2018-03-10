import React, {Component} from 'react';
import {ListView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import {LinearGradient} from 'expo';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'; // 0.4.6
//import 'prop-types'; // 15.6.0

const color_data = [
    {key: 1, label: '#59323c', leftLabel: 'Left 1', rightLabel: 'Right 1'},
    {key: 2, label: '#260126', leftLabel: 'Left 2', rightLabel: 'Right 2'},
    {key: 3, label: '#F2EEB3', leftLabel: 'Left 3', rightLabel: 'Right 3'},
    {key: 4, label: '#BFAF80', leftLabel: 'Left 4', rightLabel: 'Right 4'},
    {key: 5, label: '#8C6954', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 6, label: '#380303', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 7, label: '#030537', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 8, label: '#1B2343', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 9, label: '#54709E', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 10, label: '#00404A', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 11, label: '#3E2F94', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 12, label: '#636ABD', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 13, label: '#FFDDA9', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 14, label: '#BF5B19', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 15, label: '#00657F', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 16, label: '#4F280C', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 17, label: '#010945', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 18, label: '#D78D1E', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 19, label: '#BF2E21', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 20, label: '#1E2A38', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 21, label: '#CC0005', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 22, label: '#7F0003', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 23, label: '#FF4C50', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 24, label: '#FF0006', leftLabel: 'Left 5', rightLabel: 'Right 5'},
    {key: 25, label: '#8C1B85', leftLabel: 'Left 5', rightLabel: 'Right 5'},
];


export default class ColorSwipe extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basic: true,
            listViewData: color_data.map((row) => <Text>{row.label}</Text>),
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }


    render() {

        return (
            <View style={styles.container}>
                <LinearGradient
                    /*colors={['#ffe259', '#ffa751']}*/
                    colors={['#1488cc', '#2b32b2']}
                    style={styles.gradient}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        width: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <Text style={styles.headerCounter}>
                            3
                        </Text>
                        <Text style={styles.headerText}>
                            SWIPES LEFT
                        </Text>

                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        width: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <Text style={styles.headerCounter}>
                            3
                        </Text>
                        <Text style={styles.headerText}>
                            LEVEL
                        </Text>

                    </View>
                </LinearGradient>


                <View style={{width: '100%', height: '10%', flex: 1, top: 121, alignContent: 'center'}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign: 'center'}}>LEARNING PHASE</Text>
                </View>



                <View style={styles.list_container}>

                    <SwipeListView

                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        onRowClose={(data, rowKey, rowMap) => {
                            console.log('close' + data)
                        }}
                        onRowOpen={(rowKey, rowMap) => {
                            console.log('open' + rowMap[rowKey])
                        }}
                        renderRow={(data, secId, rowId, rowMap) => (
                            <SwipeRow
                                disableLeftSwipe={false}
                                leftOpenValue={100}
                                rightOpenValue={-150}>
                                <View style={styles.rowBack}>
                                    <Text>Left</Text>
                                    <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                                        <Text style={styles.backTextWhite}>Right</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                                        onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                        <Text style={styles.backTextWhite}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableHighlight
                                    onPress={_ => console.log('You touched me')}
                                    style={styles.rowFront}
                                    underlayColor={'#AAA'}>
                                    <View>
                                        {data}
                                    </View>
                                </TouchableHighlight>
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
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
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

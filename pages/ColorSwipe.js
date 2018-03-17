import React, {Component} from 'react';
import {AsyncStorage, Image, ListView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

var learningPhaseTimer, recallPhaseTimer;
export default class ColorSwipe extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let validColors = this.createColorList();
        this.state = {
            swipesLeft: 3,
            gameLevel: 0,
            phase: 'learning',
            phaseMessage: 'Swipe right to select',
            learningPhaseTimeSpent: -1,
            recallPhaseTimeSpent: -1,
            validColorsList: validColors,
            colorsLearned: [],
            colorsRecalled: [],
            listViewData: validColors.map((row) => <View style={[styles.rowFront, {backgroundColor: row}]}></View>),
        };

    }


    createColorList() {
        let visibleColorList = [];
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

    /*function counts swipes and changes the state depending upon the swipes left*/
    rightSwipe(colorIndex) {
        try {

            let colorSwiped = this.state.validColorsList[colorIndex - 10];
            //console.log(colorSwiped);
            //to access the correct color, we are getting the index of the color swiped,
            // which can be mapped to the visibleColorList

            let swipesLeft = this.state.swipesLeft - 1;
            if (swipesLeft > 0) {
                //removing swiped list from the user's view
                const colorsList = this.state.validColorsList;
                colorsList.splice(colorIndex - 10, 1);
                //colorsList[colorIndex-10]='#01B20E';

                this.setState({
                    swipesLeft: swipesLeft,
                    listViewData: colorsList.map((row) => <View style={[styles.rowFront, {backgroundColor: row}]}></View>)
                });

                if (this.state.phase === 'learning') {
                    let colorsLearnedList = this.state.colorsLearned;
                    colorsLearnedList.push(colorSwiped);
                    this.setState({colorsLearned: colorsLearnedList});
                } else if (this.state.phase === 'recall') {
                    let colorsRecalledList = this.state.colorsRecalled;
                    colorsRecalledList.push(colorSwiped);
                    this.setState({colorsRecalled: colorsRecalledList});
                }
            } else if (swipesLeft === 0 && this.state.phase === 'learning') {
                clearTimeout(learningPhaseTimer); //stopping learning phase time timer

                //recording swiped color
                let colorsLearnedList = this.state.colorsLearned;
                colorsLearnedList.push(colorSwiped);
                this.setState({swipesLeft: 0, colorsLearned: colorsLearnedList}); //display no swipes left and after a while, chane state

                //setting states to apt places
                setTimeout(() => {
                    //... spread operator with Set is used to keep the values in array unique
                    let visibleColorList = this.shuffleVisibleColors([...new Set(this.state.validColorsList.concat(this.state.colorsLearned))]);
                    this.setState({
                        swipesLeft: 3,
                        phase: 'recall',
                        phaseMessage: 'RECALL',
                        validColorsList: visibleColorList,
                        listViewData: visibleColorList.map((row) => <View style={[styles.rowFront, {backgroundColor: row}]}></View>)
                    });

                }, 200);

                //starting recall phase timer
                recallPhaseTimer = setInterval(() => {
                    this.setState({recallPhaseTimeSpent: ++this.state.recallPhaseTimeSpent});
                }, 1000);

            } else if (swipesLeft === 0 && this.state.phase === 'recall') {
                clearTimeout(recallPhaseTimer);

                let colorsRecalledList = this.state.colorsRecalled;
                colorsRecalledList.push(colorSwiped);

                this.setState({
                    swipesLeft: 0,
                    phase: 'over',
                    colorsRecalled: colorsRecalledList
                });

                setTimeout(() => {
                    //alert('Game Over');
                    this.checkResults();
                    /*console.log(this.state.colorsLearned);
                    console.log(this.state.colorsRecalled);
                    console.log(this.state.learningPhaseTimeSpent);
                    console.log(this.state.recallPhaseTimeSpent);*/
                }, 200);
            }

        } catch (error) {
            console.log(error);
        }
    }

    //function is called after both learning and recall is over to check if the user won or lost
    checkResults() {
        try {
            let errors = 0;
            let learnedColors = this.state.colorsLearned, recalledColors = this.state.colorsRecalled;
            for (let loop = 0; loop < learnedColors.length; loop++) {
                if (recalledColors.indexOf(learnedColors[loop]) === -1) {
                    errors++;
                }
            }

            if (errors > 0) {
                //user lost
                this.setState({phase: "Lost", phaseMessage: errors});
            } else {
                //user won, increase level
                this.setState({phase: "Won", phaseMessage: errors});
                let gameLevel = parseInt(String(this.state.gameLevel)) + 1;
                AsyncStorage.setItem("colorLevel", String(gameLevel));

                //for updating top scores -----------------
                AsyncStorage.getItem("colorScore1").then((error, score1) => {
                    let scoreUpdatedFlag = false;
                    if (score1 === null) {
                        //first time user has made a score
                        let newColorScore1 = this.state.gameLevel + "," + this.state.learningPhaseTimeSpent + "," + this.state.recallPhaseTimeSpent;
                        AsyncStorage.setItem("colorScore1", newColorScore1);
                        scoreUpdatedFlag = true;

                    } else {
                        let timings = score1.split(",");
                        let learningTime = parseInt(timings[1]);
                        let recallTime = parseInt(timings[2]);
                        if (this.state.learningPhaseTimeSpent < learningTime && this.state.recallPhaseTimeSpent < recallTime) {
                            let newColorScore1 = this.state.gameLevel + "," + this.state.learningPhaseTimeSpent + "," + this.state.recallPhaseTimeSpent;
                            AsyncStorage.setItem("colorScore1", newColorScore1);
                            scoreUpdatedFlag = true;
                        }
                    }

                    //wasn't the highest score, check for second highest
                    if (!scoreUpdatedFlag) {
                        AsyncStorage.getItem("colorScore2").then((error, score2) => {
                            scoreUpdatedFlag = false;
                            if (score2 === null) {
                                //first time user has made a score
                                let newColorScore2 = this.state.gameLevel + "," + this.state.learningPhaseTimeSpent + "," + this.state.recallPhaseTimeSpent;
                                AsyncStorage.setItem("colorScore2", newColorScore2);
                                scoreUpdatedFlag = true;

                            } else {
                                let timings = score2.split(",");
                                let learningTime = parseInt(timings[1]);
                                let recallTime = parseInt(timings[2]);
                                if (this.state.learningPhaseTimeSpent < learningTime && this.state.recallPhaseTimeSpent < recallTime) {
                                    let newColorScore1 = this.state.gameLevel + "," + this.state.learningPhaseTimeSpent + "," + this.state.recallPhaseTimeSpent;
                                    AsyncStorage.setItem("colorScore2", newColorScore1);
                                    scoreUpdatedFlag = true;
                                }
                            }

                            //not the second highest score, check for third highest
                            if (!scoreUpdatedFlag) {
                                AsyncStorage.getItem("colorScore3").then((error, score3) => {

                                    if (score3 === null) {
                                        //first time user has made a score
                                        let newColorScore2 = this.state.gameLevel + "," + this.state.learningPhaseTimeSpent + "," + this.state.recallPhaseTimeSpent;
                                        AsyncStorage.setItem("colorScore3", newColorScore2);


                                    } else {
                                        let timings = score2.split(",");
                                        let learningTime = parseInt(timings[1]);
                                        let recallTime = parseInt(timings[2]);
                                        if (this.state.learningPhaseTimeSpent < learningTime && this.state.recallPhaseTimeSpent < recallTime) {
                                            let newColorScore1 = this.state.gameLevel + "," + this.state.learningPhaseTimeSpent + "," + this.state.recallPhaseTimeSpent;
                                            AsyncStorage.setItem("colorScore3", newColorScore1);
                                        }
                                    }
                                }).catch((error) => {
                                    console.log(error);
                                });
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }

        } catch (error) {
            console.log(error)
        }
    }


    userScoreComponent() {
        return (
            <View style={styles.scoreContainer}>
                <Image source={require('../menu_bg.jpg')}
                       style={styles.ImageBackground}/>
                <View style={styles.containerOverlay}>
                    <Text style={styles.header}>Game {this.state.phase}!</Text>
                    <Text style={styles.text}>Learning Time: {this.state.learningPhaseTimeSpent}s</Text>
                    <Text style={styles.text}>Recall Time: {this.state.recallPhaseTimeSpent}s</Text>
                    <Text style={styles.text}>Wrong Swipes: {this.state.phaseMessage}</Text>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate('Home')
                    }}>
                        <Text>MENU</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    RenderSwipeList() {

        return (
            <SwipeListView
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                swipeToOpenPercent={5}
                onRowDidOpen={(rowId) => {
                    //rowId index of the list +10
                    this.rightSwipe(rowId.replace(/^\D+/g, ''));//get only number from the rowID (eg, s10 will be 10)

                }}
                renderRow={(data, secId, rowId, rowMap) => (
                    <SwipeRow
                        disableLeftSwipe={true}
                        leftOpenValue={200}
                        rightOpenValue={-150}
                    >
                        <View style={styles.rowBack}>
                            <Text>Swipe to save</Text>
                        </View>
                        {/*Front row*/}
                        {data}

                    </SwipeRow>
                )}
            />
        );

    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({phaseMessage: 'LEARN'})
        }, 3000);

        learningPhaseTimer = setInterval(() => {
            this.setState({learningPhaseTimeSpent: ++this.state.learningPhaseTimeSpent});
        }, 1000);

        try {
            AsyncStorage.getItem("colorLevel", (err, gameLevel) => {
                if (gameLevel === null) {
                    AsyncStorage.setItem("colorLevel", "0");
                } else {
                    //not first time
                    this.setState({gameLevel: gameLevel});
                }
            });

        } catch (error) {
            console.log(error);
        }

    }

    render() {

        if (this.state.phase === 'Won' || this.state.phase === 'Lost') {

            return (
                this.userScoreComponent()
            )

        } else {
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
                                {this.state.gameLevel}
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

                        {this.RenderSwipeList()}

                    </View>

                </View>

            );
        }
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
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '100'
    },
    scoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    header: {
        fontSize: 24,
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
    button: {
        alignSelf: 'stretch',
        position: 'absolute',
        backgroundColor: '#33bb0a',
        padding: 20,
        left: 20,
        bottom: 10,
        alignItems: 'center',
        borderRadius: 9,
        width: '90%'
    },
});

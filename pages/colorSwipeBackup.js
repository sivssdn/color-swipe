import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo';
import {SwipeableFlatList, SwipeableListItem} from 'react-native-swipeable-flat-list';

export default class ColorSwipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeVariable:true
        };
    }

    alertItemName = (item) => {
        console.log("\n--------------\n"+item);
        this.setState({
            fakeVariable: !this.state.fakeVariable,
        });

        console.log(this.state.fakeVariable);
    };

    render() {
        const data = [
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

        return (
            <View style={{flex: 1, flexDirection: 'column', top: 0, left: 0}}>

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

                <View style={{width: '100%', flex: 1, top: 121, alignContent: 'center',}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign: 'center'}}>LEARNING PHASE</Text>
                </View>

                {/*coloured list page*/}
                <SwipeableFlatList
                    style={{flex: 1, position: 'absolute', top: 181, bottom: 0, left: 0, right: 0}}
                    data={data}
                    onOpen={this.alertItemName.bind(this,'open')}
                    onClose={() => this.alertItemName('close')}
                    renderItem={({item}) => (
                        <SwipeableListItem item={<View style={{height: 100, backgroundColor: String(item.label)}}>
                            <Text style={{height: 48}}>{item.label}</Text>
                        </View>}
                                           style={{height: 100, width:'100%'}}
                                           onOpen={this.alertItemName.bind(this,item.key)}
                                           onClose={() => this.alertItemName(item.key)}
                        />
                    )}
                    renderLeft={({item}) => (
                        <View style={{height: 100, width: 200, backgroundColor: '#30383B'}}>
                            <Text style={{width: 40}}>{item.leftLabel}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.key}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 121,
        width: '100%'
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
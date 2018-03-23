import React, {Component} from 'react';
import {AsyncStorage, Image, ListView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'; // 0.4.6
//import 'prop-types'; // 15.6.0

const countries_data = [
    {name: "Afghanistan", "code": "AF"},
    {name: "Aland Islands", "code": "AX"},
    {name: "Albania", "code": "AL"},
    {name: "Algeria", "code": "DZ"},
    {name: "American Samoa", "code": "AS"},
    {name: "AndorrA", "code": "AD"},
    {name: "Angola", "code": "AO"},
    {name: "Anguilla", "code": "AI"},
    {name: "Antarctica", "code": "AQ"},
    {name: "Antigua and Barbuda", "code": "AG"},
    {name: "Argentina", "code": "AR"},
    {name: "Armenia", "code": "AM"},
    {name: "Aruba", "code": "AW"},
    {name: "Australia", "code": "AU"},
    {name: "Austria", "code": "AT"},
    {name: "Azerbaijan", "code": "AZ"},
    {name: "Bahamas", "code": "BS"},
    {name: "Bahrain", "code": "BH"},
    {name: "Bangladesh", "code": "BD"},
    {name: "Barbados", "code": "BB"},
    {name: "Belarus", "code": "BY"},
    {name: "Belgium", "code": "BE"},
    {name: "Belize", "code": "BZ"},
    {name: "Benin", "code": "BJ"},
    {name: "Bermuda", "code": "BM"},
    {name: "Bhutan", "code": "BT"},
    {name: "Bolivia", "code": "BO"},
    {name: "Bosnia and Herzegovina", "code": "BA"},
    {name: "Botswana", "code": "BW"},
    {name: "Bouvet Island", "code": "BV"},
    {name: "Brazil", "code": "BR"},
    {name: "British Indian Ocean Territory", "code": "IO"},
    {name: "Brunei Darussalam", "code": "BN"},
    {name: "Bulgaria", "code": "BG"},
    {name: "Burkina Faso", "code": "BF"},
    {name: "Burundi", "code": "BI"},
    {name: "Cambodia", "code": "KH"},
    {name: "Cameroon", "code": "CM"},
    {name: "Canada", "code": "CA"},
    {name: "Cape Verde", "code": "CV"},
    {name: "Cayman Islands", "code": "KY"},
    {name: "Central African Republic", "code": "CF"},
    {name: "Chad", "code": "TD"},
    {name: "Chile", "code": "CL"},
    {name: "China", "code": "CN"},
    {name: "Christmas Island", "code": "CX"},
    {name: "Cocos (Keeling) Islands", "code": "CC"},
    {name: "Colombia", "code": "CO"},
    {name: "Comoros", "code": "KM"},
    {name: "Congo", "code": "CG"},
    {name: "Congo, The Democratic Republic of the", "code": "CD"},
    {name: "Cook Islands", "code": "CK"},
    {name: "Costa Rica", "code": "CR"},
    {name: "Cote DIvoire", "code": "CI"},
    {name: "Croatia", "code": "HR"},
    {name: "Cuba", "code": "CU"},
    {name: "Cyprus", "code": "CY"},
    {name: "Czech Republic", "code": "CZ"},
    {name: "Denmark", "code": "DK"},
    {name: "Djibouti", "code": "DJ"},
    {name: "Dominica", "code": "DM"},
    {name: "Dominican Republic", "code": "DO"},
    {name: "Ecuador", "code": "EC"},
    {name: "Egypt", "code": "EG"},
    {name: "El Salvador", "code": "SV"},
    {name: "Equatorial Guinea", "code": "GQ"},
    {name: "Eritrea", "code": "ER"},
    {name: "Estonia", "code": "EE"},
    {name: "Ethiopia", "code": "ET"},
    {name: "Falkland Islands (Malvinas)", "code": "FK"},
    {name: "Faroe Islands", "code": "FO"},
    {name: "Fiji", "code": "FJ"},
    {name: "Finland", "code": "FI"},
    {name: "France", "code": "FR"},
    {name: "French Guiana", "code": "GF"},
    {name: "French Polynesia", "code": "PF"},
    {name: "French Southern Territories", "code": "TF"},
    {name: "Gabon", "code": "GA"},
    {name: "Gambia", "code": "GM"},
    {name: "Georgia", "code": "GE"},
    {name: "Germany", "code": "DE"},
    {name: "Ghana", "code": "GH"},
    {name: "Gibraltar", "code": "GI"},
    {name: "Greece", "code": "GR"},
    {name: "Greenland", "code": "GL"},
    {name: "Grenada", "code": "GD"},
    {name: "Guadeloupe", "code": "GP"},
    {name: "Guam", "code": "GU"},
    {name: "Guatemala", "code": "GT"},
    {name: "Guernsey", "code": "GG"},
    {name: "Guinea", "code": "GN"},
    {name: "Guinea-Bissau", "code": "GW"},
    {name: "Guyana", "code": "GY"},
    {name: "Haiti", "code": "HT"},
    {name: "Heard Island and Mcdonald Islands", "code": "HM"},
    {name: "Holy See (Vatican City State)", "code": "VA"},
    {name: "Honduras", "code": "HN"},
    {name: "Hong Kong", "code": "HK"},
    {name: "Hungary", "code": "HU"},
    {name: "Iceland", "code": "IS"},
    {name: "India", "code": "IN"},
    {name: "Indonesia", "code": "ID"},
    {name: "Iran, Islamic Republic Of", "code": "IR"},
    {name: "Iraq", "code": "IQ"},
    {name: "Ireland", "code": "IE"},
    {name: "Isle of Man", "code": "IM"},
    {name: "Israel", "code": "IL"},
    {name: "Italy", "code": "IT"},
    {name: "Jamaica", "code": "JM"},
    {name: "Japan", "code": "JP"},
    {name: "Jersey", "code": "JE"},
    {name: "Jordan", "code": "JO"},
    {name: "Kazakhstan", "code": "KZ"},
    {name: "Kenya", "code": "KE"},
    {name: "Kiribati", "code": "KI"},
    {name: "Korea, Democratic PeopleS Republic of", "code": "KP"},
    {name: "Korea, Republic of", "code": "KR"},
    {name: "Kuwait", "code": "KW"},
    {name: "Kyrgyzstan", "code": "KG"},
    {name: "Lao PeopleS Democratic Republic", "code": "LA"},
    {name: "Latvia", "code": "LV"},
    {name: "Lebanon", "code": "LB"},
    {name: "Lesotho", "code": "LS"},
    {name: "Liberia", "code": "LR"},
    {name: "Libyan Arab Jamahiriya", "code": "LY"},
    {name: "Liechtenstein", "code": "LI"},
    {name: "Lithuania", "code": "LT"},
    {name: "Luxembourg", "code": "LU"},
    {name: "Macao", "code": "MO"},
    {name: "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
    {name: "Madagascar", "code": "MG"},
    {name: "Malawi", "code": "MW"},
    {name: "Malaysia", "code": "MY"},
    {name: "Maldives", "code": "MV"},
    {name: "Mali", "code": "ML"},
    {name: "Malta", "code": "MT"},
    {name: "Marshall Islands", "code": "MH"},
    {name: "Martinique", "code": "MQ"},
    {name: "Mauritania", "code": "MR"},
    {name: "Mauritius", "code": "MU"},
    {name: "Mayotte", "code": "YT"},
    {name: "Mexico", "code": "MX"},
    {name: "Micronesia, Federated States of", "code": "FM"},
    {name: "Moldova, Republic of", "code": "MD"},
    {name: "Monaco", "code": "MC"},
    {name: "Mongolia", "code": "MN"},
    {name: "Montserrat", "code": "MS"},
    {name: "Morocco", "code": "MA"},
    {name: "Mozambique", "code": "MZ"},
    {name: "Myanmar", "code": "MM"},
    {name: "Namibia", "code": "NA"},
    {name: "Nauru", "code": "NR"},
    {name: "Nepal", "code": "NP"},
    {name: "Netherlands", "code": "NL"},
    {name: "Netherlands Antilles", "code": "AN"},
    {name: "New Caledonia", "code": "NC"},
    {name: "New Zealand", "code": "NZ"},
    {name: "Nicaragua", "code": "NI"},
    {name: "Niger", "code": "NE"},
    {name: "Nigeria", "code": "NG"},
    {name: "Niue", "code": "NU"},
    {name: "Norfolk Island", "code": "NF"},
    {name: "Northern Mariana Islands", "code": "MP"},
    {name: "Norway", "code": "NO"},
    {name: "Oman", "code": "OM"},
    {name: "Pakistan", "code": "PK"},
    {name: "Palau", "code": "PW"},
    {name: "Palestinian Territory, Occupied", "code": "PS"},
    {name: "Panama", "code": "PA"},
    {name: "Papua New Guinea", "code": "PG"},
    {name: "Paraguay", "code": "PY"},
    {name: "Peru", "code": "PE"},
    {name: "Philippines", "code": "PH"},
    {name: "Pitcairn", "code": "PN"},
    {name: "Poland", "code": "PL"},
    {name: "Portugal", "code": "PT"},
    {name: "Puerto Rico", "code": "PR"},
    {name: "Qatar", "code": "QA"},
    {name: "Reunion", "code": "RE"},
    {name: "Romania", "code": "RO"},
    {name: "Russian Federation", "code": "RU"},
    {name: "RWANDA", "code": "RW"},
    {name: "Saint Helena", "code": "SH"},
    {name: "Saint Kitts and Nevis", "code": "KN"},
    {name: "Saint Lucia", "code": "LC"},
    {name: "Saint Pierre and Miquelon", "code": "PM"},
    {name: "Saint Vincent and the Grenadines", "code": "VC"},
    {name: "Samoa", "code": "WS"},
    {name: "San Marino", "code": "SM"},
    {name: "Sao Tome and Principe", "code": "ST"},
    {name: "Saudi Arabia", "code": "SA"},
    {name: "Senegal", "code": "SN"},
    {name: "Serbia and Montenegro", "code": "CS"},
    {name: "Seychelles", "code": "SC"},
    {name: "Sierra Leone", "code": "SL"},
    {name: "Singapore", "code": "SG"},
    {name: "Slovakia", "code": "SK"},
    {name: "Slovenia", "code": "SI"},
    {name: "Solomon Islands", "code": "SB"},
    {name: "Somalia", "code": "SO"},
    {name: "South Africa", "code": "ZA"},
    {name: "South Georgia and the South Sandwich Islands", "code": "GS"},
    {name: "Spain", "code": "ES"},
    {name: "Sri Lanka", "code": "LK"},
    {name: "Sudan", "code": "SD"},
    {name: "Suriname", "code": "SR"},
    {name: "Svalbard and Jan Mayen", "code": "SJ"},
    {name: "Swaziland", "code": "SZ"},
    {name: "Sweden", "code": "SE"},
    {name: "Switzerland", "code": "CH"},
    {name: "Syrian Arab Republic", "code": "SY"},
    {name: "Taiwan, Province of China", "code": "TW"},
    {name: "Tajikistan", "code": "TJ"},
    {name: "Tanzania, United Republic of", "code": "TZ"},
    {name: "Thailand", "code": "TH"},
    {name: "Timor-Leste", "code": "TL"},
    {name: "Togo", "code": "TG"},
    {name: "Tokelau", "code": "TK"},
    {name: "Tonga", "code": "TO"},
    {name: "Trinidad and Tobago", "code": "TT"},
    {name: "Tunisia", "code": "TN"},
    {name: "Turkey", "code": "TR"},
    {name: "Turkmenistan", "code": "TM"},
    {name: "Turks and Caicos Islands", "code": "TC"},
    {name: "Tuvalu", "code": "TV"},
    {name: "Uganda", "code": "UG"},
    {name: "Ukraine", "code": "UA"},
    {name: "United Arab Emirates", "code": "AE"},
    {name: "United Kingdom", "code": "GB"},
    {name: "United States", "code": "US"},
    {name: "United States Minor Outlying Islands", "code": "UM"},
    {name: "Uruguay", "code": "UY"},
    {name: "Uzbekistan", "code": "UZ"},
    {name: "Vanuatu", "code": "VU"},
    {name: "Venezuela", "code": "VE"},
    {name: "Viet Nam", "code": "VN"},
    {name: "Virgin Islands, British", "code": "VG"},
    {name: "Virgin Islands, U.S.", "code": "VI"},
    {name: "Wallis and Futuna", "code": "WF"},
    {name: "Western Sahara", "code": "EH"},
    {name: "Yemen", "code": "YE"},
    {name: "Zambia", "code": "ZM"},
    {name: "Zimbabwe", "code": "ZW"}
];

var learningPhaseTimer, recallPhaseTimer;
export default class CountrySwipe extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let validCountriesSwipe = this.createCountriesList();
        this.state = {
            swipesLeft: 3,
            gameLevel: 0,
            phase: 'learning',
            phaseMessage: 'Swipe to select',
            learningPhaseTimeSpent: -1,
            recallPhaseTimeSpent: -1,
            validCountriesList: validCountriesSwipe,
            countriesLearned: [],
            countriesRecalled: [],
            listViewDataCountries: validCountriesSwipe.map((row) => <View style={styles.rowFront}><View><Text
                style={{color: '#fff'}}>{row}</Text></View></View>),
        };
        //row is country
    }


    createCountriesList() {
        let visibleCountriesList = [];
        let loop1 = 10;
        while (loop1 !== 0) {
            let randomNumber = Math.floor(Math.random() * 242) + 0; //24 is ending value, 0 is starting
            if (visibleCountriesList.indexOf(countries_data[randomNumber].name) === -1) {
                //color not found
                visibleCountriesList.push(countries_data[randomNumber].name);
                loop1--;
            }
        }
        return visibleCountriesList;
    }

    shuffleVisibleCountries(array) {
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
        const newData = [...this.state.listViewDataCountries];
        newData.splice(rowId, 1);
        this.setState({listViewDataCountries: newData});
    }

    /*function counts swipes and changes the state depending upon the swipes left*/
    rightSwipeCountries(countryIndex) {
        try {

            let countrySwiped = this.state.validCountriesList[countryIndex - 10];
            //console.log(countrySwiped);
            //to access the correct color, we are getting the index of the color swiped,
            // which can be mapped to the visibleColorList

            let swipesLeft = this.state.swipesLeft - 1;
            if (swipesLeft > 0) {
                //removing swiped list from the user's view
                const colorsList = this.state.validCountriesList;
                colorsList.splice(countryIndex - 10, 1);
                //colorsList[countryIndex-10]='#01B20E';

                this.setState({
                    swipesLeft: swipesLeft,
                    listViewDataCountries: colorsList.map((row) => <View
                        style={styles.rowFront}><View><Text style={{color: '#fff'}}>{row}</Text></View></View>)
                });

                if (this.state.phase === 'learning') {
                    let countriesLearnedList = this.state.countriesLearned;
                    countriesLearnedList.push(countrySwiped);
                    this.setState({countriesLearned: countriesLearnedList});
                } else if (this.state.phase === 'recall') {
                    let countriesRecalledList = this.state.countriesRecalled;
                    countriesRecalledList.push(countrySwiped);
                    this.setState({countriesRecalled: countriesRecalledList});
                }
            } else if (swipesLeft === 0 && this.state.phase === 'learning') {
                clearTimeout(learningPhaseTimer); //stopping learning phase time timer

                //recording swiped color
                let countriesLearnedList = this.state.countriesLearned;
                countriesLearnedList.push(countrySwiped);
                this.setState({swipesLeft: 0, countriesLearned: countriesLearnedList}); //display no swipes left and after a while, chane state

                //setting states to apt places
                setTimeout(() => {
                    //... spread operator with Set is used to keep the values in array unique
                    let visibleCountriesList = this.shuffleVisibleCountries([...new Set(this.state.validCountriesList.concat(this.state.countriesLearned))]);
                    this.setState({
                        swipesLeft: 3,
                        phase: 'recall',
                        phaseMessage: 'RECALL',
                        validCountriesList: visibleCountriesList,
                        listViewDataCountries: visibleCountriesList.map((row) => <View
                            style={styles.rowFront}><View><Text style={{color: '#fff'}}>{row}</Text></View></View>)
                    });

                }, 200);

                //starting recall phase timer
                recallPhaseTimer = setInterval(() => {
                    this.setState({recallPhaseTimeSpent: ++this.state.recallPhaseTimeSpent});
                }, 1000);

            } else if (swipesLeft === 0 && this.state.phase === 'recall') {
                clearTimeout(recallPhaseTimer);

                let countriesRecalledList = this.state.countriesRecalled;
                countriesRecalledList.push(countrySwiped);

                this.setState({
                    swipesLeft: 0,
                    phase: 'over',
                    countriesRecalled: countriesRecalledList
                });

                setTimeout(() => {

                    this.checkResults();

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
            let learnedCountries = this.state.countriesLearned, recalledCountries = this.state.countriesRecalled;
            for (let loop = 0; loop < learnedCountries.length; loop++) {
                if (recalledCountries.indexOf(learnedCountries[loop]) === -1) {
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
                AsyncStorage.setItem("CountryLevel", String(gameLevel));

                //for updating top scores -----------------
                this.checkUpdateTopScore1(gameLevel, this.state.learningPhaseTimeSpent, this.state.recallPhaseTimeSpent);
            }

        } catch (error) {
            console.log(error)
        }
    }

    checkUpdateTopScore1(level, learningTime, recallTime) {
        AsyncStorage.getItem("CountryScore1").then((score1) => {
            let scoreUpdatedFlag = false;
            if (score1 === null || typeof (score1) === 'undefined') {
                //first time user has made a score
                let newCountryLevel1 = level + "," + learningTime + "," + recallTime;
                AsyncStorage.setItem("CountryScore1", newCountryLevel1);
                scoreUpdatedFlag = true;

            } else {
                let timings = score1.split(",");
                let levelStored = parseInt(timings[0]);
                let learningTimeStored = parseInt(timings[1]);
                let recallTimeStored = parseInt(timings[2]);
                if ((learningTime + recallTime < learningTimeStored + recallTimeStored)) {
                    let newCountryLevel1 = level + "," + learningTime + "," + recallTime;
                    AsyncStorage.setItem("CountryScore1", newCountryLevel1);
                    scoreUpdatedFlag = true;
                    //check if the old top score is above the second or third highest
                    this.checkUpdateTopScore2(levelStored, learningTimeStored, recallTimeStored);
                }
            }
            if (!scoreUpdatedFlag) {
                //score wasn't the first top, check fr second and thord highest
                this.checkUpdateTopScore2(level, learningTime, recallTime);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    checkUpdateTopScore2(level, learningTime, recallTime) {
        AsyncStorage.getItem("CountryScore2").then((score2) => {
            let scoreUpdatedFlag = false;
            if (score2 === null || typeof (score2) === 'undefined') {
                //first time user has made a score
                let newCountryLevel2 = level + "," + learningTime + "," + recallTime;
                AsyncStorage.setItem("CountryScore2", newCountryLevel2);
                scoreUpdatedFlag = true;

            } else {
                let timings = score2.split(",");
                let levelStored = parseInt(timings[0]);
                let learningTimeStored = parseInt(timings[1]);
                let recallTimeStored = parseInt(timings[2]);
                if ((learningTime + recallTime) < (learningTimeStored + recallTimeStored)) {
                    let newCountryLevel2 = level + "," + learningTime + "," + recallTime;
                    AsyncStorage.setItem("CountryScore2", newCountryLevel2);
                    scoreUpdatedFlag = true;
                    this.checkUpdateTopScore3(levelStored, learningTimeStored, recallTimeStored);
                }
            }
            if (!scoreUpdatedFlag) {
                //if the score is updated, then check if the old top score is second or third highest
                this.checkUpdateTopScore3(level, learningTime, recallTime);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    checkUpdateTopScore3(level, learningTime, recallTime) {
        AsyncStorage.getItem("CountryScore3").then((score3) => {

            if (score3 === null || typeof (score3) === 'undefined') {
                //first time user has made a score
                let newCountryLevel3 = level + "," + learningTime + "," + recallTime;
                AsyncStorage.setItem("CountryScore3", newCountryLevel3);

            } else {
                let timings = score3.split(",");
                //let levelStored = parseInt(timings[0]);
                let learningTimeStored = parseInt(timings[1]);
                let recallTimeStored = parseInt(timings[2]);
                if ((learningTime + recallTime) < (learningTimeStored + recallTimeStored)) {
                    let newCountryLevel3 = level + "," + learningTime + "," + recallTime;
                    AsyncStorage.setItem("CountryScore3", newCountryLevel3);
                }
            }
        }).catch((error) => {
            console.log(error);
        });
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

    RenderSwipeListCountries() {

        return (
            <SwipeListView
                dataSource={this.ds.cloneWithRows(this.state.listViewDataCountries)}
                swipeToOpenPercent={5}
                onRowDidOpen={(rowId) => {
                    //rowId index of the list +10
                    this.rightSwipeCountries(rowId.replace(/^\D+/g, ''));//get only number from the rowID (eg, s10 will be 10)

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
            AsyncStorage.getItem("CountryLevel", (err, gameLevel) => {
                if (gameLevel === null) {
                    AsyncStorage.setItem("CountryLevel", "0");
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

                        {this.RenderSwipeListCountries()}

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
        backgroundColor: '#260126',
        borderBottomColor: '#fff',
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

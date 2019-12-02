import React from "react";
import { formatNum } from "../components/scanner";
import {
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    View
} from 'react-native';

export default class EditContactScreen extends React.Component {
    /*
    * name: current contact's full name
    * email: current contact's email address
    * number: current contact's phone number
    * */
    constructor(props) {
        super(props);
        this.state = {
            holderNumber: props.navigation.getParam('number'),
            holderEmail: props.navigation.getParam('email'),
            name: props.navigation.getParam('name'),
            email: props.navigation.getParam('email'),
            number: props.navigation.getParam('number'),
        }
    }

    /*
    * updates the contact's email address with the text provided
    * @param: new email address
    * */
    onEmailTextChanged = (text) => {
        if (text.includes("@")) {
            this.props.navigation.getParam('updateEmail')(text);
            this.setState({email: text})
        }
    };

    /*
    * updates the contact's phone number with the text provided
    * @param: the new phone number
    * */
    onPhoneNumberTextChanged = (text) => {
        text = text.replace(/\D/g, '');
        if (text.length === 10) {
            this.props.navigation.getParam('updatePhone')(text);
            this.setState({number: text});
        }
    };

    /*
    * navigates back to the contact detail screen, providing
    * the updated information to be loaded into the screen
    * */
    onSubmit = () => {
        let obj = {};
        if (this.state.number.length !== 10 && !this.state.email.includes("@")) {
            obj = {
                name: this.state.name,
                email: this.state.holderEmail,
                number: this.state.holderNumber,
            };
        } else if (this.state.number.length !== 10) {
            obj = {
                name: this.state.name,
                email: this.state.email,
                number: this.state.holderNumber,
            };
        } else if (!this.state.email.includes("@")) {
            obj = {
                name: this.state.name,
                email: this.state.holderEmail,
                number: this.state.number,
            };
        } else {
            obj = {
                name: this.state.name,
                email: this.state.email,
                number: this.state.number,
            };
        }
        this.props.navigation.navigate('ContactsDetailScreen', {
            ...obj,
        });
    };

    /*
    * lifecycle function to render the edit contact screen
    * */
    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1,}}>
                <View style={styles.primaryViewStyle}>
                    <View style={[styles.secondaryViewStyle, {flex: 0}]}>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent', alignItems: 'flex-end'}]}>
                            <TouchableOpacity style={styles.submitButtonStyle} onPress={this.onSubmit}>
                                <Text style={{color: 'white'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.secondaryViewStyle}>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                            <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={styles.coverImageStyle} />
                        </View>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.headerTextStyle}>Contact Details:</Text>
                        </View>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                            <Text style={[styles.sectionTextStyle, {fontSize: 25}]}>{this.state.name}</Text>
                        </View>
                        <View style={styles.tertiaryViewStyle}>
                            <Text style={styles.sectionHeaderTextStyle}>Email</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={this.state.holderEmail}
                                placeholderTextColor="#808080"
                                onChangeText={text => this.onEmailTextChanged(text)}
                            />
                        </View>
                        <View style={styles.tertiaryViewStyle}>
                            <Text style={styles.sectionHeaderTextStyle}>Phone</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={formatNum(this.state.holderNumber)}
                                placeholderTextColor="#808080"
                                onChangeText={text => this.onPhoneNumberTextChanged(text)}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    primaryViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F3F2EE',
    },
    secondaryViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 5,
    },
    tertiaryViewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginRight: 0,
        marginLeft: 0,
        marginTop: 1,
        marginBottom: 1,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 5,
        paddingBottom: 5,
    },
    // Style for a PPP photo.
    coverImageStyle: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#0083BB',
    },
    // Style for first text header.
    headerTextStyle: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 15,
        opacity: .75,
    },
    sectionHeaderTextStyle: {
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 20,
        color: '#0083BB',
    },
    sectionTextStyle: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        color: '#252422',
    },
    submitButtonStyle: {
        height: 60,
        width: 60,
        borderRadius: 40,
        backgroundColor: '#29BF89',
        justifyContent: 'center',
        alignItems: 'center'
    }
});



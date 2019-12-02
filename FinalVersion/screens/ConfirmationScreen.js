import React from 'react';
import { formatNum } from '../components/scanner';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
} from 'react-native';

export default class ConfirmationScreen extends React.Component {
    /*
    * contact: object used to represent the new contact
    * name: new contact's full name
    * email: new contact's email address
    * number: new contact's phone number
    * cardImage: new contact's business card image
    * */
    state = {
        contact: {
            name: '',
            email: '',
            number: '',
            cardImage: null,
        }
    };

    static navigationOptions = {
        title: 'Contact Confirmation',
        headerStyle: {
            backgroundColor: "#3d3d3f",
            fontColor: "#f9f8fd",
            fontWeight: "bold",
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: "#f9f8fd",
        }
    };


    /*
    * updates the contact's full name with the name provided
    * @param: contact's new name
    * */
    updateName = (name) => {
        this.setState({
            contact: {
                ...this.state.contact,
                name: name,
            }
        })
    };

    /*
    * updates the contact's email address with the email provided
    * @param: contact's new email address
    * */
    updateEmail = (email) => {
        this.setState({
            contact: {
                ...this.state.contact,
                email: email,
            }
        })
    };

    /*
    * updates the contact's phone number with the number provided
    * @param: contact's new phone number
    * */
    updatePhone = (phone) => {
        phone = phone.replace(/\D/g, '');
        if (phone.length === 10) {
            this.setState({
                contact: {
                    ...this.state.contact,
                    number: phone,
                }
            })
        }
    };

    /*
    * adds the new contact to the upper level array of contacts,
    * returns to the contact list screen
    * */
    confirm = () => {
        this.props.navigation.getParam('onAdd')(this.state.contact);
        this.props.navigation.navigate('ContactsListScreen')
    };

    /*
    * sets the contact object to the inputted object
    * @param: contact object that this.state.contact will be set to
    * */
	setContact = (obj) => {
		this.setState({ contact:obj });
	};

	/*
	* fetches the contact object from the scanner and
	* calls setContact to initialize the contact object
	* */
    componentDidMount() {
        let obj = this.props.navigation.getParam('contact');
		this.setContact(obj);
    }

    /*
    * lifecycle function to render the edit contact screen
    * */
    render() {
        return (
            <KeyboardAvoidingView style={{flex: 1,}}>
                <View style={styles.primaryViewStyle}>
                    <View style={[styles.secondaryViewStyle, {flex: 0}]}>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent', alignItems: 'flex-end'}]}>
                            <TouchableOpacity style={styles.submitButtonStyle} onPress={this.confirm}>
                                <Text style={{color: 'white'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.secondaryViewStyle}>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                            <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={styles.coverImageStyle} />
                        </View>
                        <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                            <Text style={styles.headerTextStyle}>New Contact:</Text>
                        </View>
                        <View style={styles.tertiaryViewStyle}>
                            <Text style={styles.sectionHeaderTextStyle}>Name</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={this.state.contact.name}
                                placeholderTextColor="#808080"
                                onChangeText={name => this.updateName(name)}
                            />
                        </View>
                        <View style={styles.tertiaryViewStyle}>
                            <Text style={styles.sectionHeaderTextStyle}>Email</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={this.state.contact.email}
                                placeholderTextColor="#808080"
                                onChangeText={email => this.updateEmail(email)}
                            />
                        </View>
                        <View style={styles.tertiaryViewStyle}>
                            <Text style={styles.sectionHeaderTextStyle}>Phone</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={formatNum(this.state.contact.number)}
                                placeholderTextColor="#808080"
                                onChangeText={number => this.updatePhone(number)}
                            />
                        </View>
                        <View style={{flexDirection: 'row', paddingVertical: 10, marginVertical: 10}}>
                            <Image style={{width: 100, height: 200, transform: [{ rotate: '-90deg'}]}} source={this.state.contact.cardImage} resizeMode={"contain"}/>
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
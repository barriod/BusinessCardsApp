import React from 'react';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Constants } from 'expo';

/*
 * Component encapsulating the data required to display a contact.
 */
export default class PPPScreen extends React.Component {
    //
    // Constuctor function that initializes the state.
    //
    constructor(props) {
        super(props);
        this.state = {
            name: 'Lucas Frey',
            title: 'Undergraduate Research Scholar',
            workplace: 'University of Wisconsin-Platteville',
            email: 'freyl@uwplatt.edu',
            phoneNumber: '(815) 985-1299',
        }
    }

	/*
	 * Method to convert the contact's data to a qr code.
	 * @return a string representing the class to be encoded into
	 * a qr code.
	 */
    toQR = () => {
        return `name:${this.state.name}||email:${this.state.email}||number:${this.state.phoneNumber}`;
    };

	/*
	 * Event method fired when the edit button it pressed. It will
	 * navigate to the edit screen and passed all the components
	 * current values and methods required to change those values.
	 */
    onEditButtonPressed = () => {
        this.props.navigation.navigate('PPPEditScreen', {
            name: this.state.name,
            title: this.state.title,
            workplace: this.state.workplace,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            updateName: this.updateName,
            updateTitle: this.updateTitle,
            updateWorkplace: this.updateWorkplace,
            updateEmail: this.updateEmail,
            updatePhone: this.updatePhone,
        })
    };

	/*
	 * Event method fire when the name is changed in the edit screen. It
	 * will change the name.
	 * @param newName - the new name.
	 */
    updateName = (newName) => {
        this.setState({
            name: newName,
        })
    };

	/*
	 * Event method fire when the title is changed in the edit screen. It
	 * will change the title.
	 * @param newTitle - the new title.
	 */
    updateTitle = (newTitle) => {
        this.setState({
            title: newTitle,
        })
    };

	/*
	 * Event method fire when the workplace is changed in the edit screen. It
	 * will change the workplace.
	 * @param newWorkplace - the new workplace.
	 */
    updateWorkplace = (newWorkplace) => {
        this.setState({
            workplace: newWorkplace,
        })
    };

	/*
	 * Event method fire when the email is changed in the edit screen. It
	 * will change the email.
	 * @param newEmail - the new email.
	 */
    updateEmail = (newEmail) => {
        this.setState({
            email: newEmail,
        })
    };

	/*
	 * Event method fire when the phone is changed in the edit screen. It
	 * will change the phone.
	 * @param newPhone - the new phone.
	 */
    updatePhone = (newPhone) => {
        this.setState({
            phone: newPhone,
        })
    };

	/*
	 * Lifecycle method to render the component.
	 */
    render() {
        return (
            <View style={styles.primaryViewStyle}>
                <View style={[styles.secondaryViewStyle, {flex: 0}]}>
                    <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent', alignItems: 'flex-end'}]}>
                        <TouchableOpacity style={styles.editButtonStyle} onPress={this.onEditButtonPressed}>
                            <Text style={{color: 'white'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.secondaryViewStyle}>
                    <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                        <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={styles.coverImageStyle} />
                    </View>
                    <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                        <Text style={styles.headerTextStyle}>Personal Professional Profile:</Text>
                    </View>
                    <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                        <Text style={[styles.sectionTextStyle, {fontSize: 25}]}>{this.state.name}</Text>
                    </View>
                    <View style={styles.tertiaryViewStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>Title</Text>
                        <Text style={styles.sectionTextStyle}>{this.state.title}</Text>
                    </View>
                    <View style={styles.tertiaryViewStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>Workplace</Text>
                        <Text style={styles.sectionTextStyle}>{this.state.workplace}</Text>
                    </View>
                    <View style={styles.tertiaryViewStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>Email</Text>
                        <Text style={styles.sectionTextStyle}>{this.state.email}</Text>
                    </View>
                    <View style={styles.tertiaryViewStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>Phone</Text>
                        <Text style={styles.sectionTextStyle}>{this.state.phoneNumber}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: "center", marginVertical: 15}}>
                        <QRCode
                            value={this.toQR()}
                        />
                    </View>
                </View>
            </View>
        )
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
    editButtonStyle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#29BF89',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

/*
#FFFFFF - White 
#F3F2EE - Off-White 
#0083BB - Blue
#29BF89 - Green/Teal
#BDBDBE - Light grey
#7E8D85 - Grey
#1C2127/#252422 - Black

1 to 1.61

https://creativemarket.com/blog/website-color-palettes
https://visualhierarchy.co/blog/user-interface-design-best-practices/
https://github.com/react-native-training/react-native-fonts

<View style={[styles.tertiaryViewStyle, {marginTop: 30}]}>
  <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={styles.coverImageStyle}/>
</View>
*/
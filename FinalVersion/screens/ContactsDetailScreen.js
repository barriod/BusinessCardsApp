import React from 'react';
import { formatNum } from '../components/scanner';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import QRCode from 'react-native-qrcode';

export default class ContactsDetailScreen extends React.Component {

    /*
    * contact: contact object received from the contact list
    * name: the contact's full name
    * email: the contact's email address
    * number: the contact's phone number
    * id: the contact's index in the section list
    * */
    constructor(props) {
        super(props);
        let contact = props.navigation.getParam('contact');
        this.state = {
            name: contact.name,
            email: contact.email,
            number: contact.number,
            id: contact.id,
    }}

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.getParam('name'),
    });

    /*
    * checks if any attribute of the contact object has
    * been changed, and updates if changes have been made
    * */
    componentDidUpdate(prevProps, prevState){
      if(this.state.name !== prevState.name
          || this.state.number !== prevState.number
          || this.state.email !== prevState.email)
        {
          this.props.navigation.getParam('onUpdate1')(this.state.id,
              this.state.name,
              this.state.number,
              this.state.email)
        }
    }

    /*
    * creates a string representation of the contact that will be
    * used to generate the QR code
    * @return: string representation of the contact
    * */
    toQR = () => {
        return `name:${this.state.name}||email:${this.state.email}||number:${this.state.number}`;
    };

    /*
    * navigates to the contact editing screen, providing the
    * contact's current information and all necessary update
    * functions
    * */
    onEditButtonPressed = () => {
        this.props.navigation.navigate('EditContactScreen', {
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            updateEmail: this.updateEmail,
            updatePhone: this.updatePhone,
        })
    };

    /*
    * updates the contact's email address with the inputted email
    * @param: new email address
    * */
    updateEmail = (newEmail) => {
        this.setState({
            email: newEmail,
        })
    };

    /*
    * updates the contact's phone number with the new phone number
    * @param: contact's new phone number
    * */
    updatePhone = (newPhone) => {
        this.setState({
            number: newPhone,
        })
    };

    /*
    * lifecycle function to render the contact detail screen
    * */
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
                        <Text style={styles.headerTextStyle}>Contact Profile:</Text>
                    </View>
                    <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent'}]}>
                        <Text style={[styles.sectionTextStyle, {fontSize: 25}]}>{this.state.name}</Text>
                    </View>
                    <View style={styles.tertiaryViewStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>Email</Text>
                        <Text style={styles.sectionTextStyle}>{this.state.email}</Text>
                    </View>
                    <View style={styles.tertiaryViewStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>Phone</Text>
                        <Text style={styles.sectionTextStyle}>{formatNum(this.state.number)}</Text>
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
        height: 60,
        width: 60,
        borderRadius: 40,
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

import React from 'react';
import { StyleSheet, View, Button, } from 'react-native';
import { Constants } from 'expo';
import SectionListContacts from "../components/SectionListContacts";
import { SearchBar } from 'react-native-elements';

export default class ContactsListScreen extends React.Component {

    /*
    * data: the top level app data
    * outputData: the data displayed in the section list
    * text: the string used to search for a contact
    * */
    state = {
        data: this.props.screenProps.contacts,
        outputData: this.props.screenProps.contacts,
        text: '',
    };

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Contacts List',
        headerRight: (
            <Button
                title='Add'
                color='blue'
                onPress={ () => navigation.getParam('goToAddContact')() }
            />),
        headerLeft: (
            <Button
                title='Profile'
                color='blue'
                onPress={ () => navigation.getParam('goToPPPScreen')() }
            />),
    });

    /*
    * navigates to the contact detail screen, providing the
    * inputted contact's information to be loaded into the screen
    * @param: contact that will be loaded in the contact detail screen
    * */
    showContactDetail = (contact) => {
        this.props.navigation.navigate('ContactsDetailScreen',
            {
                contact: contact,
                name: contact.name,
                number: contact.number,
                onUpdate1: this.updateContacts,
            }
        );
    };

    /*
    * initializes navigation parameters for navigating
    * */
    componentDidMount(){
        this.props.navigation.setParams({ goToAddContact: this._goToAddContact, goToPPPScreen: this._goToPPPScreen });
    }

    /*
    * updates the app level data if there have been any changes to
    * the data
    * */
    componentDidUpdate(prevProps, prevState){
        if(this.state.data !== prevState.data && this.state.outputData !== prevState.outputData)
        {
            this.props.screenProps.updateList(this.state.data)
        }
    }

    /*
    * navigates to the profile screen
    * */
    _goToPPPScreen = () => {
        this.props.navigation.navigate('PPPScreen');
    };

    /*
    * navigates to the add contact screen
    * */
    _goToAddContact = () => {
        this.props.navigation.navigate('AddContactScreen',
            {
                onUpdate: this.updateContacts1
            }
        )
    };

    /*
    * updates the data and output data with the
    * current app-level arrays
    * */
    updateContacts1 = () => {
        this.setState({
            data: this.props.screenProps.contacts,
            outputData: this.props.screenProps.contacts,
        })
    };

    /*
    * adds a new contact to the list of contacts
    * @param: contact's id, name, phone number, and email address
    * */
    updateContacts = (id, name, number, email) => {
        for(let j = 0; j < this.state.data.length; j++)
        {
            if(this.state.outputData[j].id === id)
            {
                this.setState({
                    outputData: [
                        ...this.state.outputData.filter(std => std.id !== id),
                        {name: name, number: number, email: email, id: id}
                    ].map((val, key) => ({ key, ...val })),

                    data: [
                        ...this.state.outputData.filter(std => std.id !== id),
                        {name: name, number: number, email: email, id: id}
                    ].map((val, key) => ({ key, ...val }))
                })
            }
        }
    };

    /*
    * filters the list of contacts for only those names
    * containing the text provided
    * @text: search criteria
    * */
    filterSearch(text){
        const newData = this.state.data.filter(function(item){
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.includes(textData)

        });
        this.setState({
            outputData: newData,
            text: text
        })
    }

    /*
    * lifecycle function to render the contact list screen
    * */
    render() {
        return (
            <View style={[styles.container, {backgroundColor: '#2F3237'}]}>

                <SearchBar
                    showLoading
                    platform="ios"
                    cancelButtonTitle="Cancel"
                    placeholder='Search'
                    onChangeText={(text) => this.filterSearch(text)}
                    value={this.state.text}
                />

                <SectionListContacts
                    enableEmptySection={true}
                    contacts={this.state.outputData}
                    onSelectContact={this.showContactDetail} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
    },
});


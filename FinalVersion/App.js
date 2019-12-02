import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ContactsListScreen from './screens/ContactsListScreen';
import EditContactScreen from './screens/EditContactScreen';
import ContactsDetailScreen from './screens/ContactsDetailScreen';
import AddContactScreen from './screens/AddContactScreen';
import ScannerScreen from './screens/ScannerScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import PPPScreen from './screens/PPPScreen';
import PPPEditScreen from './screens/PPPEditScreen';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import { fetchContacts } from './components/api'

const MainStack = createStackNavigator(
    {
        'ContactsListScreen': ContactsListScreen,
        'AddContactScreen': AddContactScreen,
        'ContactsDetailScreen': ContactsDetailScreen,
        'EditContactScreen' : EditContactScreen,
        'ScannerScreen' : ScannerScreen,
        'ConfirmationScreen' : ConfirmationScreen,
        'PPPScreen' : PPPScreen,
        'PPPEditScreen' : PPPEditScreen,
    },
    {
        initialRouteName: 'ContactsListScreen',
        navigationOptions: {
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: 'lightskyblue',
            },
        },
    }
);


const AppNavigator = createSwitchNavigator(
    {
        Main: MainStack,
        Login: LoginScreen,
    },
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {

    /*
    * contacts: list of contacts maintained throughout the app
    * */
    state = {
        contacts: null,
    };

    /*
    * calls the getContacts function to load the list of contacts
    * upon mounting
    * */
    componentDidMount() {
        this.getContacts();
    }

    /*
    * FOR DEMO USE ONLY
    * fetches a list of contacts to populate the app-level
    * list of contacts
    * */
    getContacts = async () => {
        const results = await fetchContacts();
        this.setState({ contacts: results });
    };

    /*
    * adds a new contact object to the app-level list of contacts
    * @param: new contact that will be added
    * */
    addContact = (newContact) => {
        let last = (this.state.contacts.length- 1);
        let lastId = this.state.contacts[last].id;
        let newContact1 = {
            name: newContact.name,
            number: newContact.number,
            email: newContact.email,
            id: (lastId + 1),
        };

        this.setState({
            contacts: [...this.state.contacts, newContact1],
        });
    };

    /*
    * sets the app level contact provided list of contacts
    * @param: new list of contacts
    * */
    updateList = (newList) => {
        this.setState({
            contacts: newList,
        });
    };

    /*
    * lifecycle function to render the application
    * */
    render() {
    return <AppContainer screenProps={{
        contacts: this.state.contacts,
        addContact: this.addContact,
        updateList: this.updateList
      }}/>
    }
}

import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },

  homeScreenButton: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
  },
  homeScreenButton2: {
    alignItems: 'center',
    backgroundColor: 'orangered',
    padding: 10,
  }
});


export default class AddContactScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Add Contact',
  };

  /*
  * name: the new contact's name
  * number: the new contact's phone number
  * email: the new contact's email address
  * isFormValid: true if form is ready for submission
  * updated: true if the contact's information has been updated
  */
  state = {
    name: '',
    number: '',
    email: '',
    isFormValid: false,
    updated: false,
  };

  /*
  * Checks if any of the contact's information fields have been
  * changed from the last state. Validates form if changes have
  * been made, and calls the upper level update function
  * */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name
        || this.state.number !== prevState.number
        || this.state.email !== prevState.email)
      this.validateForm();

    if(this.state.updated !== prevState.updated)
    {
      this.props.navigation.getParam('onUpdate')()
    }
  }

  /*
  * update's the contacts name with the inputted name
  * @param: new contact name
  * */
  handleNameChange = (name) => {
    this.setState({ name: name });
  };

  /*
  * update's the contacts email with the inputted email
  * @param: new contact email
  * */
  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  /*
  * update's the contacts phone with the inputted phone
  * @param: new contact phone
  * */
  handleNumberChange = (number) => {
    if (+number >= 0 && number.length <= 10) {
      this.setState({ number });
    }
  };

  /*
  * adds a new contact object to the list of contacts
  * @param: conatct object from the scanner component
  * */
  handleSubmitThroughScanner = (obj) => {
    let contact = {
      name: obj.name,
      number: obj.number,
      email: obj.email,
    };
    this.props.screenProps.addContact(contact);
    this.setState({
      updated: !this.state.updated,
    })
  };
  
  /*
  * adds the new contact object to the upper level
  * array of contacts, and sets updated to false
  * */
  handleSubmit = () => {
    let contact = {
      name: this.state.name,
      number: this.state.number,
      email: this.state.email,
    };
    this.props.screenProps.addContact(contact);
    this.setState({
      updated: !this.state.updated,
    })
  };

  /*
  * validates the contact's information fields. If all fields
  * meet the requirements, user will be allowed to submit the new
  * contact
  * */
  validateForm = () => {
    if (+this.state.number >= 0 && this.state.number.length === 10
        && this.state.name.length > 3 && this.state.email.includes("@"))
      this.setState({ isFormValid: true });
    else
      this.setState({ isFormValid: false });
  };

  /*
  * Lifecycle component to render the screen
  * */
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Name...'
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <TextInput
          style={styles.input}
          value={this.state.number}
          maxLength={10}
          keyboardType = 'numeric'
          placeholder='phone number...'
          onChangeText={this.handleNumberChange}
        />
        <TextInput
          style={styles.input}
          value={this.state.email}
          maxLength={30}
          placeholder='Email...'
          onChangeText={this.handleEmailChange}
        />
        <Button
          title='Add Contact'
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />

        <TouchableOpacity style={styles.homeScreenButton} onPress={()=>this.props.navigation.navigate('ContactsListScreen')}>

          <Text style={{ fontSize: 20 }}>Contacts list Screen</Text>
        </TouchableOpacity>
		
		<TouchableOpacity
            style={styles.homeScreenButton2}
            onPress={()=>this.props.navigation.navigate('ScannerScreen', {
              onAdd:this.handleSubmitThroughScanner
            })}>

          <Text style={{ fontSize: 20 }}>Use Scanner</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

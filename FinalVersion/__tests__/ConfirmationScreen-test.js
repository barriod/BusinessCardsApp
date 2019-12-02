import 'react-native';
import React from 'react';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import renderer from 'react-test-renderer';

beforeEach(() => {
    ConfirmationScreen.prototype.componentDidMount = () => {};
}, 0);


it('Testing modification of data in ConfirmationScreen', () => {
    let confirmationScreen = renderer.create(<ConfirmationScreen/>).getInstance();

    confirmationScreen.state.contact = {
        name: 'John Doe',
        email: 'doej@uwplatt.edu',
        number: '5555555555',
        cardImage: null,
    };
    confirmationScreen.updateName('Sam Smith');
    expect(confirmationScreen.state.contact.name).toBe('Sam Smith');

    confirmationScreen.updateEmail('smiths@uwplatt.edu');
    expect(confirmationScreen.state.contact.email).toBe('smiths@uwplatt.edu');

    confirmationScreen.updatePhone('9208675309');
    expect(confirmationScreen.state.contact.number).toBe('9208675309');

    let new_contact = {
        name: 'Barack Obama',
        email: 'obamab@uwplatt.edu',
        number: '1110001111',
        cardImage: null,
    };

    confirmationScreen.setContact(new_contact);
    expect(confirmationScreen.state.contact).toBe(new_contact);
});
import 'react-native';
import React from 'react';
import AddContactScreen from '../screens/AddContactScreen';
import renderer from 'react-test-renderer';




test('handle name change - unit test - Test Case 0',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleNameChange("Doug Selent");
    expect(contactData.state.name).toBe("Doug Selent");
});

test('handle email change - unit test - Test Case 1',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleEmailChange("DougSelent@example.com");
    expect(contactData.state.email).toBe("DougSelent@example.com");
});

test('handle number change - unit test - Test Case 2',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleNumberChange("1231231234");
    expect(contactData.state.number).toBe("1231231234");
});

//TEST CASES------------------

test('Adding Contacts: handle filling fields validation - unit test case 3',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleNameChange("");
    contactData.handleNumberChange("");
    contactData.handleEmailChange("");
    expect(contactData.state.isFormValid).toBe(false);
});

test('Adding Contacts: handle name validation - unit test case 4',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleEmailChange("barriod@example.com");
    contactData.handleNumberChange("1234567890");
    contactData.handleNameChange("Daniel Barrio");
    expect(contactData.state.isFormValid).toBe(true);
});

test('Adding Contacts: handle name validation - unit test case 5',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleEmailChange("barriod@example.com");
    contactData.handleNumberChange("1234567890");
    contactData.handleNameChange("D");
    expect(contactData.state.isFormValid).toBe(false);
});

//--------

test('Adding Contacts: handle phone number validation - unit test case 6',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleEmailChange("barriod@example.com");
    contactData.handleNameChange("Daniel Barrio");
    contactData.handleNumberChange("1234567890");
    expect(contactData.state.isFormValid).toBe(true);
});

test('Adding Contacts: handle phone number validation - unit test case 7',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleEmailChange("barriod@example.com");
    contactData.handleNameChange("Daniel Barrio");
    contactData.handleNumberChange("123456");
    expect(contactData.state.isFormValid).toBe(false);
});

//--------

test('Adding Contacts: handle email validation - unit test case 8',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleNameChange("Daniel Barrio");
    contactData.handleNumberChange("1234567890");
    contactData.handleEmailChange("barriod@example.com");
    expect(contactData.state.isFormValid).toBe(true);
});

test('Adding Contacts: handle email validation - unit test case 9',()=>{
    let contactData= renderer.create(<AddContactScreen/>).getInstance();
    contactData.handleNameChange("Daniel Barrio");
    contactData.handleNumberChange("1234567890");
    contactData.handleEmailChange("barriod");
    expect(contactData.state.isFormValid).toBe(false);
});

//--------

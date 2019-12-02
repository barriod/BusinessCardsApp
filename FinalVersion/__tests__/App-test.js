import 'react-native';
import React from 'react';
import { addContact } from '../App'
import renderer from "react-test-renderer";
import App from '../App';

test('App: handle list creation validation - unit test case 10',()=>{
    let appList= renderer.create(<App/>).getInstance();
    let newContact1 = {
        name: "Daniel Barrio",
        number: "1234567890",
        email: "barriod@uwplatt.edu",
        id: (1),
    };
    let newContact2 = {
        name: "Daniel Zellmer",
        number: "1234567890",
        email: "zellmerd@uwplatt.edu",
        id: (2),
    };
    let newContact3 = {
        name: "Aidan Zastrow",
        number: "1234567890",
        email: "zastrowa@uwplatt.edu",
        id: (3),
    };
    let contacts1 = [newContact1, newContact2, newContact3];

    appList.updateList(contacts1);
    expect(appList.state.contacts).toEqual([{"email": "barriod@uwplatt.edu", "id": 1, "name": "Daniel Barrio", "number": "1234567890"},
                                                {"email": "zellmerd@uwplatt.edu", "id": 2, "name": "Daniel Zellmer", "number": "1234567890"},
                                                {"email": "zastrowa@uwplatt.edu", "id": 3, "name": "Aidan Zastrow", "number": "1234567890"}] );
});


test('App: handle contact creation validation - unit test case 11',()=>{
    let appData = renderer.create(<App/>).getInstance();
    let newContact1 = {
        name: "Daniel Barrio",
        number: "1234567890",
        email: "barriod@uwplatt.edu",
        id: (1),
    };
    let newContact2 = {
        name: "Daniel Zellmer",
        number: "1234567890",
        email: "zellmerd@uwplatt.edu",
        id: (2),
    };
    let contacts = [newContact1];

    appData.updateList(contacts);
    appData.addContact(newContact2);
    let last = (appData.state.contacts.length- 1);
    expect(appData.state.contacts[last]).toEqual({"email": "zellmerd@uwplatt.edu", "id": 2, "name": "Daniel Zellmer", "number": "1234567890"},);
});
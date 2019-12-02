import React from 'react';
import Scanner from '../components/scanner';

export default class ScannerScreen extends React.Component {

  // navigates to the new contact confirmation screen,
  // passing the object received from the scanner component
  // to be parsed by the confirmation screen
  // @param: contact object that will be parsed and confirmed
  sendToConfirm = (obj) => {
      this.props.navigation.push('ConfirmationScreen', { contact: obj, onAdd: this.props.navigation.getParam('onAdd')})
  };


  render() {
    return <Scanner sendToConfirm={this.sendToConfirm}/>
  }
}
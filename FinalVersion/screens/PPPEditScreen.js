import React from 'react';
import { 
  Text,
  Image,
  TextInput,
  StyleSheet, 
  TouchableOpacity,
  KeyboardAvoidingView,
  View
  } from 'react-native';
import { Constants } from 'expo';

/*
 * Component to encapsulate the data related to editing a contact.
 */
export default class PPPEditScreen extends React.Component {
  
/*
 * Constructor method that will instantiate the component.
 * @param props - the paramters passed to the constructor.
 */
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newWorkplace: '',
      newEmail: '',
      newPhoneNumber: '',
    }
  }

  /*
   * Event method fired with the name text is changed.
   * @param text - the new text to be assigned.
   */
  onNameTextChanged = (text) => {
    this.props.navigation.getParam('updateName')(text)
  };

  /*
   * Event method fired with the name title is changed.
   * @param text - the new text to be assigned.
   */
  onTitleTextChanged = (text) => {
    this.props.navigation.getParam('updateTitle')(text)
  };

  /*
   * Event method fired with the workplace text is changed.
   * @param text - the new text to be assigned.
   */
  onWorkplaceTextChanged = (text) => {
    this.props.navigation.getParam('updateWorkplace')(text)
  };

  /*
   * Event method fired with the email text is changed.
   * @param text - the new text to be assigned.
   */
  onEmailTextChanged = (text) => {
    this.props.navigation.getParam('updateEmail')(text)
  };

  /*
   * Event method fired with the phone number text is changed.
   * @param text - the new text to be assigned.
   */
  onPhoneNumberTextChanged = (text) => {
    this.props.navigation.getParam('updatePhone')(text)
  };
  
  /*
   * Lifecycle method that will render the component.
   */
  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1,}}>
        <View style={styles.primaryViewStyle}>
          <View style={[styles.secondaryViewStyle, {flex: 0}]}>
            <View style={[styles.tertiaryViewStyle, {backgroundColor: 'transparent', alignItems: 'flex-end'}]}>
              <TouchableOpacity style={styles.editButtonStyle} onPress={this.onEditButtonPressed}>
                <Text style={{color: 'white'}}>Submit</Text>
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
              <Text style={[styles.sectionTextStyle, {fontSize: 25}]}>{this.props.navigation.getParam('name')}</Text>
            </View>
            <View style={styles.tertiaryViewStyle}>
              <Text style={styles.sectionHeaderTextStyle}>Title</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder={this.props.navigation.getParam('title')}
                placeholderTextColor="#808080"
                onChangeText={text => this.onTitleTextChanged(text)}
              />
            </View>
            <View style={styles.tertiaryViewStyle}>
              <Text style={styles.sectionHeaderTextStyle}>Workplace</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder={this.props.navigation.getParam('workplace')}
                placeholderTextColor="#808080"
                onChangeText={text => this.onWorkplaceTextChanged(text)}
              />
            </View>
            <View style={styles.tertiaryViewStyle}>
              <Text style={styles.sectionHeaderTextStyle}>Email</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder={this.props.navigation.getParam('email')}
                placeholderTextColor="#808080"
                onChangeText={text => this.onEmailTextChanged(text)}
              />
            </View>
            <View style={styles.tertiaryViewStyle}>
              <Text style={styles.sectionHeaderTextStyle}>Phone</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder={this.props.navigation.getParam('phoneNumber')}
                placeholderTextColor="#808080"
                onChangeText={text => this.onPhoneNumberTextChanged(text)}
              />
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
})
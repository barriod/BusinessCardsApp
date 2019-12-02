import React from 'react';
import { SectionList, Text } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Row from './Row';

/*
 * Function to render the header of each section in the sectionListConacts.
 * @param section - the section.
 * @return a header representation of the section.
 */
const renderSectionHeader = ({ section }) => {
  return (
      <View style={{height: 20, paddingLeft: 20, backgroundColor: '#2F3237'}}>
          <Text style={{fontSize: 16, fontFamily: 'HelveticaNeue-Bold', color: 'white'}}>{section.title}</Text>
      </View>
  )
}

/*
 * Function that will return a section list of the contacts. It will
 * parse through a list of contact passed to it, create sections, and
 * populate each section with items.
 * @param props - Contains all things passed to it.
 * @return a section list.
 */
const SectionListContacts = props => {

  const renderItem = ({ item }) => <Row {...item} onSelectContact={props.onSelectContact} />

    const itemSeparator = () => {
        return (
            //Item Separator
            <View style={{height: 0.5, width: '100%', backgroundColor: 'white'}}/>
        );
    };

  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {});


  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    data: contactsByLetter[letter],
    title: letter,
  }));

  return <SectionList
   sections={sections} renderItem={renderItem} 
   renderSectionHeader={renderSectionHeader}
   renderItem={renderItem}
   />
};

SectionListContacts.propTypes = {
  contacts: PropTypes.array,
};


export default SectionListContacts;

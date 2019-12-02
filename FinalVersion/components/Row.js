import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import PropTypes from "prop-types"
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
    row: {
        flex: 1,
        backgroundColor: '#F3F2EE',
  }
});

/*
 * Function that creates a row object for each contact in the contact list object.
 * @return a contant list item.
 */
const Row = props => (
  <TouchableOpacity style={[styles.row, {marginBottom: 5}]} onPress={() => props.onSelectContact(props)}>
    <View style={{flex: 1, flexDirection: 'row', height: 50, backgroundColor: '#2F3237'}}>
      <View style={{width: 50, height: 50, justifyContent: 'center'}}>
          <Icon name='person' color='white' style={{width: 50, height: 50,}} />
      </View>
      <View style={{marginLeft: 10, justifyContent: 'center'}}>
          <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Bold', color: 'white'}}>{props.name}</Text>
          <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue-Light', color: 'white' }}>{props.email}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

/*
 * Determines the required props to be passed to the Row component.
 */
Row.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Row;

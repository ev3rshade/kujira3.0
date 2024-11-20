/*import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StatusBar,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';




import 'react-native-get-random-values'; // import get-random-values to get uuid to work
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID

// custom components
import AsyncStorage from '@react-native-async-storage/async-storage'; // used to store the current list being rendered from the SQLite database

import { fetchList, fetchItem } from '../../components/asyncFunctions'


const KanjiBox = ({
    title, 
    value, 
    placeholder, 
    handleChangeText, 
    handlePress1,
    handlePress2,
    otherStyles, 
  }) => {
    
    return (
      <View style={styles.container}>
          <Text style={styles.text}> {title} </Text>
          <View style={styles.middle}>
          </View>
          </View>
        <Text
            numberOfLines={1}
            style={styles.text2}
          >
            {value}
          </Text>
      </View>
    )
  }



// <<<<<<<<<< COMPONENT THAT'S EXPORTED >>>>>>>>>>>>>


// the kanji list component -- dynamically renders the list provided from the comopenents above
const Deck = () => {


  // screen rendering
  return (
    <>
    <View gap = {7} alignItems='center'>
      <View flexDirection='row'gap={7}>
      <TouchableOpacity style={styles.button2} onPress={() => {}}><Text> Edit </Text></TouchableOpacity>
      </View>
    </View>


    <ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        {currentList.length ? (
          currentList.map((kanji, index) => (
            <KanjiBox title={'Kanji ' + (index + 1)} value={kanji.value} handlePress1={() => console.log('handlePress1') } handlePress2={() => removeItem(index)} key={index}/>
          ))
        ) : (
          <View style={{ height: 100 }} />
        )}
      </View>  
    </ScrollView>
  </>
  );
};

//<<<<<<<<<<<<<<<<<<<<<<END OF COMPONENET THAT'S EXPORTED>>>>>>>>>>>>>>>>>>>>>>>>>>



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems:'center',
    gap: 7,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    flexDirection:'column',
    width: 20,
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#dadbf7',
    borderWidth: 3,
    borderRadius: 20,
  },
  bottom: {
    flex: 0.3,
    flexDirection:'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
  },

  input: { // text input
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: { // button
    padding: 3,
    backgroundColor: 'black',
    color: 'black',
    borderRadius: 5,
    borderWidth: 5,
    alignItems: 'center',
  },
  button2: {
    padding: 3,
    backgroundColor: 'white',
    color: 'white',
    borderRadius: 5,
    borderWidth: 5,
    alignItems: 'center',
    width: 70,
    height: 30,
  },
  text:{ // text for header
    fontSize: 10,
    textAlign: 'center',
  },
  text2: {
    color: 'blue',
    fontSize: 100,
    textAlign: 'center'
  },

});

export default Deck; */

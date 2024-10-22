import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native';


import 'react-native-get-random-values'; // import get-random-values to get uuid to work
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID

// custom components
import KanjiBox from '../../components/kanjiBox.jsx'; // used in screen rendering
import AsyncStorage from '@react-native-async-storage/async-storage'; // used to store the current list being rendered from the SQLite database
import { KanjiListBase } from '../../components/kanjiListBase.jsx' // used as a context component to transfer the list being rendered between screens (kanjiList.jjsx <-> practice.jsx)




// <<<<<<<<<< COMPONENT THAT'S EXPORTED >>>>>>>>>>>>>


// the kanji list component -- dynamically renders the list provided from the comopenents above
const KanjiList = () => {

  // const created from the context of the context component
  const {kanjiList, toggleKanji, addKanji, deleteKanji, getKanji } = useContext(KanjiListBase);
  

  // useState const used to update and receive text input from the TextInput component
  const [newKanji, setNewKanji] = useState('');


  // const to store text at the top of the screen
  const kanjiStatus = 'Input one kanji character then click add to add to your deck'


  // function that checks if the character input inside the TextInput is a valid kanji character using unicode
  function isKanji(ch) {
    return (ch >= "一" && ch <= "龯") ||
    (ch >= "㐀" && ch <= "䶿"); 
  }


  // function to clear all the kanji if needed (dev use for now)
  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
  }


  // screen rendering
  return (
    <ScrollView> {/*scrollable so you can scroll thru the list as it gets longer*/}
      
      {/*header portion -- static, bsesides text input getting updated*/}
      <View gap = {7}> {/* fix this view styling*/}
        <Text style={styles.text}>
          {kanjiStatus}
        </Text>
        <TextInput
          value={newKanji}
          onChangeText={val => setNewKanji(val)}
          style={styles.input}
          placeholder="Enter new kanji"
        />
        {/*first condition checks if input is empty, second condition checks if input length is only one character, third condition checks whether the input is a kanji or not */}
        <Button title='add kanji' style={styles.button} onPress={() => { 
           if ((newKanji) && (newKanji.length == 1) && isKanji(newKanji.charAt(0))) {addKanji(newKanji); setNewKanji('')}}} />

        {/*button to delete all kanji content if needed*/}
        {/*<Button title= 'delete all' style={styles.button} onPress={() => { clearAppData() }} />*/}
      </View>



      {/*dynamically rendered list portion -- dynamic*/}
      <View style={{ paddingHorizontal: 16 }}>
        {kanjiList.length ? (
          kanjiList.map((kanji, index) => (
            <KanjiBox title={'Kanji ' + (index + 1)} value={kanji.name} handlePress1={() => toggleKanji(kanji.id, 'isChecked', !kanji.isChecked)} handlePress2={() => deleteKanji(kanji.id)} key={kanji.id}/>
          ))
        ) : (
          <View style={{ height: 100 }} />
        )}
      </View>


      
    </ScrollView>
  );
};

//<<<<<<<<<<<<<<<<<<<<<<END OF COMPONENET THAT'S EXPORTED>>>>>>>>>>>>>>>>>>>>>>>>>>



const styles = StyleSheet.create({
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
    alignItems: 'center'
  },
  text:{ // text for header
    fontSize: 10,
    textAlign: 'center',
  }
});

export default KanjiList;
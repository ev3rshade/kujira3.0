import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KanjiBox } from '../../components/kanjiBox.jsx'
import { KanjiListBase } from '../../components/kanjiListBase.jsx' // used as a context component to transfer the list being rendered between screens (kanjiList.jjsx <-> practice.jsx)




  
// <<<<<<<<<< COMPONENT THAT'S EXPORTED >>>>>>>>>>>>>


// the kanji list component -- dynamically renders the list provided from the comopenents above
const EditKanjiList = () => {
  // const created from the context of the context component
  const { data, currentDeck, loading, setCurrent } = useContext(KanjiListBase);
  

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
        console.log('appDataCleared')
    } catch (error) {
        console.error('Error clearing app data.');
    }
  }

  /*function removeItem(index) {
    const tempList = currentList
    tempList.splice(index, 1)
    setCurrentList([...tempList])
    console.log("delete Pressed")
    //clearAppData()
    
  }

  function addItem(item) {
    const newKanjiItem = {
      id: uuidv4(),
      value: item,
    }
    setCurrentList([...currentList, newKanjiItem])
  }*/


  // screen rendering
  return (
    <>
    <View gap = {7} alignItems='center'>
      <View flexDirection='row'gap={7}>
      <TouchableOpacity style={styles.button2} onPress={() => console.log("save not set yet")}><Text> Save </Text></TouchableOpacity>
      <TouchableOpacity style={styles.button2}><Text> delete </Text></TouchableOpacity>
      </View>
        <Text style={styles.text}>
          {kanjiStatus}
        </Text>
        <TextInput
          value={newKanji}
          onChangeText={val => setNewKanji(val)}
          style={styles.input}
          placeholder="Enter new kanji"
        />
        
        <Button title='add kanji' style={styles.button} onPress={() => { 
           if ((newKanji) && (newKanji.length == 1) && isKanji(newKanji.charAt(0))) {addItem(newKanji); setNewKanji('')}}} />

        

    </View>
    <ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        {(currentDeck !== null && currentDeck.length) ? (
          currentDeck.map((kanji, index) => (
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

export default EditKanjiList;
import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';


import 'react-native-get-random-values'; // import get-random-values to get uuid to work
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID

// custom components
import { KanjiBox } from '../../components/kanjiBox.jsx'
import { KanjiListBase } from '../../components/kanjiListBase.jsx' // used as a context component to transfer the list being rendered between screens (kanjiList.jjsx <-> practice.jsx)
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';





  
// <<<<<<<<<< COMPONENT THAT'S EXPORTED >>>>>>>>>>>>>


// the kanji list component -- dynamically renders the list provided from the comopenents above
const EditKanjiList = () => {
  const { data, currentDeck, loading, setCurrentDeck, setCurrent, setLoading, editStorage } = useContext(KanjiListBase);
  // const created from the context of the context component
  console.log("currentdeck: " + currentDeck)
  var currentDeck1 = (currentDeck != null) ? currentDeck.replaceAll("\"", "") : ""
  var deckID = (currentDeck != null) ? currentDeck1.substring(4, currentDeck1.search("name:") - 1) : ""
  var deckName = (currentDeck != null) ? currentDeck1.substring(currentDeck1.search("name:") + 5, currentDeck1.search("list:") - 1) : ""
  console.log(deckID)
  const[list, setList] = useState((currentDeck != null) ? currentDeck1.substring(currentDeck1.search("list:") + 6, currentDeck1.length - 2).split(",") : [])

  // useState const used to update and receive text input from the TextInput component
  const [edit, setEdit] = useState(false)
  const [newKanji, setNewKanji] = useState('')
  const [kanjiList, setKanjiList] = useState(list)
  const [newDeckName, setNewDeckName] = useState("new deck")
  
  if (loading) {
    console.log('loading')
    return (
      <Text> loading </Text>
    )
  } 


  // const to store text at the top of the screen
  const kanjiStatus = 'Input one kanji character then click add to add to your deck'


  // function that checks if the character input inside the TextInput is a valid kanji character using unicode
  function isKanji(ch) {
    return (ch >= "一" && ch <= "龯") ||
    (ch >= "㐀" && ch <= "䶿"); 
  }


  function removeItem(index) {
    const tempList = kanjiList
    tempList.splice(index, 1)
    setKanjiList([...tempList])
    console.log("delete Pressed")
    //clearAppData()
    
  }

  function addItem(item) {
    setKanjiList([...kanjiList, item])
  }

  function editFunc(id, name) {
    if(id == null || id == "" || name == null || name == "") {
      return
    }
    setLoading(true)
    editStorage(id, name, kanjiList)
    console.log(kanjiList)
    setCurrentDeck("{\"id\":\"" + id + "\",\"name\":\"" + JSON.stringify(name) + "\",\"list\":[\"" + kanjiList.join("\",\"") +"\"]}")
    console.log("new current deck: " + currentDeck)
    setEdit(false)
  }


  
  // screen rendering
  if (currentDeck == null) {
    return (
        <SafeAreaProvider>
          <SafeAreaView>
        <View gap = {7} justifyContent='center'>
        <Text>Name your deck</Text>
        <TextInput
              value={newDeckName}
              onChange={val => setNewDeckName(val)}
              style={styles.input}
              placeholder="Enter a deck name"
        />
          <View flexDirection='row'gap={7}>
          <TouchableOpacity style={styles.button2} onPress={() => editFunc(uuidv4(), newDeckName)}><Text> Save </Text></TouchableOpacity>
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
            {(kanjiList !== null && kanjiList.length) ? (
                kanjiList.map((kanji, index) => (
                  <KanjiBox title={'Kanji ' + (index + 1)} value={kanji} handlePress1={() => console.log('handlePress1') } handlePress2={() => removeItem(index)} editMode={true} key={index}/>
                ))
              ) : (
                <View style={{ height: 100 }} />
            )}
          </View>


          
        </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
  
  if (!edit) {
    return (
      <SafeAreaProvider backgroundColor='gray'>
      <SafeAreaView height={window.innerHeightheight} gap={10} style={{alignItems:'center'}}>
        <View flexDirection='row' justifyContent='center' gap={100}>
          <Text>{deckName}</Text>
          <TouchableOpacity onPress={() => setEdit(true)} style={styles.button2}>
            <Text> Edit </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View style={{ paddingHorizontal: 16, gap: 10}}>
          {(kanjiList !== null && kanjiList.length) ? (
              kanjiList.map((kanji, index) => (
                <KanjiBox title={'Kanji ' + (index + 1)} value={kanji} handlePress1={() => console.log('handlePress1') } handlePress2={() => removeItem(index)} editMode={false} key={index}/>
              ))
            ) : (
              <View style={{ height: 100 }} />
          )}
        </View>


        
      </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    )
  }

  return (
    <>
    <View gap = {7} alignItems='center'>
    <Text>{deckName}</Text>
      <View flexDirection='row'gap={7}>
      <TouchableOpacity style={styles.button2} onPress={() => editFunc(deckID, deckName)}><Text> Save </Text></TouchableOpacity>
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
        {(kanjiList !== null && kanjiList.length) ? (
            kanjiList.map((kanji, index) => (
              <KanjiBox title={'Kanji ' + (index + 1)} value={kanji} handlePress1={() => console.log('handlePress1') } handlePress2={() => removeItem(index)} editMode={true} key={index}/>
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
    borderWidth: 3,
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

})

export default EditKanjiList;
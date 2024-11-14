import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setList, setItem, fetchList } from '../components/asyncFunctions.jsx'

import 'react-native-get-random-values'; // import get-random-values to get uuid to work
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID
import { KanjiListBase } from '../components/kanjiListBase.jsx'

//export const CurrentDeck = createContext();

const DeckCard = ({
  deckID,
  title,
  kanjiList,
  handlePress,
}) => {
  return (
    <View>
      <Link href="/kanjiList" asChild style={{ textAlign:'center', fontSize: 20, color: 'blue' }}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text>{title}</Text>
          <Text>
            {kanjiList[0]}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const goToScreen = ({
  screen
}) => {
  router.push({screen});
}

const getStoredDecks = async () => {
  try {
    const IDs = JSON.parse(await AsyncStorage.getItem('mainList'))
    return IDs
  } catch (e) {
    console.log(error)
  }
}

const setDefault = async function() {
  try {
    await AsyncStorage.clear()
    await setList('default', JSON.stringify([{id: 'default', name: 'default', list:["鯨"]}]))
  } catch (error) {
      console.error('Error clearing app data.');
  }
}

const createDeck = async () => {
  id = uuidv4()
  setCurrent([])
}



export default function App() {
  const { data, currentDeck, loading, setCurrent } = useContext( KanjiListBase );
  console.log("context provided:")
  console.log(data)
  console.log(data[0])
  //JSON.stringify(fetchList(currentListID)).split(",")
  

  if (loading) {
    console.log('loading')
    return (
      <Text> loading </Text>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar/>
      <Text> Welcome back </Text>
      <Link href="/kanjiList" asChild style={{ textAlign:'center', fontSize: 20, color: 'blue' }}>
        <TouchableOpacity style={styles.button}>
          <Text>
            Begin Practicing
          </Text>
        </TouchableOpacity>
      </Link>
      
      
      <View style={{ paddingHorizontal: 16 }}>
        { (typeof data != 'undefined' && data.length) ? (
          JSON.parse(data[0][1]).map((deck, index) => (
            <DeckCard 
              deckID={deck.id} 
              title={deck.name}
              kanjiList={deck.list[0]} 
              handlePress = { () =>
                setCurrent(deck.id)
              } 
              key={index}/>
          ))
        ) : (
          <View style={{ height: 100 }} />
        )}
      </View>
        <TouchableOpacity style={styles.button2} onPress={() => {setDefault()}}>
          <Text>
            create deck
          </Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent:'center',
    padding: 10,
    gap: 7
  }, 
  text:{
      fontSize: 20,
      textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c4d7ff',
    paddingVertical: 10,
    height: 150,
    width: 150
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    height: 75,
    width: 150
  },
});
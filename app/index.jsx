import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setList, setItem } from '../components/asyncFunctions.jsx'

const DeckCard = ({
  deckID,
  kanjiList,
  title,
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => {
        setCurrentKanjiDeck(deckID)
        goToScreen('(tabs)')
        }}>
        <Text>
          {kanjiList[0]}
        </Text>
      </TouchableOpacity>
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
  } catch (e) {
    console.log(error)
  }
}

const clearAppData = async function() {
  try {
      await AsyncStorage.setItem('mainList', JSON.stringify(["default"]))
      await AsyncStorage.setItem('default', {"id": "1", value: "鯨"}) //JSON HERE
  } catch (error) {
      console.error('Error clearing app data.');
  }
}

export default function App() {
  //const [deck, setDeck] = useState("")

  const deckIDs = getStoredDecks()
  
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
        {deckIDs.length ? (
          deckIDs.map((deck, index) => (
            <DeckCard deckID={deck} kanjiList={deck} title={'Deck ' + (index + 1)} key={index}/>
          ))
        ) : (
          <View style={{ height: 100 }} />
        )}
      </View>
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
});
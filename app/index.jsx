import { Text, View, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setList, setItem, fetchList } from '../components/asyncFunctions.jsx'

import 'react-native-get-random-values'; // import get-random-values to get uuid to work
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique ID
import { KanjiListBase } from '../components/kanjiListBase.jsx'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//export const CurrentDeck = createContext();
const { width } = Dimensions.get("window");

const DeckCard = ({
  deckID,
  title,
  kanjiList,
  handlePress,
}) => {
  const image = {uri:"https://unblast.com/wp-content/uploads/2022/01/Paper-Texture-4.jpg"}

  return (
    
    <View gap={30} width={width*0.95} alignItems='center' style={{shadowOffset: {
      width: 20,
      height: 20,
    }, shadowOpacity:0.5, shadowRadius:20, shadowColor:'#7d5932'}}>
        <Link href="/kanjiList" asChild style={{fontSize: 20, color: 'blue' }}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
          <ImageBackground source={image} resizeMode='cover' borderRadius={5} style={{flex:1, alignItems:'center', justifyContent:'center', width:250, height:250, gap:20,}}>
            <Text className='font-ysk' style={{fontSize:100, opacity:0.75, }}>
              {kanjiList[0]}
            </Text>
            </ImageBackground>
          </TouchableOpacity>
        </Link>
        <Text className='font-ysk' style={{fontSize:30,}}>{title}</Text>
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
    await setList('default', JSON.stringify({id: 'default', name: 'Default', list:["鯨"]}))
    await setList('default2', JSON.stringify({id: 'default2', name: 'Default 2', list:["花","火","大","会"]}))
    await loadAllData()
  } catch (error) {
      console.error('Error clearing app data.');
  }
}



export default function App() {
  //setDefault()
  const { data, currentDeck, loading, setCurrentDeck, setCurrent, setLoading, editStorage, loadAllData } = useContext( KanjiListBase );
  const bgImage = {uri:'https://img.freepik.com/free-photo/white-recycle-paper-texture_1194-6391.jpg?semt=ais_hybrid'}

  console.log("context provided:")
  console.log(data)
  

  if (loading) {
    console.log('loading')
    return (
      <Text> loading </Text>
    )
  }

  return (
    <SafeAreaProvider>
    <ImageBackground source={bgImage} resizeMode='cover' style={{flex:1, justifyContent:'center'}}>
      <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Text> Welcome back </Text>
      <Link href="/kanjiList" asChild style={{ textAlign:'center', fontSize: 20, color: 'blue' }}>
        <TouchableOpacity style={styles.button2}>
          <Text>
            Begin Practicing
          </Text>
        </TouchableOpacity>
      </Link>
      
      
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 1, flexDirection: 'row', paddingVertical:20, paddingRight:20,}} 
      contentContainerStyle={{justifyContent: 'center', flexDirection:'row'}}>
      {(typeof data != 'undefined' && data.length) ? (
          data.map((value, index) => (
            <DeckCard 
              deckID={JSON.parse(value[1]).id} 
              title={JSON.parse(value[1]).name}
              kanjiList={JSON.parse(value[1]).list[0]} 
              handlePress = { () =>
                setCurrent(index)
              } 
              key={value[0]}/>
          ))
        ) : (
          <View style={{ height: 100 }} />
        )}
      </ScrollView>
      <Link href="/kanjiList" asChild style={{ textAlign:'center', fontSize: 20, color: 'blue' }}>
        <TouchableOpacity style={styles.button2} onPress={() => setCurrent(data.length)}>
          
          <Text style={{color:'white'}}>
            CREATE NEW DECK
          </Text>
        </TouchableOpacity>
      </Link>
        <TouchableOpacity style={styles.button2} onPress={() => {setDefault()}}>
          <Text style={{color:'white'}}>
            reset
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
    </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 10,
    gap: 20
  }, 
  text:{
      fontSize: 20,
      textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#c4d7ff',
    height: 250,
    width: 250
  },
  button2: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    height: 50,
    width: 200
  },
});
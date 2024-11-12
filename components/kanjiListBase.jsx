import React, { useState, useEffect, createContext } from 'react';


import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

export const KanjiListBase = createContext()

// SQLite stuff



// functions in ListProvider include
   /* toggleKanji
    * addKanji
    * deleteKanji
    * loadKanjiList
    * */
export const ListProvider = ({ children }) => {
    
    const [kanjiList, setKanjiList] = useState([]);


    // async function that updates kanji list
    const toggleKanji = async (id, key, value) => {
      try {
        const copyArray = kanjiList.map(item =>
          item.id === id ? { ...item, [key]: value } : item
        );
        await AsyncStorage.setItem('kanjiList', JSON.stringify(copyArray));
        setKanjiList(copyArray);
      } catch (error) {
        console.log(error);
      }
    };
  
    //async function that deletes kanji list
    const deleteKanji = async (id) => {
      try {
        const copyArray = kanjiList.filter(item => item.id !== id);
        await AsyncStorage.setItem('kanjiList', JSON.stringify(copyArray));
        setKanjiList(copyArray);
      } catch (error) {
        console.log(error);
      }
    };
  
    const addKanji = async (item) => {

  
      try {
        const newKanjiItem = {
          id: uuidv4(),
          name: item,
          isChecked: false,
        };
        await AsyncStorage.setItem(
          'kanjiList',
          JSON.stringify([...kanjiList, newKanjiItem])
        );
        setKanjiList(kanjiList => [...kanjiList, newKanjiItem]);
      } catch (error) {
        console.log(error);
      }
    };
  
    const loadKanjiList = async (item) => {
      try {
        const kanji = await AsyncStorage.getItem('kanjiList');
        const currentKanjiList = JSON.parse(kanji) || []; // Handle null case
        setKanjiList(currentKanjiList);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      
      loadKanjiList();
    }, []);

    return (
        <KanjiListBase.Provider value={{ kanjiList, toggleKanji, addKanji, deleteKanji, loadKanjiList }}>
            { children }
        </KanjiListBase.Provider>
    )
}
import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs


const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)



// functions in ListProvider include
   /* toggleKanji
    * addKanji
    * deleteKanji
    * loadKanjiList
    * */
export const ListProvider = ({ children }) => {
    
    const [kanjiList, setKanjiList] = useState([]);

  
    const loadKanjiList = async () => {
      try {
        const kanji = await AsyncStorage.getItem('currentList');
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
        <GlobalContext.Provider value={{ kanjiList, loadKanjiList }}>
            { children }
        </GlobalContext.Provider>
    )
}
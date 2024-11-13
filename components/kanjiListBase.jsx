import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

export const KanjiListBase = createContext()


export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.log(error);
  }
}

export const getAll = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)
    console.log('keys: ' + keys)
    console.log("items: " + items)
    const mapped = items.map(([key, value]) => value)
    console.log('mapped ' + mapped)
    return mapped
    
  } catch (error) {
    console.log(error);
  }
}


export const addToStorage = async (value) => {
  const newID = uuidv4()
  try {
    const newItem = {
      id: newID,
      value: value,
    };
    await AsyncStorage.setItem(
      newID,
      JSON.stringify(newItem)
    );
    AsyncStorage.getAllKeys()
    .then((keys)=> AsyncStorage.multiGet(keys)
    .then((data) => setData(data)))
  } catch (error) {
    console.log(error);
  }
}


// functions in ListProvider include
   /* 
    * */
export const ListProvider = ({ children }) => {
    const [data, setData] = useState(getAll())
    const [loading, setLoading] = useState(true)
    console.log('data' + data)
    const [current, setCurrent] = useState('default')

    
    const loadAllData = async () => {
      try {
        const updatedData = await getAll() || []; // Handle null case
        setData(updatedData)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
  
    useEffect(() => {
      
      loadAllData();
    }, []);

    return (
        <KanjiListBase.Provider value={{ data, loading }}>
            { children }
        </KanjiListBase.Provider>
    )
}
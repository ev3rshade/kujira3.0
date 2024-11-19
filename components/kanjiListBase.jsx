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
    const mapped = items.map(([key, value]) => [key, value])
    console.log('mapped: ' + mapped)
    return mapped
    
  } catch (error) {
    console.log(error);
  }
}

export const addToStorage = async (id, name, value) => {
  try {
    const newItem = {
      'id': id,
      'name': name,
      'value': value,
    }
    await AsyncStorage.setItem(
      id,
      JSON.stringify(newItem)
    );
    setCurrent(AsyncStorage.getItem(id))
  } catch (error) {
    console.log(error);
  }
}

// functions in ListProvider include
   /* 
    * */
export const ListProvider = ({ children }) => {
    const [data, setData] = useState(getAll())
    const [currentDeck, setCurrentDeck] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log('data: ' + data)

    
    const setCurrent = async (index) => {
      try {
        console.log('item: '  + index)
        setCurrentDeck(data[index][1])
      } catch (error) {
        setCurrentDeck(null)
        console.log(error); //TODO UPDATE TRY CATCH
      } finally {
        setLoading(false)
      }
    }

    const editStorage = async (id, name, value) => {
      const item = {"id": id,"name": name,"list": value }
      try {
        await AsyncStorage.setItem(
          id,
          JSON.stringify(item)
        )
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    const loadAllData = async () => {
      try {
        const updatedData = await getAll() || []; // Handle null case
        setData(updatedData)
        setCurrent(currentDeck)
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
        <KanjiListBase.Provider value={{ data, currentDeck, loading, setCurrentDeck, setCurrent, setLoading, editStorage, loadAllData }}>
            { children }
        </KanjiListBase.Provider>
    )
}
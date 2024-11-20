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
    console.log(JSON.stringify(newItem))
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
    const [data, setData] = useState([])
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
        loadAllData()
      } catch (error) {
        console.log("editStorage: " + error);
      } finally {
        setLoading(false)
      }
    }

    const deleteDeck = async (id) => {
      try {
        /*if (JSON.parse(currentDeck)) {
          setCurrentDeck(JSON.stringify(data[0]))
        }*/// if statement doesn't work :(


        await AsyncStorage.removeItem(id)
        console.log(currentDeck)
        loadAllData()
      } catch (error) {
        console.log("editStorage: " + error);
      } finally {
        setLoading(false)
      }
    }

    const loadAllData = async () => {
      try {
        const updatedData = await getAll() || []
        setData(updatedData)
        setCurrent(currentDeck)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      
      loadAllData();
    }, []);

    return (
        <KanjiListBase.Provider value={{ data, currentDeck, loading, setCurrentDeck, setCurrent, setLoading, editStorage, deleteDeck, loadAllData }}>
            { children }
        </KanjiListBase.Provider>
    )
}
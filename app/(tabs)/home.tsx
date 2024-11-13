import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect, useCallback } from 'react'
import { KanjiDBItem, createTable, deleteKanjiSet, getDBConnection, getKanjiSets, saveKanjiSet } from './dbFunctions'



const [kanjiSets, setKanjiSets] = useState([{ id: 0, value: ['花','火','大','会'] }, { id: 1, value: ['鯨','青','空']}]);
const [newKanjiSet, setNewKanjiSet] = useState('花,火,大,会');

export const loadDataCallback = useCallback(async () => {
    try {
        const initKanjiSets = [{ id: 0, value: ['花','火','大','会'] }, { id: 1, value: ['鯨','青','空']}]
        const db = await getDBConnection()
        await createTable(db)
        const storedKanjiSets = await getKanjiSets(db)
        if (storedKanjiSets.length) {
            setKanjiSets(storedKanjiSets)
        } else {
            await saveKanjiSet(db, initKanjiSets)
            setKanjiSets(initKanjiSets)
        }
    
    } catch (error) {
        console.error(error)
    }
}, [])

useEffect(() => {
    loadDataCallback()
}, [loadDataCallback])

export const addKanjiSet = async () => {
    if(!newKanjiSet.trim()) return;
    try {
        const newKanjiSets = [...kanjiSets, {
            id: kanjiSets.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur
                return acc
            }).id + 1, value : newKanjiSet.split(",")
        }]
        setKanjiSets(newKanjiSets)
        const db = await getDBConnection();
        await saveKanjiSet(db, newKanjiSets)
        setNewKanjiSet('')
    } catch (error) {
        console.error(error)
    }
}

const deleteItem = async (id: number) => {
    try {
        const db = await getDBConnection()
        await deleteKanjiSet(db, id)
        kanjiSets.splice(id, 1)
        setKanjiSets(kanjiSets.slice(0))
    } catch (error) {
        console.error(error)
    }
}

const home = () => {
  return (
    <View>
      <Text>home</Text>
    </View>
  )
}

export default home

const styles = StyleSheet.create({})
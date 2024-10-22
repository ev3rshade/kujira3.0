import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

// enable promise for SQLite -- read what a promise is in Mozilla Docs
enablePromise(true)

export const ConnectToDb = () => {
  return openDatabase(
    { name: 'Kanji.db', location:'default' },
    () => {},
    (error) => {
        console.error(error)
        throw Error('Could not connect to database')
    }
  )
}

export const createTable = async (db: SQLiteDatabase) => {
  const userKanjiSetsQuery = `
    CREATE TABLE IF NOT EXISTS UserKanjiSets (
        id INTEGER DEFAULT 1,
        kanjiSet TEXT
    )
  `
  try {
    await db.executeSql((userKanjiSetsQuery))
  } catch (error) {
    console.error(error)
    throw Error('Failed to create tables')
  }
}

const styles = StyleSheet.create({})
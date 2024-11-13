import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

const userStorage = 'localUserStorage'

export interface KanjiDBItem {
  id: number
  value: string[]
}

enablePromise(true)

export const getDBConnection = async () => {
    return openDatabase({name:'KanjiDB.db', location:'default'})
}

export const createTable = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${userStorage}`

    await db.executeSql(query)
}

export const getKanjiSets = async (db: SQLiteDatabase): Promise<KanjiDBItem[]> => {
    try {
        const kanjiSets: KanjiDBItem[] = [];
        const results = await db.executeSql(`SELECT kanji as id,value FROM ${userStorage}`)
        results.forEach(result => {
          for (let index = 0; index < result.rows.length; index++) {
            kanjiSets.push(result.rows.item(index))
          }
        })
        return kanjiSets;
    } catch (error) {
      console.error(error)
      throw Error('Failed to get kanji set')
    }
}

export const saveKanjiSet = async (db: SQLiteDatabase, kanjiSet: KanjiDBItem[]) => {
  const insertQuery = `INSERT OR REPLACE INTO ${userStorage}(id, value) values`+ kanjiSet.map(i => `(${i.id}, '${i.value})`).join('||')
  return db.executeSql(insertQuery)
}

export const deleteKanjiSet = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${userStorage} where rowid = ${id}`
  await db.executeSql(deleteQuery)
}

export const deleteTable = async(db:SQLiteDatabase) => {
  const query = `drop table ${userStorage}`

  await db.executeSql(query)
}
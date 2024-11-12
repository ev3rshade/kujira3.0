import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SQLite from 'react-native-sqlite-storage'

import { ListProvider } from '../../components/kanjiListBase'

import { fetchList, setList, removeList } from '../../components/asyncFunctions.jsx'

import Draw from './draw';
import KanjiList from './kanjiList';
import Practice from './practice';
import Deck from './deck'


const Tab = createBottomTabNavigator()


const TabsLayout = () => {
   return (
      <ListProvider>
         <Tab.Navigator>
            <Tab.Screen
               name='KanjiList'
               component={ KanjiList }
               options={{
                  title: 'Kanji',
               }}
            />

            <Tab.Screen
               name='Draw'
               component={ Draw }
               options={{
                  title:'Practice',
               }}
               />

            <Tab.Screen
               name='Practice'
               component={ Practice }
               options={{
                  title:'Practice'
               }}
               />

            <Tab.Screen
               name='deck'
               component={ Deck }
               options={{
                  title:'Deck'
               }}
               />
               
         </Tab.Navigator>
      </ListProvider>
      
   )
}

export default TabsLayout

const styles = StyleSheet.create({})
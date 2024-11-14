import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Tabs } from 'expo-router'

import { ListProvider } from '../../components/kanjiListBase'

import { fetchList, setList, removeList } from '../../components/asyncFunctions.jsx'

import Draw from './draw';
import KanjiList from './kanjiList';
import Practice from './practice';
import Deck from './deck'




const TabsLayout = () => {
   return (
      
         <Tabs>
            <Tabs.Screen
               name='kanjiList'
               options={{
                  title: 'Kanji',
               }}
            />

            <Tabs.Screen
               name='draw'
               options={{
                  title:'Practice',
               }}
               />

            <Tabs.Screen
               name='practice'
               options={{
                  title:'Practice'
               }}
               />

            <Tabs.Screen
               name='deck'
               options={{
                  title:'Deck'
               }}
               />
               
         </Tabs>
      
      
   )
}

export default TabsLayout

const styles = StyleSheet.create({})
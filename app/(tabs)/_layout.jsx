import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Tabs } from 'expo-router'

import { ListProvider } from '../../components/kanjiListBase'


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
                  headerShown: false,
               }}
            />

            <Tabs.Screen
               name='practice'
               options={{
                  title:'Practice',
                  headerShown: false,
               }}
               />

            <Tabs.Screen
               name='deck'
               options={{
                  title:'Deck',
                  headerShown: false,
               }}
               />
               
         </Tabs>
      
      
   )
}

export default TabsLayout

const styles = StyleSheet.create({})
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View, Icon} from 'react-native'
import React from 'react'

import { Tabs } from 'expo-router'

import { ListProvider } from '../../components/kanjiListBase'


import KanjiList from './kanjiList';
import Practice from './practice';




const TabsLayout = () => {
   return (
      
         <Tabs>
            <Tabs.Screen
               name="kanjiList"
               options={{
                  title: 'Deck',
                  headerShown: false,
                  tabBarStyle: { backgroundColor: 'white' },
                  tabBarActiveTintColor: 'blue',
               }}
            />


            <Tabs.Screen
               name='practice'
               options={{
                  title:'Practice',
                  headerShown: false,
               }}
               />
               
         </Tabs>
      
      
   )
}

export default TabsLayout

const styles = StyleSheet.create({})
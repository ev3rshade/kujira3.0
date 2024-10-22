/*import { Text, View, StyleSheet } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Test from './test';
import KanjiList from './kanjiList';

// can't call kanji listBase as a dynamically rendered hook here, need to circumnavigate using a function SJDFOISNGIOSRBOBNGS
import { KanjiListBase } from '../../components/kanjiListBase'


function StackScreen( kanjiListItem ) {
    return <PracticeScreen text={kanjiListItem}></PracticeScreen>
}


const { kanjiList } = useContext(KanjiListBase);

let tabs = {}

kanjiList.forEach(e => {
  tabs[e] = kanjiList[e].name
})

const PracticeStack = () => {
  return (
    createBottomTabNavigator(tabs, )
  )
}

export default PracticeStack

const styles = StyleSheet.create({})*/
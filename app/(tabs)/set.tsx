import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import KanjiList from './kanjiList'

const [screenNum, setScreenNum] = useState(0) // 0 is deck homescreen

function renderScreen() {
    if (screenNum === 0) {
        return <View> <Text> this is where the sets will go! </Text></View>
    } else if (screenNum === 1) {
        return <KanjiList></KanjiList>
    } 
}

const Set = () => {
    return (
        renderScreen()
    )
}

export default Set

const styles = StyleSheet.create({})
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import DrawBox from '../../components/drawBox.jsx';

const Draw = ({
  kanji
}) => {
  return (
    <View className="paddingVertical-10 flex-1 items-center justify-center">
      <Text style={styles.text}> Kanji Reading </Text>
      <DrawBox scaleHeight={0.5} scaleWidth={1}>
      </DrawBox>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 10,
    fontSize: 20
  }
});

export default Draw
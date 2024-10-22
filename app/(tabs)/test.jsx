import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, {useState, useContext} from 'react'

import { KanjiListBase } from '../../components/kanjiListBase';
import DrawBox  from '../../components/drawBox'

const AnswerBox = ({
  title,
  style,
}) => {
  const [show, toggleShow] = useState(false)
  return (
    <TouchableOpacity title={title} style={style} onPress={() => toggleShow(!show)}>
    {show ? (
    <Text style={{fontSize: 50, textAlign: 'center'}} > {title} </Text>
    ) : null}
  </TouchableOpacity>
  );
}

const Test = () => {
  
  const { kanjiList } = useContext(KanjiListBase);
  return (
    <View style={{ paddingHorizontal: 5, paddingVertical: 16, gap: 20, alignItems:'center'}}>
        {kanjiList.length ? (
          kanjiList.map((kanji, index) => (
            <View style={{ flexDirection: 'row', paddingHorizontal: 5, gap: 10}} key={index}>
            <View style={{gap: 6}}>
              <Text style={{ fontSize:30 }}>| {index + 1} |</Text>
            <AnswerBox title={kanji.name} style={styles.button} key={kanji.id}/>
            </View>
            <DrawBox scaleHeight={0.3} scaleWidth={0.6} key={-index}>
            </DrawBox>
            </View>
          ))
        ) : (
          <View style={{ height: 100 }}>
            <Text>Add characters in the Kanji List screen</Text>
          </View>
        )}
    </View>
  )
}

export default Test

const styles = StyleSheet.create({
  button: {
    alignItems: 'justify',
    backgroundColor: '#c4d7ff',
    paddingVertical: 10,
    height: 90,
    width: 90
  },
  text: {
    fontSize: 50,
    textAlign: 'center'
  }
})
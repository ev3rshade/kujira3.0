import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, {useState, useContext} from 'react'

import { KanjiListBase } from '../../components/kanjiListBase';
import DrawBox  from '../../components/drawBox'

const AnswerBox = ({
  title,
  style,
}) => {
  const [flip, setFlip] = useState(false)

  if (!flip) {
    return (
      <View>
        <Button title="flip" onPress={() => setFlip(true)}></Button>
        <DrawBox scaleHeight={0.3} scaleWidth={0.6}/>
      </View>
    )
  }
  
  return (
    <TouchableOpacity title={title} style={style} onPress={() => setFlip(false)}>
      <Text style={{fontSize: 50, textAlign: 'center'}} > {title} </Text>
    </TouchableOpacity>
  );
}

const Practice = () => {
  const { data, currentDeck, loading, setCurrent, editStorage } = useContext(KanjiListBase);
  console.log("currentdeck: " + currentDeck)
  const currentDeck1 = currentDeck?.replaceAll("\"", "") || ""
  const deckID = currentDeck1.substring(4, currentDeck1.search("name:") - 1)
  const deckName = currentDeck1.substring(currentDeck1.search("name:") + 5, currentDeck1.search("list:") - 1)
  console.log(deckID)
  const list = currentDeck1.substring(currentDeck1.search("list:") + 6, currentDeck1.length - 2).split(",")

  return (
    <View style={{ paddingHorizontal: 5, paddingVertical: 16, gap: 20, alignItems:'center'}}>
        {list.length ? (
          list.map((kanji, index) => (
            <View style={{ paddingHorizontal: 5, gap: 10}} key={index}>
              <Text style={{ fontSize:30 }}>| {index + 1} |</Text>
            <AnswerBox title={kanji} style={styles.button} handlePress={() => setFlip(false)} key={index}/>
            
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

export default Practice

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
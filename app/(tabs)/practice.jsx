import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions } from 'react-native'
import React, {useState, useContext} from 'react'

import { KanjiListBase } from '../../components/kanjiListBase';
import DrawBox  from '../../components/drawBox'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

const AnswerBox = ({
  title,
  style,
}) => {
  const [flip, setFlip] = useState(false)

  if (!flip) {
    return (
      <View style={{flex: 0, justifyContent:'center',}}>
        <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.button2}>
          <Text style={{color:'white'}}>FLIP</Text>
        </TouchableOpacity>
        <DrawBox scaleHeight={0.3} scaleWidth={0.6}/>
      </View>
    )
  }
  
  return (
    <View style={{flex: 0, justifyContent:'center',}}>
      <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.button2}>
          <Text style={{color:'white'}}>FLIP</Text>
        </TouchableOpacity>
      <TouchableHighlight title={title} style={{backgroundColor:'#c4d7ff', justifyContent: 'center', height: height * 0.7 * 0.45, width: width*0.6,}}>
        <Text className='font-ysk' style={{fontSize: 140, textAlign:'justify'}} > {title} </Text>
      </TouchableHighlight>
    </View>
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
    <SafeAreaProvider>
    <SafeAreaView style={{ paddingHorizontal: 5, paddingVertical: 16, gap: 20, alignItems:'center'}}>
      <ScrollView pagingEnabled>
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
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  )

}

export default Practice

const styles = StyleSheet.create({
  button: {
    alignItems: 'justify',
    backgroundColor: '#c4d7ff',
  },
  button2: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
    paddingVertical: 10,
    height: 40,
    width: 90
  },
  text: {
    fontSize: 50,
    textAlign: 'center'
  }
})
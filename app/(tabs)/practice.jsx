import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React, {useState, useContext} from 'react'

import { KanjiListBase } from '../../components/kanjiListBase';
import DrawBox  from '../../components/drawBox'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const bgImage = {uri:'https://img.freepik.com/free-photo/white-recycle-paper-texture_1194-6391.jpg?semt=ais_hybrid'}
const image = {uri:"https://unblast.com/wp-content/uploads/2022/01/Paper-Texture-4.jpg"}

const AnswerBox = ({
  title,
  style,
}) => {
  const [flip, setFlip] = useState(false)

  if (!flip) {
    return (
      <View height='400' style={{alignItems:'center', justifyContent:'center',}}>
        <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.button2}>
          <Text style={{color:'white'}}>FLIP</Text>
        </TouchableOpacity>
        <DrawBox scaleHeight={0.3} scaleWidth={0.6} strokeWidth={5}/>
      </View>
    )
  }
  
  return (
    <View height='400' style={{alignItems:'center', justifyContent:'center',}}>
      <TouchableOpacity onPress={() => setFlip(!flip)} style={styles.button2}>
          <Text style={{color:'white'}}>FLIP</Text>
      </TouchableOpacity>
      <ImageBackground source={image} resizeMode='cover' style={{flex:1, justifyContent:'center'}}>
      <TouchableHighlight title={title} style={{backgroundColor:'#ffffff', justifyContent: 'center', height: height * 0.7 * 0.45, width: width*0.6,}}>
        <Text className='font-ysk' style={{fontSize: 140, textAlign:'justify'}} > {title} </Text>
      </TouchableHighlight>
      </ImageBackground>
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

  const ref = React.useRef(0);

  function scrollFunc(x, y) {
    ref.current.scrollTo(x, y)
  }

  return (
    <ImageBackground source={bgImage} resizeMode='cover' style={{flex:1, justifyContent:'center'}}>
    <SafeAreaProvider>
      
    <SafeAreaView style={{ paddingHorizontal: 5, paddingVertical: 16, gap: 20, alignItems:'center', justifyContent:'center'}}>
      <Text className='font-ysk' flex={1} style={{textAlign: 'left', borderWidth: 3, fontSize: 20, paddingHorizontal:30}}>{deckName}</Text>
      <ScrollView horizontal={true} pagingEnabled contentContainerStyle={{flexDirection:'row',}}>
        {list.length ? (
          list.map((kanji, index) => (
            <View width={width * 0.97} height={height*0.75} style={{ paddingHorizontal: 5, alignContent:'center', justifyContent:'center', gap: 10}} key={index}>
              <Text style={{ fontSize:30 }}>| {index + 1} |</Text>
              <AnswerBox title={kanji} style={styles.button} handlePress={() => setFlip(false)} key={index}/>
            </View>
          ))
        ) : (
          <View style={{ height: 100 }}>
            <Text>Add characters in the Kanji List screen</Text>
          </View>
        )}
        <TouchableOpacity></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
    </ImageBackground>
  )

}

export default Practice

const styles = StyleSheet.create({
  button: {
    alignItems: 'justify',
    justifyContent:'center',
    backgroundColor: '#ffffff',
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
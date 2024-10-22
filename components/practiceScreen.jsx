import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native';

import DrawBox from '../../components/drawBox.jsx';

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

const PracticeScreen = ({
    text,
    itemNum,
}) => {
  return (
    <View style={styles.container}>
      <Text> Kanji {itemNum} </Text>
        <View style={{flexDirection:'column'}}>
            <DrawBox scaleHeight={0.3} scaleWidth={0.6}/>
            <AnswerBox title={text} style={styles.button}></AnswerBox>
        </View>
    </View>
  )
}

export default PracticeScreen

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
        gap: 7
      }, 
      text:{
          fontSize: 20,
          textAlign: 'center',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c4d7ff',
        paddingVertical: 10,
        height: 150,
        width: 150
      },
})
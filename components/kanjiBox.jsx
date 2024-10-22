import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'

// KanjiBox component to render the kanji "cards" onto the screen
   // used in screen "kanjiList.jsx"
const KanjiBox = ({
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  handlePress1,
  handlePress2,
  otherStyles, 
  ...props 
}) => {
  
  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
        {/*<Button title='Edit'
                onPress={handlePress1}
                style={styles.button}
        />*/}
        <Text style={styles.text2}> {title} </Text>
        <View style={styles.middle}>
        <Button title='(X)'
                onPress={handlePress2}
                />
        </View>
        </View>
      <Text
          numberOfLines={1}
          style={styles.text}
        >
          {value}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems:'center',
    gap: 7,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    flexDirection:'column',
    width: 20,
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#dadbf7',
    borderWidth: 3,
    borderRadius: 20,
  },
  bottom: {
    flex: 0.3,
    flexDirection:'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
  },

  text: {
    color: 'blue',
    fontSize: 100,
    textAlign: 'center'
  },

  text2: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center'
  },

  button: {
    padding: 10,
    backgroundColor: 'blue',
    color: 'black',
    borderRadius: 5,
    alignItems: 'center'
  },
});

export default KanjiBox;
import { View, Text, Button, StyleSheet } from 'react-native'

export const KanjiBox = ({
    title, 
    value, 
    reading,
    placeholder, 
    handleChangeText, 
    handlePress1,
    handlePress2,
    otherStyles, 
    editMode,
    ...props 
  }) => {
    

    if (!editMode) {
      return (
        <View style={styles.container}>
            <View style={styles.bottom}>
            <Text style={styles.text}> {title} </Text>
            <View style={styles.middle}>
            </View>
            </View>
          <Text
              className='text-2xl font-ysk'
            >
              {value}
          </Text>
          <Text> </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
          <View style={styles.bottom}>
          {/*<Button title='Edit'
                  onPress={handlePress1}
                  style={styles.button}
          />*/}
          <Text style={styles.text}> {title} </Text>
          <View style={styles.middle}>
          <Button title='X'
                  onPress={handlePress2}
                  />
          </View>
          </View>
        <Text
            className='text-2xl color-SECONDARY font-ysk'
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
  
    input: { // text input
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
    button: { // button
      padding: 3,
      backgroundColor: 'black',
      color: 'black',
      borderRadius: 5,
      borderWidth: 5,
      alignItems: 'center',
    },
    button2: {
      padding: 3,
      backgroundColor: 'white',
      color: 'white',
      borderRadius: 5,
      borderWidth: 5,
      alignItems: 'center',
      width: 70,
      height: 30,
    },
    text:{ // text for header
      fontSize: 10,
      textAlign: 'center',
    },
    text2: {
      color: 'blue',
      fontFamily: 'ysk',
      fontSize: 100,
      textAlign: 'center'
    },
  
  });
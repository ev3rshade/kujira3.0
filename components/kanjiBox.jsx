import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

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
    
    const image = {uri:"https://unblast.com/wp-content/uploads/2022/01/Paper-Texture-4.jpg"}
    if (!editMode) {
      return (
        <ImageBackground source={image} resizeMode='cover' borderRadius={5} style={{flex:1, flexDirection:'row', justifyContent:'center', width:150, height:140, padding:10,}}>
          <View style={{gap:10, borderRadius:10,}}>
            <Text style={styles.text}> {title} </Text>
            <Text
                className='text-8xl text-blue-600 font-ysk'
              >
                {value}
            </Text>
            <Text> </Text>
          </View>
        </ImageBackground>
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
          <TouchableOpacity
                  onPress={handlePress2}
                  style={{width:10}}>
            <Text>X</Text>
          </TouchableOpacity>
          </View>
          </View>
        <Text
            className='text-8xl text-blue-600 font-ysk'
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
      gap: 15,
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
    },
    top: {
      flex: 0.5,
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
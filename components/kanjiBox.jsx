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
        <ImageBackground source={image} resizeMode='cover' borderRadius={5} style={{flex:0, flexDirection:'row', justifyContent:'center', width:160, height:170, paddingVertical:30, shadowOffset: {
          width: 10,
          height: 10,
        }, 
        shadowOpacity:0.5, 
        shadowRadius:5, 
        shadowColor:'#0d142e'}}>
          <View style={styles.container}>
            <Text textAlign='left'> {title} </Text>
            <Text
                className='font-ysk'
                style={{fontSize:75,}}
              >
                {value}
            </Text>
            <Text> </Text>
          </View>
        </ImageBackground>
      )
    }

    return (
      <ImageBackground source={image} resizeMode='cover' borderRadius={5} style={{flex:0, flexDirection:'row', justifyContent:'center', width:160, height:160, padding:10,shadowOffset: {
        width: 10,
        height: 10,
      }, 
      shadowOpacity:0.5, 
      shadowRadius:5, 
      shadowColor:'#0d142e'}}>
      <View style={styles.container}>
          <View style={styles.bottom}>
            <Text style={styles.text}> {title} </Text>
              <TouchableOpacity
                      onPress={handlePress2}
                      style={{width:30, height:30, borderWidth:3, borderRadius:5, alignContent:'center', justifyContent:'center'}}>
                <Text flex={2} alignItems='center' justifyContent='center' style={{fontSize: 20}} paddingHorizontal={4}>X</Text>
              </TouchableOpacity>
          </View>
        <Text
            className='font-ysk'
            style={{fontSize:75,}}
          >
            {value}
          </Text>
      </View>
      </ImageBackground>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex:0, 
      alignItems:'left', 
      justifyContent:'center', 
      borderRadius:10,
    },
    top: {
      flex: 0.5,
      backgroundColor: 'grey',
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    middle: {
      flex: 2,
      flexDirection:'column',
      width: 50,
      height: 30,
      alignItems: 'center',
      gap: 12,
      backgroundColor: '#dadbf7',
      borderWidth: 3,
      borderRadius: 20,
    },
    bottom: {
      flexDirection:'row',
      justifyContent:'center',
      alignContent: 'center',
      width:100,
      height:15,
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
      flex: 1,
      fontSize: 10,
      textAlign: 'left',
      height: 30,
    },
    text2: {
      color: 'blue',
      fontFamily: 'ysk',
      fontSize: 100,
      textAlign: 'center'
    },
  
  });
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';


/*import SQLite from 'react-native-sqlite-storage'*/

const goToScreen = ({
  screen
}) => {
  router.push({screen});
}

export default function App() {

    return (
      <View style={styles.container}>
        <StatusBar/>
        <Text> Kanji Practice App Day 20 </Text>
        <Text> Welcome back </Text>
        <TouchableOpacity style={styles.button} onPress={() => {goToScreen("/kanjiList")}}>

          
        </TouchableOpacity>
        <Link href="/kanjiList" style={{ textAlign:'center', fontSize: 20, color: 'blue' }}> Begin practicing </Link>
      </View>
    );
};

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
});
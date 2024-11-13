import { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

const setBox = () => {
    return (
        <View>
            <Text>
                Hello
            </Text>
        </View>
    )
}


function customOpenDB() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.useSQLiteContext();
  db.withTransactionSync(() => {
    db.runSync(
      `CREATE TABLE IF NOT EXISTS KanjiTest (id text primary key not null, kanjiSet text);`
    );
  });
  return db;
}


function KanjiSet({ id, onPressItem }) {
  const db = customOpenDB()
  
  const [items, setItems] = useState(null);

  if (id !== "0" ) {
    useEffect(() => {
        db.withTransactionSync(() => {
        setItems(
            db.getAllSync(
            `SELECT * from Kanji where id === ${id};`,
            ).split(",")
        );
        });
    }, []);
  } else {
    useEffect(() => {
        db.withTransactionSync(() => {
        setItems(
            db.getAllSync(
            `SELECT * from KanjiTest;`,
            )
        );
        });
    }, []);
  }


  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>App.jsx</Text>
      {items.length? (
        items.map(({ id, kanjiSet }) => (
        <TouchableOpacity
          key={id}

          style={{
            backgroundColor: "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
          onPressItem={() => {
            setID(key)
            console.log(id)
          }}
        >
          <Text style={{ color: "fff" }}>{kanjiSet}</Text>
        </TouchableOpacity>
      ))
    ) : (
        <></>
    )}
      
    </View>
  );
}

export function Main() {
  const db = customOpenDB()
  const [text, setText] = useState(null);
  const [id, setID] = useState("0")
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.withTransactionSync(() => {
      db.runSync(`INSERT INTO KanjiTest (id, kanjiSet) VALUES(?,?)`, uuidv4(), text);
      console.log(JSON.stringify(db.getAllSync(`select * from KanjiTest`)));
      forceUpdate();
    });
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Kanji Decks </Text>

      {Platform.OS === "web" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.heading}>
            Expo SQlite is not supported on web!
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.flexRow}>
            <TextInput
              onChangeText={(text) => setText(text)}
              onSubmitEditing={() => {
                add(text);
                setText(null);
              }}
              placeholder="what do you need to do?"
              style={styles.input}
              value={text}
            />
            
            
          </View>
          <ScrollView style={styles.listArea}>
            <KanjiSet
              key={`forceupdate-todo-${forceUpdateId}`}
              id={id}
            />
          </ScrollView>
        </>
      )} 
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default function App() {
  return (
  <SQLite.SQLiteProvider databaseName="KanjiDB.db" assetSource ={{ assetId: require('./KanjiDB.db')}}>
    <Main/>
  </SQLite.SQLiteProvider>
  );
}

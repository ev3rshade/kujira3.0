import { Text, View } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Practice from './draw';
import Test from './test';
import KanjiList from './kanjiList';

import { ListProvider } from '../../components/kanjiListBase'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View>
            <Image
              source={icon}
            />
        </View>
    )
}

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <ListProvider>
      <Tab.Navigator>     
        
        <Tab.Screen 
            name="kanjiList"
            component={KanjiList}
            options={{
              title:'Kanji List',
            }}/>
            
        <Tab.Screen 
            name="practice"
            component={Practice}
            options={{
              title:'Draw'
            }}/>
        
        <Tab.Screen 
            name="test"
            component={Test}
            options={{
              title:'Practice'
            }}/>
        
        
      </Tab.Navigator>
    </ListProvider>
  )
}

export default TabsLayout
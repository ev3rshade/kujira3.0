import { StyleSheet, Text, View } from 'react-native'
import {Stack } from 'expo-router';
import { ListProvider } from '../components/kanjiListBase';

const RootLayout = () => {
    return (
        <ListProvider>
            <Stack>
                <Stack.Screen name = "(tabs)" options={{ headerShown: false}} />
                <Stack.Screen name = "index" options={{ headerShown: false }} />
            </Stack>
        </ListProvider>
    )
}

export default RootLayout
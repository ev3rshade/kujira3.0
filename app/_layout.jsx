import { useEffect } from "react"
import { useFonts } from "expo-font"
import { Stack } from 'expo-router'
import { ListProvider } from '../components/kanjiListBase'

// global CSS file import
import "../global.css";

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Yuji Syuku": require("../assets/fonts/YujiSyuku-Regular.ttf"),
        "Courier Prime Regular": require("../assets/fonts/CourierPrime-Regular.ttf")
      });

      useEffect(() => {
        if (error) throw error;
    
        
      }, [fontsLoaded, error]);
    
      if (!fontsLoaded) {
        return null;
      }
    
      if (!fontsLoaded && !error) {
        return null;
      }

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
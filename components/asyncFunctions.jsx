import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchList = async (listID) => {
    try {
        const list = JSON.parse(await AsyncStorage.getItem(listID))
        return list
    } catch (e) {
        console.log(e)
        return []
    }
}

export const fetchItem = async (itemID) => {
    try {
        const item = JSON.stringify(await AsyncStorage.getItem(itemID))
        return item
    } catch (e) {
        console.log(e)
        return ""
    }
}

export const setList = async(listID, value) => {
    try {
        await AsyncStorage.setItem(listID, value)
        console.log("asyncFunctions - list set successfully")
        console.log(JSON.stringify(await AsyncStorage.getItem(listID)))
    } catch (e) {
        console.log(e)
    }
}

export const setItem = async(itemID, value) => {
    try {
        await AsyncStorage.setItem(itemID, value)
        console.log("asyncFunctions - item set successfully")
        console.log(JSON.stringify(await AsyncStorage.getItem(itemID)))
    } catch (e) {
        console.log(e)
    }
}

export const removeList = async(listID) => {
    try {
        await AsyncStorage.removeItem(listID)
    } catch (e) {
        console.log(e)
    }
}
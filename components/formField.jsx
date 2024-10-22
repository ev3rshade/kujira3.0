import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({
  title, 
  value, 
  placeholder, 
  handleChangeText, 
  otherStyles, 
  ...props 
}) => {
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className = "text-base text-blue-300"> {title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 roundeed-2xl">
        <TextInput 
          className="flex-1 text-blue-400"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  )
}

export default FormField;
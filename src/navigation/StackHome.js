import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Day from '../screens/Day'

const Stack = createNativeStackNavigator()

function StackHome () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#1b212f' }
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Day" component={Day} />
    </Stack.Navigator>
  )
}

export default StackHome

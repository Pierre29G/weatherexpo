import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenHome from '../screens/ScreenHome'
import ScreenDay from '../screens/ScreenDay'

const Stack = createNativeStackNavigator()

function StackHome () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#1b212f' }
      }}
    >
      <Stack.Screen name="Home" component={ScreenHome} />
      <Stack.Screen name="Day" component={ScreenDay} />
    </Stack.Navigator>
  )
}

export default StackHome

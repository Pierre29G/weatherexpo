import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import StackApp from './StackApp'
import Credits from '../screens/Credits'

const Tab = createBottomTabNavigator()

function TabApp () {
  return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Credit') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline'
            } else if (route.name === 'Accueil') {
              iconName = focused ? 'ios-home' : 'ios-home-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#b4bac4',
          tabBarStyle: { backgroundColor: '#1b212f' }
        })}>
            <Tab.Screen name="Accueil" component={StackApp} />
            <Tab.Screen name="Credit" component={Credits} />
        </Tab.Navigator>
  )
}

export default TabApp

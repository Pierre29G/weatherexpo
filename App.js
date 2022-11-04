import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView } from 'react-native';
import { useQuery,QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Day from './Day';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Day" component={Day} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
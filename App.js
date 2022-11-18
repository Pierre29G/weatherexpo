import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native';
import TabApp from './src/navigation/TabApp';

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
      style="light" // Here is where you change the font-color
      />
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#1b212f' },
        }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Day" component={Day} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
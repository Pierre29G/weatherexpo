import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native';
import TabApp from './src/navigation/TabApp';

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <NavigationContainer>
        <TabApp />
      </NavigationContainer>
    </QueryClientProvider>
  )
}
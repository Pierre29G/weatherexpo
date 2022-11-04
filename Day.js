import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Day({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Day ?
      </Text>
    </View>
  );
}

export default Day;
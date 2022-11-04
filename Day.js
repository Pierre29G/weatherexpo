import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery,QueryClient,QueryClientProvider,} from '@tanstack/react-query'

function Day({ navigation, daydate }) {
  const route = useRoute();
  const dateoptions = { weekday: 'short' };
  
  const { isLoading, error, data } = useQuery(['dayData'], () =>
    fetch('http://weather-api.mathisbarre.com/nantes/'+route.params.daydate).then(res =>
      {
        if(!res.ok){
          throw new Error('Fail');
        }
      return res.json()}
      )
  )

  console.log(data);
    
    if (isLoading){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
              Loading...
      </Text>
    </View>
  );
}

    if (error){
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
              Something went wrong !
            </Text>
          </View>
      );
    }
    
  return (
      <SafeAreaView style={styles.general}>
        <ScrollView>
          {data.hourly.map(hour => 
          <View style={styles.dayview}>
            <Text style={styles.m}>
              {new Date(hour?.datetime).toLocaleDateString('fr-FR', dateoptions)}
            </Text>
            <Image source={{uri: hour?.icon}} style={styles.smallthumbnail} />
            <Text style={styles.mdark}>
              {hour?.condition}
            </Text>
            <Text style={styles.m}>
              {hour?.temperature.value} {hour?.temperature.unit}
            </Text>
          </View>
          )}
        </ScrollView >
      </SafeAreaView>
  );
}

export default Day;
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
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

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        <ScrollView 
        contentContainerStyle={styles.padtop}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }>
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

const styles = StyleSheet.create({
  general: {
    backgroundColor: '#000918',
  },
  topcontainer: {
    marginBottom: 20,
    paddingRight : 25,
    paddingLeft : 25,
    paddingTop : 25,
    paddingBottom: 10,
    height: 250,
    backgroundColor: '#1b212f',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  dayview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    marginBottom : 50,
    marginRight : 20,
    marginLeft : 20,
    borderBottomColor: '#1b212f',
    borderBottomWidth: 2
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginLeft: 30,
  },
  smallthumbnail: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  surtitle: {
    color: 'white',
    fontSize: 25,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  m: {
    color: 'white',
    fontSize: 20,
  },
  mdark: {
    color: '#b4bac4',
    fontSize: 20,
  },
  s: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  xs: {
    color: '#b4bac4',
    fontSize: 15,
    textAlign: 'center',
  },
  padtop: {
  paddingTop: 25,
  },
});
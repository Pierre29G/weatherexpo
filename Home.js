import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useQuery,QueryClient,QueryClientProvider,} from '@tanstack/react-query'

function Home({ navigation }) {
  const [found, setFound] = React.useState(0);
  const [gofetch, setGofetch] = React.useState(0);
  const [queryUrl, setQueryUrl] = React.useState(null);
  const [sprite, onChangeText] = React.useState('');
  const [apitext, setApitext] = React.useState('');
  

  const { isLoading, error, data } = useQuery(['repoData'], () =>
    fetch('http://weather-api.mathisbarre.com/nantes').then(res =>
      {
        if(!res.ok){
          throw new Error('Fail');
        }
      return res.json()}
      )
  )
    
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

    function TextHeadingSmall({wanteddata}){
      console.log(data?.currentConditions[wanteddata]['value']);
      return (
        <View style={styles.column}>
          <Text style={styles.s}>
            {data?.currentConditions[wanteddata]['value']} {data?.currentConditions[wanteddata]['unit']}
          </Text>
          <Text style={styles.xs}>
            Vent
          </Text>
        </View>
      )
    }
    
  return (
      <View style={styles.general}>
        <View style={styles.topcontainer}>
          <View style={styles.row}>
            <Image source={{uri: data.currentConditions.iconBig}} style={styles.thumbnail} />
            <View style={styles.column}>
              <Text style={styles.surtitle}>
                Actuellement
              </Text>
              <Text style={styles.title}>
                {data?.currentConditions.temperature['value']} {data?.currentConditions.temperature['unit']}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <TextHeadingSmall wanteddata='windSpeed'/>
            <TextHeadingSmall wanteddata='humidity'/>
          </View>
        </View>
        <ScrollView>
          {data.next5DaysConditions.map(day => 
          <TouchableOpacity onPress={() => navigation.navigate('Day', {daydate: day?.date})} style={styles.dayview}>
          <Text style={styles.m}>
              {new Date(day?.date).toLocaleDateString('fr-FR', dateoptions)}
          </Text>
          <Image source={{uri: day?.icon}} style={styles.smallthumbnail} />
          <Text style={styles.mdark}>
            {day?.condition}
          </Text>
          <Text style={styles.m}>
            Max. {day?.temperature.max} {day?.temperature.unit}
          </Text>
          </TouchableOpacity>
          )}
        </ScrollView >
      </SafeAreaView>
  );
}

export default Home;

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
    //flex: 1,
    //flexDirection: "row",
    //justifyContent: "space-between",
    //height: 50,
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
    fontSize: 25,
  },
  mdark: {
    color: '#b4bac4',
    fontSize: 25,
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
});

//<Button title="Go to Day" onPress={() => navigation.navigate('Day')} />
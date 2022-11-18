import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import theme from '../../assets/style/theme';
import { useQuery} from '@tanstack/react-query'

function Day({ navigation, daydate }) {
  const route = useRoute();
  
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
      <SafeAreaView style={theme.general}>
        <ScrollView 
        contentContainerStyle={theme.padtop}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }>
          {data.hourly.map(hour => 
          <View key={hour?.datetime} style={theme.dayview}>
            <Text style={theme.m}>
              {new Date(hour?.datetime).getHours()} : 00
            </Text>
            <Image source={{uri: hour?.icon}} style={theme.smallthumbnail} />
            <Text style={theme.mdark}>
              {hour?.condition}
            </Text>
            <Text style={theme.m}>
              {hour?.temperature.value} {hour?.temperature.unit}
            </Text>
          </View>
          )}
        </ScrollView >
      </SafeAreaView>
  );
}

export default Day;
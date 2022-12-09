/* eslint-disable react/prop-types */
import * as React from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl
} from 'react-native'
import theme from '../../assets/style/theme'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

function ScreenHome () {
  const navigation = useNavigation()

  const dateoptions = { weekday: 'short' }

  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    ['repoData'],
    () =>
      fetch('http://weather-api.mathisbarre.com/nantes').then((res) => {
        if (!res.ok) {
          throw new Error('Fail')
        }
        return res.json()
      })
  )

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    refetch()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Something went wrong !</Text>
      </View>
    )
  }

  function TextHeadingSmall ({ wanteddata }) {
    return (
      <View style={theme.column}>
        <Text style={theme.s}>
          {data?.currentConditions[wanteddata].value}{' '}
          {data?.currentConditions[wanteddata].unit}
        </Text>
        <Text style={theme.xs}>Vent</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={theme.general}
      contentContainerStyle={theme.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || isRefetching}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={theme.topcontainer}>
        <View style={theme.row}>
          <Image
            source={{ uri: data.currentConditions.iconBig }}
            style={theme.thumbnail}
          />
          <View style={theme.column}>
            <Text style={theme.surtitle}>Actuellement</Text>
            <Text style={theme.title}>
              {data?.currentConditions.temperature.value}{' '}
              {data?.currentConditions.temperature.unit}
            </Text>
          </View>
        </View>
        <View style={theme.row}>
          <TextHeadingSmall wanteddata="windSpeed" />
          <TextHeadingSmall wanteddata="humidity" />
        </View>
      </View>
      <View style={theme.padtop}>
        {data.next5DaysConditions.map((day) => (
          <TouchableOpacity
            key={day?.date}
            onPress={() => navigation.navigate('Day', { daydate: day?.date })}
            style={theme.dayview}
          >
            <Text style={theme.m}>
              {new Date(day?.date).toLocaleDateString('fr-FR', dateoptions)}
            </Text>
            <Image source={{ uri: day?.icon }} style={theme.smallthumbnail} />
            <Text style={theme.mdark}>{day?.condition}</Text>
            <Text style={theme.m}>
              Max. {day?.temperature.max} {day?.temperature.unit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default ScreenHome

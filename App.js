import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, SafeAreaView } from 'react-native';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
    </QueryClientProvider>
  )
}

function Pokemon() {
  const [found, setFound] = React.useState(0);
  const [gofetch, setGofetch] = React.useState(0);
  const [queryUrl, setQueryUrl] = React.useState(null);
  const [sprite, onChangeText] = React.useState('');
  const [apitext, setApitext] = React.useState('');

  const { isLoading, error, data } = useQuery(['repoData'], () =>
    fetch(queryUrl).then(res =>
      res.json()
    ),
  {enabled: !!gofetch}
)

  function SearchSprite() {
    setQueryUrl( 'https://pokeapi.co/api/v2/pokemon/' + sprite );
    
    setGofetch(1);

    if (isLoading) setApitext('Loading...');

    setTimeout(function() {
      setGofetch(0);
      setFound(1);
    }, 2000);
  }

  if (found === 1) {

    console.log(error);

    if (error){
      setTimeout(function() {
        setFound(0);
      }, 3000);
    }

    return (
      <>
        <View style={styles.container}> 
          {
            error?
              <Text style={styles.instructions}>
                  That pokemon doesn't exist T_T
              </Text>

            :
            <>
              <TouchableOpacity onPress={() => setFound(0)}>
                <Image source={data?.sprites.front_default} style={styles.thumbnail} />
              </TouchableOpacity>
              <Text style={styles.instructions}>
                Click on the sprite to go back
              </Text>
            </>
          }
        </View>
      </>
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sprite Finder
      </Text>
      <Text style={styles.instructions}>
        Type a pokemon name to get a sprite
      </Text>
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        onSubmitEditing={SearchSprite}
        value={sprite}
        placeholder="Pokemon name"
      />
    </SafeAreaView>
    <Text style={styles.instructions}>
        {apitext}
    </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#888',
    fontSize: 30,
    marginHorizontal: 15,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    margin: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

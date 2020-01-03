import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import CatalogSlider from './Components/CatalogSlider';
const API_KEY = '7369ea9c2752cd8d3b4e43603ed5432f';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [popularMovieData, setPopularMovieData] = useState({results: []});
  const [latestMovieData, setLatestMovieData] = useState({results: []});
  const [searchData, setSearchData] = useState({results: []});
  const [loading, setLoading] = useState(false);
  function searchMovie(text) {
    if (text !== '') {
      fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          API_KEY +
          '&page=1&query=' +
          text,
      )
        .then(response => response.json())
        .then(response => setSearchData(response))
        .then(setLoading(true))
        .catch(err => console.log(err));
    } else {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=' +
        API_KEY +
        '&page=1',
    )
      .then(response => response.json())
      .then(response => setPopularMovieData(response))
      .catch(err => console.log(err));
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=' +
        API_KEY +
        '&page=2',
    )
      .then(response => response.json())
      .then(response => setLatestMovieData(response))
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Browse</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search for Movies"
        placeholderTextColor={styles.searchBox.color}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          searchMovie(text);
        }}
      />
      {loading === false ? (
        <ScrollView>
          <View>
            <CatalogSlider title="Trending Daily" data={popularMovieData} />
            <CatalogSlider title="Trending Weekly" data={latestMovieData} />
            <CatalogSlider title="Trending Weekly" data={latestMovieData} />
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text style={styles.title}>Search Results for {searchQuery}</Text>
          <CatalogSlider title="" data={searchData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 30,
    padding: 5,
    fontFamily: 'Jokerman-Regular',
    textAlign: 'center',
  },
  searchBox: {
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },
});

export default App;

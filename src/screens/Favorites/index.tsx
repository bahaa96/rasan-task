import React, { useEffect, useState } from 'react';
import { AsyncStorage, SafeAreaView, StyleSheet } from 'react-native';

import Navbar from '../../components/Navbar';
import T from '../../components/Transliteration';
import { RootStackComponent } from '../../typings/routing';
import MovieList from '../Home/components/MovieList';
import { IMovie } from '../Home/components/MovieList/Model';

const Favorites: RootStackComponent<'Favorites'> = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    (async () => {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs) {
        console.log('fav: ', JSON.parse(favs));
        setMovies(JSON.parse(favs));
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title={<T name="FAVORITES_PAGE_TITLE" />} showActions={false} />
      <MovieList data={movies} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Favorites;

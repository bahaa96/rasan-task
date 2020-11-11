import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Navbar from '../../components/Navbar';
import T from '../../components/Transliteration';
import { RootStackComponent } from '../../typings/routing';
import MovieList from './components/MovieList';

const Home: RootStackComponent<'Home'> = () => (
  <SafeAreaView style={styles.container}>
    <Navbar title={<T name="HOME_PAGE_TITLE" />} showActions />
    <MovieList />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Home;

import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Navbar from '../../components/Navbar';
import MovieList from './components/MovieList';
import T from '../../components/Transliteration';
import { RootStackComponent } from '../../typings/routing';

const Home: RootStackComponent<'Home'> = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title={<T name={'HOME_PAGE_TITLE'} />} showActions />
      <MovieList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  }
})


export default Home;
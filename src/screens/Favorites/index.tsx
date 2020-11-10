import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
import Navbar from '../../components/Navbar';
import T from '../../components/Transliteration';
import { RootStackComponent } from '../../typings/routing';

const Favorites: RootStackComponent<'Favorites'> = () => {



  useEffect(() => {
    (async () => {
      const favs = await AsyncStorage.getItem('favorites')
      if (favs) {
        console.log('fav: ', JSON.parse(favs));
      }

    })()
    
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title={<T name={'FAVORITES_PAGE_TITLE'} />} showActions={false} />
      {/* <MovieList /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  }
})


export default Favorites;
import './src/locale/config';
import './src/utils';

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import { FavoritesContextProvider } from './src/context/FavoritesContext';
import Router from './src/router';
import theme from './src/theme';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="dark" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Layout style={styles.container}>
          <Router />
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;

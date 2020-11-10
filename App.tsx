import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components';
import theme from './src/theme';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Router from './src/router';

import './src/locale/config'

export default function App() {
  return (
    <Fragment>
      <StatusBar style={'dark'} />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Layout style={styles.container}>
          <Router />
        </Layout>
      </ApplicationProvider>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

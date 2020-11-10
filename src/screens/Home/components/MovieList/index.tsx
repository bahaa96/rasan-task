import { useTheme } from '@ui-kitten/components';
import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import queryStringify from 'qs-stringify';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View 
} from 'react-native';
import { useQuery } from 'react-query';
import { DataProvider, RecyclerListView } from 'recyclerlistview';

import config from '../../../../config';
import { ITheme } from '../../../../theme';
import MovieCard from '../MovieCard';
import { getLayoutProvider, IMovie, ViewTypes } from './Model';

const fetchMovies = async () => {
  const { API_URL, API_KEY } = config;
  const params = decamelizeKeys({
    apiKey: API_KEY,
    sortBy: 'popularity.desc',
  });
  const url = `${API_URL}/discover/movie/?${queryStringify(params)}`;

  const res = await axios.get(url);
  return res.data;
};

const MovieList = () => {
  const theme = useTheme();
  const styles = styleFactory(theme);
  const { isLoading, isError, data, error 
} = useQuery('movies', fetchMovies);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1.id !== r2.id),
  );
  const [count, setCount] = useState<number>(1);
  const [movies, setMovies] = useState([]);
  const [layoutProvider, setLayoutProvider] = useState(getLayoutProvider());

  const inProgressNetworkReq = false;
  const moviesPerPage = 20;

  const handleListEnd = () => {
    console.log('reached end');
  };

  const renderFooter = () => {
    if (inProgressNetworkReq) {
      return (
        <ActivityIndicator style={{ margin: 10 }} size="large" color="black" />
      );
    }

    return <View style={{ height: 60 }} />;
  };

  const rowRenderer = (type: ViewTypes, data: IMovie) => (
    <MovieCard movie={data} />
  );

  // const fetchMoreData = async () => {

  //   if (!inProgressNetworkReq) {
  //     //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
  //     //more than once
  //     inProgressNetworkReq = true;
  //     const images = await DataCall.get(count, 20);
  //     inProgressNetworkReq = false;

  //     setDataProvider(dataProvider.cloneWithRows(images.concat(images)))
  //     setImages(images.concat(images))
  //     setCount(count + 20)
  //   }
  // }

  useEffect(() => {
    if (data) {
      setDataProvider(dataProvider.cloneWithRows(data.results));
    }
  }, [data]);
  if (isLoading) {
    // Content loader
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text>
        Error:
        {error.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <RecyclerListView
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        onEndReached={handleListEnd}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        renderFooter={renderFooter}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
      />
    </View>
  );
};

const styleFactory = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      flex: 1,
    },
    listContentContainer: {
      paddingVertical: theme.spacing(0.6),
      paddingHorizontal: theme.spacing(0.75),
    },
  });

export default MovieList;

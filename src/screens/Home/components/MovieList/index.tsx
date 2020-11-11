import { useTheme } from '@ui-kitten/components';
import flatMap from 'lodash/flatMap';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { DataProvider, RecyclerListView } from 'recyclerlistview';

import MovieCard from '../MovieCard';
import { fetchMovies, getLayoutProvider, IMovie, ViewTypes } from './Model';
import { stylesFactory } from './styles';

const MovieList = () => {
  const theme = useTheme();
  const styles = stylesFactory(theme);
  const {
    status,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    data,
    error,
  } = useInfiniteQuery('movies', fetchMovies, {
    getFetchMore: (lastGroup) => {
      return lastGroup.page + 1;
    },
  });
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1.id !== r2.id;
    }),
  );
  const [layoutProvider, setLayoutProvider] = useState(getLayoutProvider());

  const handleListEnd = () => {
    console.log('reached end');
    if (canFetchMore) {
      fetchMore();
    }
  };

  const renderFooter = () => {
    if (isFetchingMore) {
      return (
        <ActivityIndicator style={{ margin: 10 }} size="large" color="black" />
      );
    }

    return <View style={{ height: 60 }} />;
  };

  const rowRenderer = (type: ViewTypes, data: IMovie) => {
    return <MovieCard movie={data} />;
  };

  useEffect(() => {
    if (data) {
      const concatenatedGroup = flatMap(data, (group) => {
        return group.results;
      });
      console.log('flat : ', concatenatedGroup);
      setDataProvider(dataProvider.cloneWithRows(concatenatedGroup));
    }
  }, [data]);

  if (status === 'loading') {
    // TODO: Content loader
    return <Text>Loading...</Text>;
  }

  if (status === 'error') {
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
        onEndReachedThreshold={200}
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

export default MovieList;

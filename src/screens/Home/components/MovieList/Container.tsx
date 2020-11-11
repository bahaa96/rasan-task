import flatMap from 'lodash/flatMap';
import React, { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import MovieList from '.';
import { fetchMovies } from './Model';

const MovieListContainer: React.FC = () => {
  const {
    status,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    data,
    error,
    refetch,
  } = useInfiniteQuery('movies', fetchMovies, {
    cacheTime: 0,
    getFetchMore: (lastGroup) => {
      return lastGroup.page + 1;
    },
  });

  const concatenatedGroup = useMemo(() => {
    return flatMap(data, (group) => {
      return group.results;
    });
  }, [data]);

  return (
    <MovieList
      data={concatenatedGroup}
      {...{
        isFetchingMore,
        status,
        fetchMore,
        canFetchMore,
        error,
        refetch,
      }}
    />
  );
};

export default MovieListContainer;

import React, { createContext, useEffect, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

import { IMovie } from '../screens/Home/components/MovieList/Model';
import { getStoredData, MyArray, storeData } from '../utils';
import * as actions from './actions';
import reducer from './reducer';

interface IContextProps {
  data: MyArray<IMovie>;
  addToFavorites: (movie: IMovie) => void;
  removeFromFavorites: (movieId: number) => void;
}

const FavoritesContext = createContext<IContextProps>({
  data: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const FavoritesContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { data: [] });

  const addToFavorites = async (movie: IMovie) => {
    dispatch(actions.add(movie));
  };

  const removeFromFavorites = (movieId: number) => {
    dispatch(actions.remove(movieId));
  };

  useEffect(() => {
    (async () => {
      const storedFavorites = await getStoredData('favorites');
      if (Array.isArray(storedFavorites) && storedFavorites.length) {
        dispatch(actions.set(storedFavorites));
      }
    })();
  }, []);

  useEffect(() => {
    if (state) {
      if (state.data?.length) {
        (async () => {
          if (state.data) {
            await storeData('favorites', state.data);
          }
        })();
      }
    }
  }, [state]);

  const value = {
    ...state,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FavoritesContext.Provider {...{ value }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

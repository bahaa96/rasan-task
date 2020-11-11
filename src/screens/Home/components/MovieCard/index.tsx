import { Button, useTheme } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { camelizeKeys } from 'humps';
import React, { useState } from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';

import HorizontalDivider from '../../../../components/HorizontalDivider';
import ImageRenderer from '../../../../components/ImageRenderer';
import config from '../../../../config';
import { IMovie } from '../MovieList/Model';
import { HeartIcon, ShareIcon } from './Model';
import { stylesFactory } from './styles';

interface IProps {
  movie: IMovie;
}

const MovieCard: React.FC<IProps> = ({ movie }) => {
  movie = camelizeKeys(movie);
  const theme = useTheme();
  const styles = stylesFactory(theme);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      addToFavorites(movie);
    } else {
      // removeFromFavorites()
    }
  };

  const addToFavorites = async (movieObject: IMovie) => {
    // check if it already in favorites
    if (movieObject) {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify([movieObject]));
      } catch (e) {
        console.log('error: ', e);
        alert(e.message);
      }
    }
  };

  const removeFromFavorites = (movieId: number) => {};

  const handleShare = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.posterWrapper}>
        <ImageRenderer
          style={styles.posterImage}
          imageUrl={`${config.CDN_URL}/t/p/w300${movie.posterPath}`}
        />
      </View>
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.header}
        >
          <View style={styles.ratingWrapper}>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>{movie.voteAverage}</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Button
              appearance="ghost"
              onPress={handleLike}
              accessoryLeft={() => <HeartIcon color={liked ? 'red' : ''} />}
            />
            <Button
              appearance="ghost"
              onPress={handleShare}
              accessoryLeft={ShareIcon}
            />
          </View>
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.movieTitle}>
            <Text style={styles.movieTitleText} numberOfLines={2}>
              {movie.title}
            </Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.metaText}>
              {movie.releaseDate.split('-').slice(0, 1)}
            </Text>
            <HorizontalDivider />
            <Text style={styles.metaText}>{movie.releaseDate}</Text>
          </View>
        </View>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.footer}
        >
          <View style={styles.genres}>
            <Button style={styles.genre} size="small" status="primary">
              Action
            </Button>
            <Button style={styles.genre} size="small" status="primary">
              Horror
            </Button>
          </View>
          <Button status="warning" style={styles.submit}>
            Book
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
};
export default MovieCard;

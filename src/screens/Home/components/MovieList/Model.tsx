import { Dimensions } from "react-native";
import { LayoutProvider } from "recyclerlistview";
import theme from "../../../../theme";


const { width, height } = Dimensions.get('window');

const getWindowWidth = () => {
  // To deal with precision issues on android
  return Math.round(width * 1000) / 1000 - (theme.spacingUnit(width, 0.75) * 2); 
  //Adjustment for margin given to the RecyclerListView + List Content Container theme.spacing(0.75) * 2;
}

export const MOVIE_CARD_HEIGHT = height * 0.75
export const MOVIE_CARD_BOTTOM_MARGIN = height * 0.08

export const getLayoutProvider = () => {
  return new LayoutProvider(() => {
    return 'MOVIE_CARD'
  }, (type, dim) => {
    switch (type) {
      case "MOVIE_CARD":
        dim.width = getWindowWidth();
        dim.height = MOVIE_CARD_HEIGHT + MOVIE_CARD_BOTTOM_MARGIN;
        break;
      default:
        dim.width = getWindowWidth();
        dim.height = 0;
    }
  })
}



export enum ViewTypes {
  MOVIE_CARD = 'MOVIE_CARD'
}

export interface IMovie { 
  backdropPath: string
  id: number
  originalTitle: string
  popularity: 2007.928
  posterPath: string
  releaseDate: string
  title: string
  voteAverage: number
}
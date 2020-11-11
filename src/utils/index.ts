import { AsyncStorage } from 'react-native';

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export interface MyArray<T> extends Array<T> {
  hasId(id: number | string): boolean;
}

// eslint-disable-next-line no-extend-native
Array.prototype.hasId = function hasId(id) {
  return this.some((movie) => {
    return movie.id === id;
  });
};

export const storeData = async (name: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    console.log('error: ', e);
    alert(e.message);
  }
};

export const getStoredData = async (name: string): Promise<any> => {
  try {
    const storedString = await AsyncStorage.getItem(name);
    if (storedString) {
      return JSON.parse(storedString);
    }
  } catch (e) {
    console.log('error: ', e);
    alert(e.message);
  }
};

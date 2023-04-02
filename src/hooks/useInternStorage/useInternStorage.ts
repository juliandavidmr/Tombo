import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useInternStorage = () => {
  const storeData = useCallback(async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  }, []);

  const getData = useCallback(async (storageKey: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }, []);

  return {storeData, getData};
};

export default useInternStorage;

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TDbPreventionAndSafetyEquipment} from '../../db/types';

export type RootStackParamList = {
  CheckList: {
    data: TDbPreventionAndSafetyEquipment;
  };
};

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const useAppNavigation = () => useNavigation<ProfileScreenNavigationProp>();

export default useAppNavigation;

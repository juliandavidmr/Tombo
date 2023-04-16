import React, {useCallback, useLayoutEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Checkbox, Heading, HStack, Spinner, Text, VStack} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import useInternStorage from '../../hooks/useInternStorage';
import {TPreventionAndSafetyEquipmentItem} from '../../db';
import {RootStackParamList} from '../../hooks/useNav/useAppNavigation';
import {CHECK_LIST_KEY_STORAGE_BASE} from './constants';

type TCheckListProps = Partial<
  NativeStackScreenProps<RootStackParamList, 'CheckList'>
>;

const CheckList: React.FC<TCheckListProps> = ({route}) => {
  const checklist = route?.params?.data.list || [];
  const meta = route?.params?.data.meta;
  const [loading, setLoading] = useState(false);
  const [currentChecklist, setCurrentChecklist] =
    useState<TPreventionAndSafetyEquipmentItem[]>(checklist);
  const {getData, storeData} = useInternStorage();

  const handleCheckState = useCallback(
    (id: number | string, checked: boolean) => {
      const newChecklist = currentChecklist.map(item => {
        if (item.id === id) {
          return {
            ...item,
            checked,
          };
        }

        return item;
      });

      setCurrentChecklist(newChecklist);

      return newChecklist;
    },
    [currentChecklist],
  );

  const handleCheckStorage = useCallback(
    (id: string | number, checked: boolean) => {
      handleCheckState(id, checked);
      storeData(CHECK_LIST_KEY_STORAGE_BASE + id, checked);
    },
    [handleCheckState, storeData],
  );

  useLayoutEffect(() => {
    setLoading(true);

    const updateInitialStateChecklist = async () => {
      try {
        const resultList: typeof currentChecklist = [];
        for (const item of currentChecklist) {
          const key: string = CHECK_LIST_KEY_STORAGE_BASE + item.id;
          const checked = !!(await getData<boolean>(key));

          resultList.push({
            ...item,
            checked,
          });
        }

        setCurrentChecklist(resultList);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    updateInitialStateChecklist();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading checklist" />
          <Heading color="primary.500" fontSize="md">
            Cargando lista de verificación
          </Heading>
        </HStack>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <VStack space={2}>
        {currentChecklist.map(item => (
          <Checkbox
            key={item.id}
            value={item.title}
            accessibilityLabel={item.title}
            defaultIsChecked={item.checked}
            onChange={checked => handleCheckStorage(item.id, checked)}>
            {item.title}
          </Checkbox>
        ))}
        {meta?.information && (
          <Text style={styles.information}>{meta.information}</Text>
        )}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  information: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    color: '#666',
    marginTop: 20,
    marginRight: 16,
    marginLeft: 16,
  },
});

export default CheckList;

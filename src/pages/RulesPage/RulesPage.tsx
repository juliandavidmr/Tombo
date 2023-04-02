import React from 'react';
import {View, Text, FlatList, HStack} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {db} from '../../db';
import useAppNavigation from '../../hooks/useNav/useAppNavigation';

type TRulesPageProps = Partial<{
  /**
   * @default true
   */
  withPadding: boolean;
}>;

const RulesPage: React.FC<React.PropsWithChildren<TRulesPageProps>> = ({
  withPadding = true,
}) => {
  const {navigate} = useAppNavigation();

  const data = [
    {
      icon: '🏍',
      title: 'Indumentaria reglamentaria para motos',
      page: 'CheckList',
      data: {...db.motorcycles.preventionAndSafetyEquipment},
    },
    {
      icon: '🚙',
      title: 'Indumentaria reglamentaria para autos',
      page: 'CheckList',
      data: {...db.autos.preventionAndSafetyEquipment},
    },
    {
      icon: '📑',
      title: 'Documentación reglamentaria para todos',
      page: 'CheckList',
      data: {...db.mandatoryDocuments},
    },
  ] as const;

  return (
    <View style={[styles.container, !withPadding && {paddingHorizontal: 0}]}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          const onPress = () =>
            navigate(item.page, {
              data: item.data,
            });

          return (
            <TouchableOpacity onPress={onPress}>
              <HStack style={styles.highlightCard}>
                <Text style={{marginRight: 12, fontSize: 20}}>{item.icon}</Text>
                <Text style={styles.highlightCardTitle}>{item.title}</Text>
              </HStack>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  search: {
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 4,
    marginBottom: 14,
  },
  highlightCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  highlightCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 20,
  },
});

export default RulesPage;

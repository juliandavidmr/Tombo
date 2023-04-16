import React, {useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import HomeCard, {THomeCardProps} from '../../components/HomeCard';
import RulesPage from '../RulesPage';
import Reminders from '../Reminders';

type THomeProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Home: React.FC<THomeProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const onMotorcyclePress = useCallback(
    (redirectTo: string) => {
      navigation.navigate(redirectTo, {name: 'Motorcycle'});
    },
    [navigation],
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const data: THomeCardProps[] = [
    {
      title: 'Motos',
      description: 'Todos las normas de tránsito para motos',
      onPress: () => onMotorcyclePress('RulesPage'),
      style: {
        backgroundColor: '#759bfc',
      },
      isDarkMode,
    },
    {
      title: 'Automóviles',
      description: 'Todos las normas de tránsito para automóviles',
      onPress: () => onMotorcyclePress('RulesPage'),
      style: {
        backgroundColor: '#b5a9f9',
      },
      isDarkMode,
    },
  ];

  return (
    <ScrollView>
      <View style={[backgroundStyle, styles.sectionContainer]}>
        <FlatList
          data={data}
          scrollEnabled={false}
          columnWrapperStyle={styles.containerFlex}
          renderItem={({item, index}) => {
            const isLastItem = index === data.length - 1;

            const customStyle = isLastItem
              ? [item.style, {...styles.flexItem, marginRight: 0}]
              : [item.style, styles.flexItem];

            return (
              <HomeCard
                key={index}
                title={item.title}
                description={item.description}
                isDarkMode={isDarkMode}
                style={customStyle}
                onPress={item.onPress}
              />
            );
          }}
          numColumns={2}
        />

        <RulesPage withPadding={false} />
        <Reminders />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  containerFlex: {
    flex: 1,
    justifyContent: 'space-around',
  },
  flexItem: {
    flex: 1,
    marginRight: 8,
  },
});

export default Home;

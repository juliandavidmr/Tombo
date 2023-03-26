import React, {useCallback} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeCard, {THomeCardProps} from '../../components/HomeCard';

type THomeProps = {
  isDarkMode: boolean;
};

const Home: React.FC<THomeProps> = ({isDarkMode}) => {
  const onMotorcyclePress = useCallback(() => {
    console.log('onMotorcyclePress');
  }, []);

  const data: THomeCardProps[] = [
    {
      title: 'Motos',
      description: 'Todos las normas de tránsito para motos',
      onPress: onMotorcyclePress,
      style: {
        backgroundColor: '#759bfc',
      },
      isDarkMode,
    },
    {
      title: 'Automóviles',
      description: 'Todos las normas de tránsito para automóviles',
      onPress: onMotorcyclePress,
      style: {
        backgroundColor: '#b5a9f9',
      },
      isDarkMode,
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.sectionContainer}>
      <View
        style={[
          {backgroundColor: isDarkMode ? Colors.black : Colors.lighter},
          styles.containerFlex,
        ]}>
        <FlatList
          data={data}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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

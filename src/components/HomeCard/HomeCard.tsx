import React from 'react';
import {Text, View} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import NamedStyles = StyleSheet.NamedStyles;

export type THomeCardProps = {
  isDarkMode: boolean;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle> | NamedStyles<unknown>;
  onPress: () => void;
};

const HomeCard: React.FC<THomeCardProps> = ({
  isDarkMode,
  title,
  description,
  style,
  onPress,
}) => {
  return (
    <View
      style={[
        {backgroundColor: isDarkMode ? Colors.black : Colors.lighter},
        style,
        styles.card,
      ]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '800',
    marginBottom: 4,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeCard;

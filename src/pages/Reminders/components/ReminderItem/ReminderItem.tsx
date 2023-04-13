import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

export type TReminderItemProps = {
  title: string;
  expirationDate: Date;
  updatedAt?: Date;
  onPress?: () => void;
};

const ReminderItem: React.FC<TReminderItemProps> = ({
  title,
  expirationDate,
  updatedAt,
  onPress,
}) => {
  const [remainingDays, setRemainingDays] = useState<number>(0);

  useEffect(() => {
    if (expirationDate) {
      const days = moment(expirationDate).diff(moment(), 'days');
      setRemainingDays(days);
    }
  }, [expirationDate]);

  const renderRemainingDays = useCallback(() => {
    if (expirationDate === undefined) {
      return (
        <Text style={styles.wrapperExpirationDateEmpty}>
          Presiona para agregar una fecha de vencimiento
        </Text>
      );
    }

    if (remainingDays > 0) {
      const alertMode = remainingDays <= 5;
      const warningMode = remainingDays > 5 && remainingDays <= 30;

      return (
        <View
          style={[
            styles.wrapperExpirationDateCommon,
            styles.wrapperExpirationDateRemaining,
            alertMode && styles.wrapperExpirationDateRemainingAlert,
            warningMode && styles.wrapperExpirationDateRemainingWarning,
          ]}>
          <Text
            style={[
              alertMode && styles.wrapperExpirationDateRemainingAlertText,
            ]}>
            Falta{remainingDays > 1 && 'n'}{' '}
            <Text style={{fontWeight: 'bold'}}>{remainingDays}</Text> dia
            {remainingDays > 1 && 's'} para vencer {alertMode && '⚠️'}
          </Text>
        </View>
      );
    }

    if (remainingDays === 0) {
      return (
        <View
          style={[
            styles.wrapperExpirationDateCommon,
            styles.wrapperExpirationDateRemainingAlert,
          ]}>
          <Text style={styles.wrapperExpirationDateRemainingAlertText}>
            Vence hoy ⚠️
          </Text>
        </View>
      );
    }

    return <Text>Vencido</Text>;
  }, [expirationDate, remainingDays]);

  const renderLastUpdate = useCallback(() => {
    if (updatedAt) {
      const days = moment(updatedAt).diff(moment(), 'days');
      const humanized = moment(updatedAt).locale('es').fromNow();

      return (
        <Text style={styles.lastUpdate}>
          Ultima actualización hace {days} dia{days > 1 && 's'} ({humanized})
        </Text>
      );
    }
  }, [updatedAt]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {renderRemainingDays()}
        {renderLastUpdate()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#ccc',
  },
  // Wrapper expiration date styles
  wrapperExpirationDateCommon: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  wrapperExpirationDateEmpty: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  wrapperExpirationDateRemaining: {
    backgroundColor: '#ececec',
  },
  wrapperExpirationDateRemainingAlert: {
    // Red alert
    backgroundColor: '#ff0000',
  },
  wrapperExpirationDateRemainingWarning: {
    // Orange
    backgroundColor: '#ff8c00',
  },
  wrapperExpirationDateRemainingAlertText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReminderItem;

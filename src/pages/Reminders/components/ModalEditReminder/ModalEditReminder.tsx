import React, {useCallback, useEffect, useMemo, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {
  Button,
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import type {TReminderItemProps} from '../ReminderItem';

type TModalEditReminderProps = {
  open: boolean;
  reminder?: TReminderItemProps;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  /**
   * @description This is used to reset the reminder date to the minimum date
   */
  onReset: () => void;
};

const ModalEditReminder: React.FC<TModalEditReminderProps> = ({
  open,
  reminder,
  onClose,
  onConfirm: onConfirmProp,
  onReset,
}) => {
  const [date, onChangeDate] = useState<Date | undefined>(undefined);
  const minimumDate = useMemo(() => moment().toDate(), []);
  const minimumDateHumanized = moment(minimumDate).format('DD/MM/YYYY');

  const onConfirm = useCallback(() => {
    onConfirmProp(date!);
  }, [date, onConfirmProp]);

  useEffect(() => {
    if (reminder?.expirationDate && moment(reminder.expirationDate).isValid()) {
      onChangeDate(reminder.expirationDate);
    } else {
      onChangeDate(minimumDate);
    }
  }, [minimumDate, reminder?.expirationDate]);

  return (
    <Modal
      animationType="slide"
      visible={open}
      presentationStyle="formSheet"
      onDismiss={onClose}
      onRequestClose={onClose}>
      <SafeAreaView>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            Actualizar la fecha {reminder?.title.toLowerCase()}
          </Text>
          {!!date && (
            <DatePicker
              date={date}
              onDateChange={onChangeDate}
              minimumDate={minimumDate}
              minuteInterval={10}
              mode="date"
            />
          )}
          <Text style={styles.minDate}>
            La fecha mínima debe ser mayor o igual a {minimumDateHumanized}.
          </Text>

          <TouchableOpacity onPress={onReset}>
            <Text style={[styles.centerText, styles.buttonDeleteDate]}>
              Resetear fecha
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalFlex}>
            <Button onPress={onClose} title="Cancelar" color="red" />
            <Button onPress={onConfirm} title="Actualizar" />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    padding: 16,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'left',
  },
  centerText: {
    textAlign: 'center',
  },
  minDate: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 12,
  },
  verticalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  buttonDeleteDate: {
    color: 'red',
    fontSize: 12,
  },
});

export default ModalEditReminder;

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import moment from 'moment';

import ReminderItem from './components/ReminderItem/ReminderItem';
import ModalEditReminder from './components/ModalEditReminder';
import {REMINDERS, TReminder} from './constants';
import useInternStorage from '../../hooks/useInternStorage';

const Reminders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<TReminder>();
  const [reminders, setReminders] = useState<TReminder[]>([]);
  const {storeData, getData} = useInternStorage();

  const closeReminderModal = useCallback(() => {
    setModalVisible(false);
    setSelectedReminder(undefined);
  }, []);

  const handleReminderPress = useCallback(
    (reminder: TReminder) => () => {
      setSelectedReminder(reminder);
      setModalVisible(true);
    },
    [],
  );

  const refreshReminders = useCallback(async () => {
    const newReminders: TReminder[] = [];

    for await (const reminder of REMINDERS) {
      const dateStr = await getData<string>(reminder.storageKey);
      const dateMoment = moment(dateStr, 'DD/MM/YYYY HH:mm');

      if (!dateStr || !dateMoment.isValid()) {
        newReminders.push(reminder);
        continue;
      }

      newReminders.push({
        ...reminder,
        expirationDate: dateMoment.toDate(),
      });
    }

    setReminders(newReminders);
  }, [getData]);

  const handleReminderConfirm = useCallback(
    /**
     * @param date If undefined, the reminder will be reset
     */
    async (date?: Date) => {
      if (selectedReminder) {
        let stringDateTime = '';

        if (date) {
          stringDateTime = moment(date).format('DD/MM/YYYY HH:mm');
        }

        await storeData(selectedReminder.storageKey, stringDateTime);

        setModalVisible(false);
        setSelectedReminder(undefined);

        await refreshReminders();
      } else {
        console.error('No reminder selected');
      }

      closeReminderModal();
    },
    [closeReminderModal, refreshReminders, selectedReminder, storeData],
  );

  const handleReminderReset = useCallback(
    () => handleReminderConfirm(undefined),
    [handleReminderConfirm],
  );

  useEffect(() => {
    refreshReminders();
    // eslint-disable-next-line
  }, []);

  return (
    <View>
      <Text style={styles.title}>Recordatorios</Text>

      <FlatList<TReminder>
        scrollEnabled={false}
        data={reminders}
        renderItem={({item}) => (
          <ReminderItem {...item} onPress={handleReminderPress(item)} />
        )}
      />

      <ModalEditReminder
        open={modalVisible}
        onClose={closeReminderModal}
        reminder={selectedReminder}
        onConfirm={handleReminderConfirm}
        onReset={handleReminderReset}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
});

export default Reminders;

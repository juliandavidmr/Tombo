import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import {Text} from 'native-base';
import moment from 'moment';

import ReminderItem, {
  TReminderItemProps,
} from './components/ReminderItem/ReminderItem';
import reminderItem from './components/ReminderItem/ReminderItem';

const Reminders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] =
    useState<TReminderItemProps>();

  const handleReminderPress = useCallback(
    (reminder: TReminderItemProps) => () => {
      setSelectedReminder(reminder);
      setModalVisible(true);
    },
    [],
  );

  return (
    <View>
      <Text style={styles.title}>Recordatorios</Text>

      <FlatList<TReminderItemProps>
        scrollEnabled={false}
        data={[
          {
            title: 'Vencimiento extintor',
            expirationDate: moment().add(1, 'days').toDate(),
            updatedAt: new Date(),
          },
          {
            title: 'Vencimiento SOAT',
            expirationDate: moment().add(2, 'days').toDate(),
            updatedAt: new Date(),
          },
          {
            title: 'Vencimiento revisión técnica',
            expirationDate: moment().add(24, 'days').toDate(),
            updatedAt: new Date(),
          },
          {
            title: 'Vencimiento licencia de conducir',
            expirationDate: moment().add(30, 'days').toDate(),
            updatedAt: new Date(),
          },
        ]}
        renderItem={({item}) => (
          <ReminderItem {...item} onPress={handleReminderPress(item)} />
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');

          setModalVisible(!modalVisible);
          setSelectedReminder(undefined);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Actualizar la fecha {selectedReminder?.title.toLowerCase()}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Actualizar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
});

export default Reminders;

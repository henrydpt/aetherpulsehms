import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import { COLORS } from '../theme/colors';

import {
  getPendingMedicationOrders,
} from '../services/dispenseService';

export default function DispensingQueueScreen() {

  const navigation =
    useNavigation<any>();

  const [
    orders,
    setOrders,
  ] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);
useFocusEffect(
  React.useCallback(() => {
    loadOrders();
  }, [])
);
  async function loadOrders() {
    const data =
      await getPendingMedicationOrders();

    setOrders(data);
  }

  function renderItem({
    item,
  }: any) {

const patient =
  item.patient;

    return (

      <View style={styles.card}>

        <Text style={styles.patient}>
          {patient?.name}
        </Text>

        <Text style={styles.detail}>
          {item.admission?.admission_number}
        </Text>

        <Text style={styles.detail}>
          {patient?.ward}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.medicine}>
          {item.medication_name}
        </Text>

        <Text style={styles.detail}>
          {item.dose}
          {' • '}
          {item.route}
        </Text>

        <Text style={styles.detail}>
          {item.frequency}
        </Text>

        <View
          style={styles.footer}
        >

<Text
  style={styles.pending}
>
  {item.status}
</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(
                'Dispense Medication',
                {
                  order: item,
                }
              )
            }
          >
            <Text
              style={styles.buttonText}
            >
              Dispense
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    );
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <View
        style={styles.topBar}
      >
        <Text
          style={styles.title}
        >
          Dispensing Queue
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={
          renderItem
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30,
        }}
      />

    </SafeAreaView>

  );

}

const styles =
StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#F8FAFC',
  },

  topBar: {
    height: 90,
    paddingTop: 20,
    justifyContent:
      'center',
    alignItems:
      'center',
    backgroundColor:
      COLORS.primary,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor:
      '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  patient: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  medicine: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: COLORS.primary,
  },

  detail: {
    marginTop: 4,
    color: '#64748B',
  },

  divider: {
    height: 1,
    backgroundColor:
      '#E2E8F0',
    marginVertical: 12,
  },

  footer: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems:
      'center',
  },

  pending: {
    color: '#D97706',
    fontWeight: '700',
  },

  button: {
    backgroundColor:
      COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

});
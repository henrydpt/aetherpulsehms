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
} from '@react-navigation/native';

import { COLORS } from '../theme/colors';

import {
  getDispensedMedicationOrders,
} from '../services/dispenseService';

export default function DispensedMedicationsScreen() {

  const navigation =
    useNavigation<any>();

  const [
    orders,
    setOrders,
  ] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {

const data =
  await getDispensedMedicationOrders();

console.log(
  'Dispensed Orders:',
  JSON.stringify(data, null, 2)
);

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
            style={{
              color: '#16A34A',
              fontWeight: '700',
            }}
          >
            {item.status}
          </Text>

<TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate(
      'Medication Timeline',
      {
        admission:
          item.admission,
        medicationOrder:
          item,
      }
    )
  }
>
  <Text
    style={styles.buttonText}
  >
    Medication Timeline
  </Text>
</TouchableOpacity>

        </View>

      </View>

    );

  }

  return (
    <SafeAreaView style={styles.container}>

  <View style={styles.topBar}>
    <Text style={styles.topBarTitle}>
      Dispensed Medications
    </Text>
  </View>

  <FlatList
    data={orders}
    keyExtractor={(item) => item.id}
    renderItem={renderItem}
    contentContainerStyle={{
      padding: 16,
      paddingBottom: 24,
    }}
    ListEmptyComponent={
      <View
        style={{
          marginTop: 60,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#64748B',
            fontSize: 16,
          }}
        >
          No dispensed medications.
        </Text>
      </View>
    }
  />

</SafeAreaView>

);
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  topBar: {
    height: 90,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
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
    color: COLORS.primary,
    marginTop: 8,
  },

  detail: {
    marginTop: 4,
    color: '#64748B',
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },

  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

});
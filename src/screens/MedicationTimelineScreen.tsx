import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  useRoute,
} from '@react-navigation/native';

import { COLORS } from '../theme/colors';

import PatientModuleHeader
  from '../components/patient/PatientModuleHeader';

import {
  getMedicationAdministrations,
} from '../services/medicationAdministrationService';

import { supabase }
  from '../lib/supabase';

export default function MedicationTimelineScreen() {

  const route = useRoute<any>();

  const {
    admission,
    medicationOrder,
  } = route.params;
console.log('Admission Context:', admission);
  const [
    dispense,
    setDispense,
  ] = useState<any>(null);

  const [
    administrations,
    setAdministrations,
  ] = useState<any[]>([]);

  useEffect(() => {
    loadTimeline();
  }, []);

  async function loadTimeline() {

    const {
      data,
    } = await supabase
      .from('medication_dispense')
      .select('*')
      .eq(
        'medication_order_id',
        medicationOrder.id
      )
      .single();

    setDispense(data);

    const adminHistory =
      await getMedicationAdministrations(
        medicationOrder.id
      );

    setAdministrations(
      adminHistory
    );

  }

  return (
    <SafeAreaView style={styles.container}>

  <View style={styles.topBar}>
    <Text style={styles.topBarTitle}>
      Medication Timeline
    </Text>
  </View>

  <ScrollView
    contentContainerStyle={{
      paddingBottom: 24,
    }}
    showsVerticalScrollIndicator={false}
  >

    <PatientModuleHeader
      admission={admission}
    />

    <View style={styles.card}>

      <Text style={styles.sectionTitle}>
        Medication Order
      </Text>

      <Text style={styles.title}>
        {medicationOrder.medication_name}
      </Text>

      <Text style={styles.detailText}>
        {medicationOrder.dose}
        {' • '}
        {medicationOrder.route}
      </Text>

      <Text style={styles.detailText}>
        {medicationOrder.frequency}
      </Text>

      <Text style={styles.detailText}>
        Status : {medicationOrder.status}
      </Text>

    </View>

    {dispense && (

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Dispense Details
        </Text>

        <Text style={styles.detailText}>
          Dispensed By : {dispense.dispensed_by}
        </Text>

        <Text style={styles.detailText}>
          Quantity : {dispense.quantity}
        </Text>

        <Text style={styles.detailText}>
          Remarks : {dispense.remarks}
        </Text>

        <Text style={styles.detailText}>
          {new Date(
            dispense.dispensed_at
          ).toLocaleString()}
        </Text>

      </View>

    )}

    {administrations.length > 0 && (

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Administration History
        </Text>

        {administrations.map(
          (item: any) => (

            <View
              key={item.id}
              style={{
                marginTop: 12,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E2E8F0',
              }}
            >

              <Text
                style={styles.detailText}
              >
                Status : {item.status}
              </Text>

              <Text
                style={styles.detailText}
              >
                By : {item.administered_by}
              </Text>

              <Text
                style={styles.detailText}
              >
                {new Date(
                  item.administered_at
                ).toLocaleString()}
              </Text>

              {item.remarks ? (
                <Text
                  style={styles.detailText}
                >
                  Remarks : {item.remarks}
                </Text>
              ) : null}

            </View>

          )
        )}

      </View>

    )}

  </ScrollView>

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
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
    padding: 16,
  },

  sectionTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },

  detailText: {
    color: '#475569',
    fontSize: 15,
    marginTop: 6,
  },

});
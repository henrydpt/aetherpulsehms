import React, {
  useEffect,
  useState,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../theme/colors';

import {
  getLatestConsultation,
} from '../services/consultationQueryService';

export default function
IpdPatientDetailScreen() {
  const route = useRoute<any>();

  const admission =
    route.params?.admission;
const [
  consultation,
  setConsultation,
] = useState<any>(null);

useEffect(() => {
  loadConsultation();
}, []);

async function
loadConsultation() {
  const data =
    await getLatestConsultation(
      admission?.patient_id
    );

  setConsultation(data);
}
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.topBar}>
        <Text
          style={styles.topBarTitle}
        >
          IPD Patient Detail
        </Text>
      </View>

<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Patient Summary
  </Text>

  <Text style={styles.title}>
    {admission?.patientName}
  </Text>

  <Text style={styles.detailText}>
    Patient ID:
    {' '}
    {admission?.patient_id}
  </Text>
</View>

<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Admission Details
  </Text>

  <Text style={styles.detailText}>
    Admission No:
    {' '}
    {admission?.admission_number}
  </Text>

  <Text style={styles.detailText}>
    Ward:
    {' '}
    {admission?.wardName}
  </Text>

  <Text style={styles.detailText}>
    Bed:
    {' '}
    {admission?.bedNumber}
  </Text>

  <Text style={styles.detailText}>
    Status:
    {' '}
    {admission?.status}
  </Text>
</View>

<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Latest Consultation
  </Text>

<Text style={styles.detailText}>
  Complaint:
  {' '}
  {consultation?.chief_complaint || '-'}
</Text>

<Text style={styles.detailText}>
  Diagnosis:
  {' '}
  {consultation?.diagnosis || '-'}
</Text>

<Text style={styles.detailText}>
  Prescription:
  {' '}
  {consultation?.prescription || '-'}
</Text>

<Text style={styles.detailText}>
  Notes:
  {' '}
  {consultation?.notes || '-'}
</Text>

<Text style={styles.detailText}>
  BP:
  {' '}
  {consultation?.bp || '-'}
</Text>

<Text style={styles.detailText}>
  Pulse:
  {' '}
  {consultation?.pulse || '-'}
</Text>

<Text style={styles.detailText}>
  SPO2:
  {' '}
  {consultation?.spo2 || '-'}
</Text>
</View>
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
      backgroundColor:
        COLORS.primary,
      justifyContent:
        'center',
      alignItems: 'center',
    },

    topBarTitle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
    },

    card: {
      margin: 16,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 16,
      padding: 16,
    },

title: {
  fontSize: 22,
  fontWeight: '700',
  marginTop: 8,
},

sectionTitle: {
  color: COLORS.primary,
  fontWeight: '700',
  fontSize: 16,
  marginBottom: 8,
},

detailText: {
  color: '#475569',
  marginTop: 6,
},
  });
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  admission: any;
}

export default function PatientModuleHeader({
  admission,
}: Props) {
  return (
    <View style={styles.card}>
<Text style={styles.title}>
  {admission?.patient?.name ||
    admission?.patientName ||
    '-'}
</Text>

<View
  style={{
    marginTop: 8,
  }}
>
  <Text style={styles.detail}>
    Admission No: {admission?.admission_number}
  </Text>

  <Text style={styles.detail}>
    Ward: {
  admission?.patient?.ward ||
  admission?.wardName ||
  '-'
}
  </Text>

  <Text style={styles.detail}>
    Bed: {
  admission?.bed?.bed_number ||
  admission?.bedNumber ||
  '-'
}
  </Text>

  <Text style={styles.detail}>
    Status: {admission?.status}
  </Text>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },

  detail: {
    fontSize: 15,
    color: '#475569',
    marginTop: 4,
  },
});
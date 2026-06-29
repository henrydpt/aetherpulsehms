import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  patient: any;
}

export default function PatientHeader({
  patient,
}: Props) {

  if (!patient) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {patient.name}
      </Text>

      <Text style={styles.info}>
        {patient.id}
      </Text>

      <Text style={styles.info}>
        {patient.gender}
        {' | '}
        {patient.age}
        {' Years'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    margin: 14,
    borderRadius: 16,
    padding: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },

  info: {
    marginTop: 8,
    color: '#475569',
  },
});
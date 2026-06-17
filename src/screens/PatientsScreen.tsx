import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { usePatientStore } from '../store/patientStore';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import { StatusBar } from 'react-native';
export default function PatientsScreen() {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');

const patients = usePatientStore(
  (state) => state.patients
);

const filteredPatients = patients.filter(
  (patient) =>
    patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    patient.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
);
  return (
    <SafeAreaView style={styles.container}>
     <StatusBar
  backgroundColor={COLORS.primary}
  barStyle="light-content"
/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <View style={{ width: 24 }} />

          <Text style={styles.topBarTitle}>
            Patients
          </Text>

          <TouchableOpacity
  onPress={() =>
    navigation.navigate('AddPatient')
  }
>
  <Text style={styles.icon}>＋</Text>
</TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
  placeholder="Search patients by name or ID"
  placeholderTextColor="#94A3B8"
  value={searchQuery}
  onChangeText={setSearchQuery}
  style={styles.searchInput}
/>
        </View>

{filteredPatients.map((patient) => (
 <PatientCard
  key={patient.id}
  patient={patient}
  name={patient.name}
  age={String(patient.age)}
  gender={patient.gender}
  ward={patient.ward}
  diagnosis={patient.diagnosis}
  onPress={() =>
    navigation.navigate('PatientDetail', {
      patient,
    })
  }
/>
))}
      </ScrollView>
    </SafeAreaView>
  );
}

function PatientCard({
  patient,
  name,
  age,
  gender,
  ward,
  diagnosis,
  onPress,
}: any) {
  return (
    <TouchableOpacity
  style={styles.card}
  onPress={onPress}
>
      <View style={styles.avatar}>
        <Text style={{ fontSize: 20 }}>👤</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.meta}>
          {age} Y / {gender}
        </Text>

        <Text style={styles.meta}>
          {ward}
        </Text>

        <Text style={styles.diagnosis}>
          {diagnosis}
        </Text>
      </View>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
  },

  content: {
    paddingBottom: 100,
  },

topBar: {
  height: 90,
  paddingTop: 20,
  backgroundColor: COLORS.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 18,
},

topBarTitle: {
  color: COLORS.card,
  fontSize: 18,
  fontWeight: '700',
},

  icon: {
    color: '#FFFFFF',
    fontSize: 22,
  },

  searchContainer: {
    padding: 14,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  meta: {
    color: '#64748B',
    marginTop: 2,
    fontSize: 13,
  },

  diagnosis: {
    color: '#334155',
    marginTop: 4,
    fontSize: 13,
  },

  arrow: {
    fontSize: 28,
    color: '#94A3B8',
  },
});
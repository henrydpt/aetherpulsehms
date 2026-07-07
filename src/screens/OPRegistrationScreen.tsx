import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import { COLORS } from '../theme/colors';

import {
  usePatientStore,
} from '../store/patientStore';

import {
  createOpEncounter,
} from '../services/opdService';

import {
  getActiveOpEncounter,
} from '../services/opEncounterQueryService';

export default function OPRegistrationScreen() {

  const navigation =
    useNavigation<any>();

  const [searchQuery, setSearchQuery] =
    useState('');

  const loadPatients =
    usePatientStore(
      (state) => state.loadPatients
    );

  const patients =
    usePatientStore(
      (state) => state.patients
    );

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients =
    patients.filter(
      (patient) =>
        patient.name
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        patient.id
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )
    );
  async function registerPatient(
    patient: any
  ) {

    const existing =
      await getActiveOpEncounter(
        patient.id
      );

    if (existing) {

      Alert.alert(
        'Already Registered',
        'Patient is already in OP Queue.'
      );

      return;
    }

    const encounter =
      await createOpEncounter(
        patient.id
      );

    Alert.alert(
      'Registration Successful',
      `Token: ${encounter.token_number}`,
      [
        {
          text: 'OK',
onPress: () => {
  navigation.navigate(
    'MainDrawer',
    {
      screen: 'MainTabs',
      params: {
        screen: 'OPD',
      },
    }
  );
},
        },
      ]
    );

  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          OP Registration
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >

        <TextInput
          placeholder="Search patient by name or ID"
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        {filteredPatients.map(
          (patient) => (

<View
  key={patient.id}
  style={styles.patientCard}
>

  <Text
    style={styles.patientName}
  >
    {patient.name}
  </Text>

  <Text
    style={styles.patientMeta}
  >
    {patient.id}
  </Text>

  <Text
    style={styles.patientMeta}
  >
    {patient.age} Y / {patient.gender}
  </Text>

  <Text
    style={styles.patientMeta}
  >
    Doctor:
    {' '}
    {patient.doctorAssigned || '-'}
  </Text>

  <TouchableOpacity
    style={styles.registerButton}
    onPress={() =>
      registerPatient(
        patient
      )
    }
  >
    <Text
      style={styles.registerButtonText}
    >
      Register
    </Text>
  </TouchableOpacity>

</View>

          )
        )}

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
  },

  header: {
    height: 90,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  patientCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  patientName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
  },

  patientMeta: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 14,
  },
registerButton: {
  marginTop: 14,
  backgroundColor: COLORS.primary,
  borderRadius: 10,
  paddingVertical: 10,
  alignItems: 'center',
},

registerButtonText: {
  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 15,
},
});
import React, {
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';

import { COLORS } from '../theme/colors';

import PatientModuleHeader
  from '../components/patient/PatientModuleHeader';

import {
  saveMedicationAdministration,
} from '../services/medicationAdministrationService';

export default function MedicationAdministrationRecordScreen() {

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const {
    admission,
    medicationOrder,
  } = route.params;

  const [
    status,
    setStatus,
  ] = useState('Given');

  const [
    remarks,
    setRemarks,
  ] = useState('');

  async function handleSave() {
    await saveMedicationAdministration(
      medicationOrder.id,
      status,
      new Date().toISOString(),
      'Nurse',
      remarks
    );

    Alert.alert(
      'Success',
      'Medication administration recorded.',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.goBack(),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={
      Platform.OS === 'ios'
        ? 'padding'
        : 'height'
    }
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
    >
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>
          Medication Administration
        </Text>
      </View>

      <PatientModuleHeader
        admission={admission}
      />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Medication
        </Text>

        <Text style={styles.title}>
          {medicationOrder.medication_name}
        </Text>

        <Text style={styles.detailText}>
          {medicationOrder.dose} • {medicationOrder.route}
        </Text>

        <Text style={styles.detailText}>
          {medicationOrder.frequency} • {medicationOrder.duration_days} Days
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Status
        </Text>

<View
  style={{
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  }}
>
  <Picker
    selectedValue={status}
    onValueChange={setStatus}
  >
    <Picker.Item
      label="Given"
      value="Given"
    />
    <Picker.Item
      label="Delayed"
      value="Delayed"
    />
    <Picker.Item
      label="Missed"
      value="Missed"
    />
    <Picker.Item
      label="Refused"
      value="Refused"
    />
  </Picker>
</View>

        <TextInput
          value={remarks}
          onChangeText={setRemarks}
          placeholder="Remarks"
          multiline
          style={[
            styles.input,
            {
              minHeight: 90,
              textAlignVertical: 'top',
            },
          ]}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            Save Administration
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
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
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  sectionTitle: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },

  detailText: {
    marginTop: 6,
    color: '#475569',
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
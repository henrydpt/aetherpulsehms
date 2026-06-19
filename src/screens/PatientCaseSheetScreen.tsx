import React, {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePatientStore } from '../store/patientStore';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../theme/colors';

export default function PatientCaseSheetScreen() {
  const route = useRoute<any>();
  const patientId = route.params?.patient?.id;

const patient = usePatientStore(
  (state) =>
    state.patients.find(
      (p) => p.id === patientId
    )
);
  const updatePatient = usePatientStore(
  (state) => state.updatePatient
);

  const [chiefComplaint, setChiefComplaint] =
    useState(patient?.chiefComplaint || '');

  const [clinicalHistory, setClinicalHistory] =
    useState(patient?.clinicalHistory || '');

  const [treatmentPlan, setTreatmentPlan] =
    useState(patient?.treatmentPlan || '');

  const [doctorNotes, setDoctorNotes] =
    useState(patient?.doctorNotes || '');
useEffect(() => {
  if (!patient) return;

  setChiefComplaint(
    patient.chiefComplaint || ''
  );

  setClinicalHistory(
    patient.clinicalHistory || ''
  );

  setTreatmentPlan(
    patient.treatmentPlan || ''
  );

  setDoctorNotes(
    patient.doctorNotes || ''
  );
}, [patient]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
<View style={styles.topBar}>
  <View style={{ width: 24 }} />

  <Text style={styles.topBarTitle}>
    Patient Case Sheet
  </Text>

  <View style={{ width: 20 }} />
</View>
      <KeyboardAwareScrollView
  enableOnAndroid={true}
  extraScrollHeight={120}
  keyboardShouldPersistTaps="handled"
  contentContainerStyle={{
    padding: 16,
    paddingBottom: 180,
  }}
>

<View style={styles.card}>
  <Text style={styles.name}>
    {patient?.name}
  </Text>

  <Text style={styles.info}>
    Doctor: {patient?.doctorAssigned || '-'}
  </Text>

  <Text style={styles.info}>
    {patient?.ward}
  </Text>
</View>

<View style={styles.card}>
  <Text style={styles.sectionHeading}>
    Chief Complaint
  </Text>

  <TextInput
    value={chiefComplaint}
    onChangeText={setChiefComplaint}
    multiline
    style={styles.textArea}
  />
</View>

<View style={styles.card}>
  <Text style={styles.sectionHeading}>
    Clinical History
  </Text>

  <TextInput
          value={clinicalHistory}
          onChangeText={setClinicalHistory}
          multiline
          style={styles.textArea}
  />
</View>

<View style={styles.card}>
  <Text style={styles.sectionHeading}>
    Treatment Plan
  </Text>

  <TextInput
          value={treatmentPlan}
          onChangeText={setTreatmentPlan}
          multiline
          style={styles.textArea}
  />
</View>

<View style={styles.card}>
  <Text style={styles.sectionHeading}>
    Doctor Notes
  </Text>

  <TextInput
          value={doctorNotes}
          onChangeText={setDoctorNotes}
          multiline
          style={styles.textArea}
  />
</View>
<TouchableOpacity
  style={styles.saveButton}
  onPress={() => {
    if (!patient) return;

    updatePatient(
      patient.id,
      {
        chiefComplaint,
        clinicalHistory,
        treatmentPlan,
        doctorNotes,
      }
    );

    Alert.alert(
      'Saved',
      'Case sheet updated.'
    );
  }}
>
  <Text style={styles.buttonText}>
    Save Notes
  </Text>
</TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    minHeight: 80,
    padding: 14,
    marginBottom: 0,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
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

card: {
  backgroundColor: '#FFFFFF',
  marginBottom: 14,
  borderRadius: 16,
  padding: 18,
},

name: {
  fontSize: 20,
  fontWeight: '700',
  color: '#1E293B',
},

info: {
  marginTop: 6,
  color: '#64748B',
},

sectionHeading: {
  fontSize: 16,
  fontWeight: '700',
  marginBottom: 10,
  color: '#1E293B',
},

saveButton: {
  backgroundColor: COLORS.primary,
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
  marginBottom: 20,
},
});
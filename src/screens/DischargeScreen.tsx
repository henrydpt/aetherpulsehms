import React, {
  useEffect,
  useState,
} from 'react';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { COLORS } from '../theme/colors';
import {
  getLatestConsultation,
} from '../services/consultationQueryService';
import {
  getDoctorRounds,
} from '../services/doctorRoundService';
import {
  getNursingNotes,
} from '../services/nursingNoteService';
import {
  getVitalsHistory,
} from '../services/vitalsQueryService';
import {
  saveDischargeSummary,
  dischargeAdmission,
} from '../services/dischargeService';
export default function
DischargeScreen() {

  const route =
    useRoute<any>();
const navigation =
  useNavigation<any>();
  const admission =
    route.params?.admission;
const [
  consultation,
  setConsultation,
] = useState<any>(null);
const [
  latestDoctorRound,
  setLatestDoctorRound,
] = useState<any>(null);
const [
  latestNursingNote,
  setLatestNursingNote,
] = useState<any>(null);
const [
  latestVitals,
  setLatestVitals,
] = useState<any>(null);
const [
  dischargeDiagnosis,
  setDischargeDiagnosis,
] = useState('');

const [
  hospitalCourse,
  setHospitalCourse,
] = useState('');

const [
  dischargeMedications,
  setDischargeMedications,
] = useState('');

const [
  dischargeInstructions,
  setDischargeInstructions,
] = useState('');

const [
  dischargeFollowUpDate,
  setDischargeFollowUpDate,
] = useState('');
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
const rounds =
  await getDoctorRounds(
    admission?.id
  );

setLatestDoctorRound(
  rounds.length > 0
    ? rounds[0]
    : null
);
const notes =
  await getNursingNotes(
    admission?.id
  );

setLatestNursingNote(
  notes.length > 0
    ? notes[0]
    : null
);
const vitals =
  await getVitalsHistory(
    admission?.id
  );

setLatestVitals(
  vitals.length > 0
    ? vitals[0]
    : null
);
}
async function
handleCompleteDischarge() {

  if (!dischargeDiagnosis.trim()) {

    Alert.alert(
      'Validation',
      'Please enter the discharge diagnosis.'
    );

    return;
  }

  await saveDischargeSummary(
    admission.id,
    dischargeDiagnosis,
    hospitalCourse,
    dischargeMedications,
    dischargeInstructions,
    dischargeFollowUpDate
  );

  await dischargeAdmission(
    admission.id
  );

  Alert.alert(
    'Success',
    'Patient discharged successfully.',
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
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.topBar}>
        <Text
          style={styles.topBarTitle}
        >
          Patient Discharge
        </Text>
      </View>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 24,
  }}
>
<View style={styles.card}>
<Text
  style={styles.title}
>
  {admission?.patientName}
</Text>

<Text>
  Admission No:
  {' '}
  {admission?.admission_number}
</Text>

<Text
  style={{
    marginTop: 8,
  }}
>
  Ward:
  {' '}
  {admission?.wardName}
</Text>

<Text
  style={{
    marginTop: 8,
  }}
>
  Bed:
  {' '}
  {admission?.bedNumber}
</Text>
<View
  style={styles.card}
>
  <Text
    style={styles.title}
  >
    Clinical Snapshot
  </Text>

  <Text>
    Chief Complaint:
    {' '}
    {consultation?.chief_complaint || '-'}
  </Text>

  <Text
    style={{
      marginTop: 8,
    }}
  >
    Diagnosis:
    {' '}
    {consultation?.diagnosis || '-'}
  </Text>

  <Text
    style={{
      marginTop: 8,
    }}
  >
    Prescription:
    {' '}
    {consultation?.prescription || '-'}
  </Text>
{latestDoctorRound ? (
  <>
    <Text
      style={{
        marginTop: 16,
        fontWeight: '700',
        color: COLORS.primary,
      }}
    >
      Latest Doctor Round
    </Text>

    <Text
      style={{
        marginTop: 8,
      }}
    >
      Doctor:
      {' '}
      {latestDoctorRound.doctor_name}
    </Text>

    <Text
      style={{
        marginTop: 8,
      }}
    >
      Progress:
      {' '}
      {latestDoctorRound.progress_note}
    </Text>

    <Text
      style={{
        marginTop: 8,
      }}
    >
      Treatment:
      {' '}
      {latestDoctorRound.treatment_plan}
    </Text>
  </>
) : null}
{latestNursingNote ? (
  <>
    <Text
      style={{
        marginTop: 16,
        fontWeight: '700',
        color: COLORS.primary,
      }}
    >
      Latest Nursing Note
    </Text>

    <Text
      style={{
        marginTop: 8,
      }}
    >
      {latestNursingNote.note_text}
    </Text>

    <Text
      style={{
        marginTop: 4,
        color: '#64748B',
        fontSize: 12,
      }}
    >
      {latestNursingNote.created_by}
    </Text>
  </>
) : null}
{latestVitals ? (
  <>
    <Text
      style={{
        marginTop: 16,
        fontWeight: '700',
        color: COLORS.primary,
      }}
    >
      Latest Vitals
    </Text>

    <Text
      style={{
        marginTop: 8,
      }}
    >
      BP: {latestVitals.bp}
    </Text>

    <Text>
      Pulse: {latestVitals.pulse}
    </Text>

    <Text>
      Temperature: {latestVitals.temperature}
    </Text>

    <Text>
      SpO₂: {latestVitals.spo2}
    </Text>

    <Text>
      Respiratory Rate:{' '}
      {latestVitals.respiratory_rate}
    </Text>
  </>
) : null}
</View>

<View
  style={styles.card}
>
  <Text
    style={styles.title}
  >
    Discharge Summary
  </Text>

  <TextInput
    placeholder="Discharge Diagnosis"
    value={dischargeDiagnosis}
    onChangeText={
      setDischargeDiagnosis
    }
    style={styles.input}
  />

  <TextInput
    placeholder="Hospital Course"
    value={hospitalCourse}
    onChangeText={
      setHospitalCourse
    }
    multiline
    style={styles.textArea}
  />

  <TextInput
    placeholder="Discharge Medications"
    value={dischargeMedications}
    onChangeText={
      setDischargeMedications
    }
    multiline
    style={styles.textArea}
  />

  <TextInput
    placeholder="Discharge Instructions"
    value={dischargeInstructions}
    onChangeText={
      setDischargeInstructions
    }
    multiline
    style={styles.textArea}
  />

  <TextInput
    placeholder="Follow-up Date (YYYY-MM-DD)"
    value={dischargeFollowUpDate}
    onChangeText={
      setDischargeFollowUpDate
    }
    style={styles.input}
  />
<TouchableOpacity
  onPress={
    handleCompleteDischarge
  }
  style={{
    marginTop: 20,
    backgroundColor: '#16A34A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16,
    }}
  >
    Complete Discharge
  </Text>
</TouchableOpacity>
</View>

</View>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },

    topBar: {
      height: 90,
      paddingTop: 20,
      backgroundColor:
        COLORS.primary,
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
      padding: 16,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
    },

title: {
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 12,
},

input: {
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 12,
  padding: 12,
  marginTop: 12,
  backgroundColor: '#FFFFFF',
},

textArea: {
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 12,
  padding: 12,
  marginTop: 12,
  minHeight: 90,
  textAlignVertical: 'top',
  backgroundColor: '#FFFFFF',
},
  });
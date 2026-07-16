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
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import PatientModuleHeader
  from '../components/patient/PatientModuleHeader';
import {
  getLatestConsultation,
} from '../services/consultationQueryService';
import {
  getPatientTasks,
} from '../services/patientTaskQueryService';
import {
  saveNursingNote,
  getNursingNotes,
} from '../services/nursingNoteService';
import {
  TextInput,
  Alert,
} from 'react-native';
import {
  getVitalsHistory,
} from '../services/vitalsQueryService';
import {
  saveDoctorRound,
  getDoctorRounds,
} from '../services/doctorRoundService';
import {
  saveMedicationOrder,
  getMedicationOrders,
} from '../services/medicationOrderService';
import {
  dischargeAdmission,
  saveDischargeSummary,
  getDischargeSummary,
} from '../services/dischargeService';

export default function
DoctorRoundsScreen() {
  const route = useRoute<any>();

  const admission =
    route.params?.admission;
const navigation =
  useNavigation<any>();
const [
  consultation,
  setConsultation,
] = useState<any>(null);
const [
  tasks,
  setTasks,
] = useState<any[]>([]);
const [
  nursingNote,
  setNursingNote,
] = useState('');

const [
  nursingNotes,
  setNursingNotes,
] = useState<any[]>([]);
const [
  doctorName,
  setDoctorName,
] = useState('');

const [
  progressNote,
  setProgressNote,
] = useState('');

const [
  treatmentPlan,
  setTreatmentPlan,
] = useState('');

const [
  followUpDate,
  setFollowUpDate,
] = useState('');

const [
  doctorRounds,
  setDoctorRounds,
] = useState<any[]>([]);
const [
  medicationName,
  setMedicationName,
] = useState('');

const [
  medicationDose,
  setMedicationDose,
] = useState('');

const [
  medicationRoute,
  setMedicationRoute,
] = useState('');

const [
  medicationFrequency,
  setMedicationFrequency,
] = useState('');

const [
  medicationDuration,
  setMedicationDuration,
] = useState('');

const [
  medicationInstructions,
  setMedicationInstructions,
] = useState('');

const [
  medicationOrders,
  setMedicationOrders,
] = useState<any[]>([]);
const [
  vitalsHistory,
  setVitalsHistory,
] = useState<any[]>([]);
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

const [
  dischargeSummary,
  setDischargeSummary,
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

  const patientTasks =
    await getPatientTasks(
      admission?.patient_id
    );

  setTasks(patientTasks);

  const notes =
    await getNursingNotes(
      admission?.id
    );

  setNursingNotes(notes);

  const vitals =
    await getVitalsHistory(
      admission?.id
    );
const rounds =
  await getDoctorRounds(
    admission?.id
  );

setDoctorRounds(rounds);

const medications =
  await getMedicationOrders(
    admission?.id
  );

setMedicationOrders(
  medications
);

setVitalsHistory(vitals);

const summary =
  await getDischargeSummary(
    admission?.id
  );

setDischargeSummary(summary);
}

async function
handleSaveNote() {

  if (!nursingNote.trim()) {
    return;
  }

  await saveNursingNote(
    admission.id,
    nursingNote
  );

  setNursingNote('');

  const notes =
    await getNursingNotes(
      admission.id
    );

  setNursingNotes(notes);
}
async function
handleSaveDoctorRound() {

  if (
    !doctorName ||
    !progressNote
  ) {
    return;
  }

  await saveDoctorRound(
    admission.id,
    doctorName,
    progressNote,
    treatmentPlan,
    followUpDate
  );

  setDoctorName('');
  setProgressNote('');
  setTreatmentPlan('');
  setFollowUpDate('');

  const rounds =
    await getDoctorRounds(
      admission.id
    );

  setDoctorRounds(rounds);
}
async function
handleSaveMedicationOrder() {

  if (
    !medicationName.trim() ||
    !medicationDose.trim()
  ) {

    Alert.alert(
      'Validation',
      'Medication name and dose are required.'
    );

    return;
  }

  await saveMedicationOrder(
    admission.id,
    medicationName,
    medicationDose,
    medicationRoute,
    medicationFrequency,
    Number(
      medicationDuration || 0
    ),
    medicationInstructions
  );

  setMedicationName('');
  setMedicationDose('');
  setMedicationRoute('');
  setMedicationFrequency('');
  setMedicationDuration('');
  setMedicationInstructions('');

  const medications =
    await getMedicationOrders(
      admission.id
    );

  setMedicationOrders(
    medications
  );
}
return (
<SafeAreaView
  style={styles.container}
>
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={
    Platform.OS === 'ios'
      ? 'padding'
      : 'height'
  }
>
<TouchableWithoutFeedback
  onPress={Keyboard.dismiss}
>
  <View style={{ flex: 1 }}>
  <View style={styles.topBar}>
        <Text
          style={styles.topBarTitle}
        >
          Doctor Rounds
        </Text>
      </View>
<ScrollView
keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 24,
  }}
>
<PatientModuleHeader
  admission={admission}
/>
<View style={styles.card}>

<Text style={styles.sectionTitle}>
Today's Clinical Summary
</Text>

<Text style={styles.detailText}>
Diagnosis:{' '}
{consultation?.diagnosis || '-'}
</Text>

<Text style={styles.detailText}>
Prescription:{' '}
{consultation?.prescription || '-'}
</Text>

<Text style={styles.detailText}>
Latest Vitals:{' '}
{vitalsHistory.length} recorded
</Text>

<Text style={styles.detailText}>
Pending Tasks:{' '}
{tasks.length}
</Text>

</View>
<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Doctor Rounds
  </Text>

  <TextInput
    placeholder="Doctor Name"
    value={doctorName}
    onChangeText={
      setDoctorName
    }
    style={{
      borderWidth: 1,
      borderColor: '#CBD5E1',
      borderRadius: 12,
      padding: 12,
      marginTop: 12,
    }}
  />

  <TextInput
    placeholder="Progress Note"
    value={progressNote}
    onChangeText={
      setProgressNote
    }
    multiline
    style={{
      borderWidth: 1,
      borderColor: '#CBD5E1',
      borderRadius: 12,
      padding: 12,
      minHeight: 80,
      marginTop: 12,
    }}
  />

  <TextInput
    placeholder="Treatment Plan"
    value={treatmentPlan}
    onChangeText={
      setTreatmentPlan
    }
    multiline
    style={{
      borderWidth: 1,
      borderColor: '#CBD5E1',
      borderRadius: 12,
      padding: 12,
      minHeight: 80,
      marginTop: 12,
    }}
  />

  <TextInput
    placeholder="Follow Up Date (YYYY-MM-DD)"
    value={followUpDate}
    onChangeText={
      setFollowUpDate
    }
    style={{
      borderWidth: 1,
      borderColor: '#CBD5E1',
      borderRadius: 12,
      padding: 12,
      marginTop: 12,
    }}
  />

  <TouchableOpacity
    onPress={
      handleSaveDoctorRound
    }
    style={{
      marginTop: 12,
      backgroundColor:
        COLORS.primary,
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        color: '#FFFFFF',
        fontWeight: '700',
      }}
    >
      Save Round
    </Text>
  </TouchableOpacity>

  {doctorRounds.map(
    (round: any) => (
      <View
        key={round.id}
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor:
            '#E2E8F0',
        }}
      >
        <Text
          style={{
            fontWeight: '700',
          }}
        >
          {round.doctor_name}
        </Text>

        <Text>
          {round.progress_note}
        </Text>

<Text>
  {round.treatment_plan}
</Text>

{round.follow_up_date ? (
  <Text
    style={{
      marginTop: 4,
      color: '#64748B',
      fontSize: 12,
    }}
  >
    Follow Up:
    {' '}
    {round.follow_up_date}
  </Text>
) : null}
      </View>
    )
  )}
</View>
</ScrollView>
</View>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
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
  marginHorizontal: 16,
  marginTop: 8,
  marginBottom: 8,
  backgroundColor: '#FFFFFF',
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
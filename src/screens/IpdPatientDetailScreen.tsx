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
} from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';

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
import { TextInput }
  from 'react-native';
import {
  getVitalsHistory,
} from '../services/vitalsQueryService';
import {
  saveDoctorRound,
  getDoctorRounds,
} from '../services/doctorRoundService';
export default function
IpdPatientDetailScreen() {
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
  vitalsHistory,
  setVitalsHistory,
] = useState<any[]>([]);

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
  setVitalsHistory(vitals);
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
<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 24,
  }}
>
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
    Today's Care Tasks
  </Text>

  {tasks
    .slice(0, 6)
    .map((task) => (
<TouchableOpacity
  key={task.id}
  style={{
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor:
      '#E2E8F0',
  }}
  onPress={() =>
    navigation.navigate(
      'TaskDetail',
      { task }
    )
  }
>
        <Text
          style={{
            fontWeight: '600',
          }}
        >
          {task.title}
        </Text>

        <Text
          style={{
            color:
              task.status ===
              'COMPLETED'
                ? '#16A34A'
                : '#D97706',
            marginTop: 4,
          }}
        >
          {task.status}
        </Text>
      </TouchableOpacity>
    ))}
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

<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Vitals History
  </Text>

  {vitalsHistory.length === 0 ? (
    <Text
      style={{
        marginTop: 12,
        color: '#64748B',
      }}
    >
      No vitals recorded.
    </Text>
  ) : (
    vitalsHistory.map(
      (vital) => (
        <View
          key={vital.id}
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor:
              '#E2E8F0',
          }}
        >
          <Text>
            BP: {vital.bp}
          </Text>

          <Text>
            Pulse: {vital.pulse}
          </Text>

          <Text>
            SpO2: {vital.spo2}
          </Text>

          <Text>
            Temp: {vital.temperature}
          </Text>

          <Text>
            RR:
            {' '}
            {vital.respiratory_rate}
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: '#64748B',
              fontSize: 12,
            }}
          >
            {vital.recorded_by}
          </Text>
        </View>
      )
    )
  )}
</View>

<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Nursing Notes
  </Text>

  <TextInput
    value={nursingNote}
    onChangeText={
      setNursingNote
    }
    placeholder="Enter nursing note"
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

  <TouchableOpacity
    onPress={
      handleSaveNote
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
      Save Note
    </Text>
  </TouchableOpacity>

  {nursingNotes.map(
    (note) => (
      <View
        key={note.id}
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor:
            '#E2E8F0',
        }}
      >
        <Text>
          {note.note_text}
        </Text>

        <Text
          style={{
            marginTop: 4,
            color: '#64748B',
            fontSize: 12,
          }}
        >
          {note.created_by}
        </Text>
      </View>
    )
  )}
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
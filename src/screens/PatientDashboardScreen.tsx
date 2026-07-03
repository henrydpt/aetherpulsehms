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
  TextInput,
  Alert,
}
  from 'react-native';
import {
  getVitalsHistory,
} from '../services/vitalsQueryService';

import {
  dischargeAdmission,
  saveDischargeSummary,
  getDischargeSummary,
} from '../services/dischargeService';
export default function
PatientDashboardScreen() {
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

  const vitals =
    await getVitalsHistory(
      admission?.id
    );

setVitalsHistory(vitals);

const summary =
  await getDischargeSummary(
    admission?.id
  );

setDischargeSummary(summary);
}

  return (
<SafeAreaView
  style={styles.container}
>
  <View style={styles.topBar}>
        <Text
          style={styles.topBarTitle}
        >
          Patient Dashboard
        </Text>
      </View>
<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 100,
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
<View
  style={{
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: -8,
  }}
>
  <Text
    style={{
      color: COLORS.primary,
      fontWeight: '700',
      fontSize: 18,
    }}
  >
    Clinical Modules
  </Text>
</View>
<View style={styles.card}>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        'DoctorRounds',
        {
          admission,
        }
      )
    }
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View>
      <Text
        style={styles.sectionTitle}
      >
        🩺 Doctor Rounds
      </Text>

      <Text
        style={styles.detailText}
      >
        Record and review physician rounds
      </Text>
    </View>

    <Text
      style={{
        fontSize: 26,
        color: COLORS.primary,
        fontWeight: '700',
      }}
    >
      ›
    </Text>
  </TouchableOpacity>
</View>
<View style={styles.card}>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        'MedicationOrders',
        {
          admission,
        }
      )
    }
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View>
      <Text
        style={styles.sectionTitle}
      >
        💊 Medication Orders
      </Text>

      <Text
        style={styles.detailText}
      >
        Prescribe and review medications
      </Text>
    </View>

    <Text
      style={{
        fontSize: 26,
        color: COLORS.primary,
        fontWeight: '700',
      }}
    >
      ›
    </Text>
  </TouchableOpacity>
</View>
<View style={styles.card}>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        'NursingNotes',
        {
          admission,
        }
      )
    }
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View>
      <Text
        style={styles.sectionTitle}
      >
        📝 Nursing Notes
      </Text>

      <Text
        style={styles.detailText}
      >
        Record and review nursing notes
      </Text>
    </View>

    <Text
      style={{
        fontSize: 26,
        color: COLORS.primary,
        fontWeight: '700',
      }}
    >
      ›
    </Text>
  </TouchableOpacity>
</View>
<TouchableOpacity
  onPress={() =>
    navigation.navigate(
      'Discharge',
      {
        admission,
      }
    )
  }
  style={{
    margin: 16,
    backgroundColor:
      '#DC2626',
    padding: 16,
    borderRadius: 12,
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
    Begin Discharge
  </Text>
</TouchableOpacity>

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
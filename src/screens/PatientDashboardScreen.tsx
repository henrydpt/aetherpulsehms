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
      route.params?.admission?.id
    );

setVitalsHistory(vitals);

const summary =
  await getDischargeSummary(
    route.params?.admission?.id
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
    {route.params?.admission?.patient_id}
  </Text>
  <Text style={styles.detailText}>
  Admission No: {admission?.admission_number}
</Text>

<Text style={styles.detailText}>
  Ward: {admission?.wardName}
</Text>

<Text style={styles.detailText}>
  Bed: {admission?.bedNumber}
</Text>

<Text style={styles.detailText}>
  Status: {admission?.status}
</Text>
</View>

<View style={styles.card}>
  <Text
    style={styles.sectionTitle}
  >
    Latest Consultation
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
</View>
<View style={styles.card}>

  <Text style={styles.sectionTitle}>
    Today's Clinical Tasks
  </Text>

  <Text
    style={{
      marginTop: 12,
      color: '#64748B',
    }}
  >
    Daily care activities for this patient.
  </Text>

</View>
<View
  style={{
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: -8,
  }}
>
<Text
  style={{
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  }}
>
  Clinical Workspaces
</Text>
</View>
<View style={styles.card}>

<TouchableOpacity
  onPress={() =>
    navigation.navigate(
      'Clinical Care',
      {
        admission,
      }
    )
  }
>

<View>

<Text style={styles.sectionTitle}>
🩺 Clinical Care
</Text>

<Text style={styles.detailText}>
Doctor Rounds, Nursing, Medication
</Text>

</View>

<Text style={styles.arrow}>›</Text>

</TouchableOpacity>

</View>
<View style={styles.card}>

<TouchableOpacity
  onPress={() =>
    navigation.navigate(
      'Diagnostics',
      {
        admission,
      }
    )
  }
>

<View>

<Text style={styles.sectionTitle}>
🔬 Diagnostics
</Text>

<Text style={styles.detailText}>
Laboratory and Radiology
</Text>

</View>

<Text style={styles.arrow}>›</Text>

</TouchableOpacity>

</View>
<View style={styles.card}>

<TouchableOpacity
  onPress={() =>
    navigation.navigate(
      'Patient Journey',
      {
        admission,
      }
    )
  }
>

<View>

<Text style={styles.sectionTitle}>
🧭 Patient Journey
</Text>

<Text style={styles.detailText}>
Timeline and discharge
</Text>

</View>

<Text style={styles.arrow}>›</Text>

</TouchableOpacity>

</View>
<View style={styles.card}>

<TouchableOpacity
  onPress={() =>
    navigation.navigate(
      'Financial Workspace',
      {
        admission,
      }
    )
  }
>

<View>

<Text style={styles.sectionTitle}>
💰 Financial
</Text>

<Text style={styles.detailText}>
Billing and Payments
</Text>

</View>

<Text style={styles.arrow}>›</Text>

</TouchableOpacity>

</View>
<View style={styles.card}>

<TouchableOpacity>

<View>

<Text style={styles.sectionTitle}>
🏥 Administration
</Text>

<Text style={styles.detailText}>
Bed, Doctor and Care Team
</Text>

</View>

<Text style={styles.arrow}>›</Text>

</TouchableOpacity>

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
  marginHorizontal: 16,
  marginTop: 10,
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
arrow: {
  fontSize: 26,
  color: COLORS.primary,
  fontWeight: '700',
},
  });
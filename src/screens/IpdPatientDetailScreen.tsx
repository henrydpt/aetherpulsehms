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
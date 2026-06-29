import React from 'react';
import { supabase } from '../lib/supabase';
import { createOpEncounter }
  from '../services/opdService';

import { getActiveOpEncounter }
  from '../services/opEncounterQueryService';
import {
  getActiveAdmission,
} from '../services/admissionLookupService';
import {
  dischargeAdmission,
} from '../services/dischargeService';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { usePatientStore } from '../store/patientStore';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { useTaskStore } from '../store/taskStore';
import { COLORS } from '../theme/colors';
export default function PatientDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const patientId =
  route.params?.patient?.id;

const patients = usePatientStore(
  (state) => state.patients
);

const patient = patients.find(
  (p) => p.id === patientId
);

  const dischargePatient =
  usePatientStore(
    (state) => state.dischargePatient
  );
  const loadPatients =
  usePatientStore(
    (state) => state.loadPatients
  );
  const tasks = useTaskStore(
  (state) => state.tasks
);
const vitalsTasks = tasks.filter(
  (task) =>
    task.patientId === patient?.id
);

const vitalsHistory =
  vitalsTasks
    .filter(
      (task) =>
        task.type === 'VITALS' &&
        task.status === 'COMPLETED' &&
        task.vitals
    )
    .sort(
      (a, b) =>
        new Date(
          b.completedAt || 0
        ).getTime() -
        new Date(
          a.completedAt || 0
        ).getTime()
    );
return (
  <SafeAreaView style={styles.container}>
    <StatusBar
      backgroundColor={COLORS.primary}
      barStyle="light-content"
    />
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <View style={{ width: 24 }} />

          <Text style={styles.topBarTitle}>
            Patient Details
          </Text>

          <View style={{ width: 20 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.name}>
            {patient?.name}
          </Text>

          <Text style={styles.info}>
            Age: {patient?.age}
          </Text>

          <Text style={styles.info}>
            Gender: {patient?.gender}
          </Text>

          <Text style={styles.info}>
            {patient?.ward}
          </Text>

          <Text style={styles.info}>
            {patient?.diagnosis}
          </Text>
<Text style={styles.info}>
  Mobile: {patient?.mobile || '-'}
</Text>

<Text style={styles.info}>
  Doctor: {patient?.doctorAssigned || '-'}
</Text>

<Text style={styles.info}>
  Billing Type: {patient?.billingType || '-'}
</Text>

<Text style={styles.info}>
  Billing Remarks: {patient?.billingRemarks || '-'}
</Text>
<View
  style={{
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  }}
>
  <Text
    style={{
      fontSize: 16,
      fontWeight: '700',
      color: '#234A7A',
      marginBottom: 10,
    }}
  >
    Case Sheet Summary
  </Text>
<Text
  style={{
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
  }}
>
  Last Updated:{' '}
  {patient?.caseSheetUpdatedAt || '-'}
</Text>
<Text
  style={{
    fontWeight: '600',
    marginTop: 8,
    color: '#64748B',
  }}
>
  Chief Complaint
</Text>

<Text style={styles.info}>
  {patient?.chiefComplaint || '-'}
</Text>

<Text
  style={{
    fontWeight: '600',
    marginTop: 12,
    color: '#64748B',
  }}
>
  Treatment Plan
</Text>

<Text style={styles.info}>
  {patient?.treatmentPlan || '-'}
</Text>
</View>

<View
  style={{
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  }}
>
  <Text
    style={{
      fontSize: 16,
      fontWeight: '700',
      color: '#234A7A',
      marginBottom: 10,
    }}
  >
    Vitals History
  </Text>

  {vitalsHistory.length === 0 ? (
    <Text style={styles.info}>
      No vitals recorded yet.
    </Text>
  ) : (
    vitalsHistory
      .slice(0, 5)
      .map((task, index) => (
        <View
          key={index}
          style={{
            marginBottom: 12,
            padding: 12,
            backgroundColor: '#F8FAFC',
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              color: '#234A7A',
            }}
          >
            {new Date(
              task.completedAt
            ).toLocaleString()}
          </Text>

          <Text style={styles.info}>
            BP: {task.vitals.bpSystolic}/
            {task.vitals.bpDiastolic}
          </Text>

          <Text style={styles.info}>
            Pulse: {task.vitals.pulse}
          </Text>

          <Text style={styles.info}>
            SpO₂: {task.vitals.spo2}
          </Text>

          <Text style={styles.info}>
            Temp: {task.vitals.temperature}
          </Text>

          <Text style={styles.info}>
            RR: {task.vitals.respiratoryRate}
          </Text>
        </View>
      ))
  )}
</View>
<View
  style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    gap: 10,
  }}
>

<TouchableOpacity
  style={styles.actionButton}
  onPress={() =>
    navigation.navigate(
      'AddPatient',
      {
        mode: 'EDIT',
        patient,
      }
    )
  }
>
  
    <Text style={styles.actionButtonText}>
      Edit Patient
    </Text>
  </TouchableOpacity>
<TouchableOpacity
  style={[
    styles.actionButton,
    {
      marginLeft: 10,
      backgroundColor: '#0F766E',
    },
  ]}
  onPress={() =>
    navigation.navigate(
      'Admissions',
      {
        patient,
      }
    )
  }
>
  <Text style={styles.actionButtonText}>
    Admit Patient
  </Text>

</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.actionButton,
    {
      backgroundColor: '#166534',
    },
  ]}
  onPress={async () => {

    if (!patient) return;

    const existing =
      await getActiveOpEncounter(
        patient.id
      );

    if (existing) {
      alert(
        'Patient already in OP queue'
      );
      return;
    }

    const encounter =
      await createOpEncounter(
        patient.id
      );

    alert(
      `Token: ${encounter.token_number}`
    );
  }}
>
  <Text
    style={styles.actionButtonText}
  >
    OP Registration
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.actionButton,
    {
      marginLeft: 10,
      backgroundColor: '#475569'
    },
  ]}
  onPress={() =>
    navigation.navigate(
      'PatientCaseSheet',
      {
        patient,
      }
    )
  }
>
  <Text style={styles.actionButtonText}>
    Case Sheet
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.actionButton,
    {
      marginLeft: 10,
      backgroundColor: '#7F1D1D'
    },
  ]}
  onPress={() =>
    Alert.alert(
      'Discharge Patient',
      `Discharge ${patient?.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discharge',
onPress: async () => {
if (!patient) return;

const admission =
  await getActiveAdmission(
    patient.id
  );

if (admission) {
  await dischargeAdmission(
    admission.id
  );
}

console.log(
  'Patient discharged'
);

loadPatients();

navigation.goBack();
},
        },
      ]
    )
  }
>
    <Text style={styles.actionButtonText}>
      Discharge
    </Text>
  </TouchableOpacity>
</View>
        </View>
        <View style={styles.card}>
<Text style={styles.sectionHeading}>
  Today's Vitals Schedule
</Text>

{vitalsTasks.map((task, index) => (
  <TouchableOpacity
    key={`${task.due}-${index}`}
    style={styles.vitalsTask}
onPress={() =>
  navigation.navigate('TaskDetail', {
    task,
  })
}
  >
    <Text style={styles.vitalsTitle}>
  {task.title}
</Text>

    <Text style={styles.vitalsStatus}>
      {task.status}
    </Text>
  </TouchableOpacity>
))}
</View>
      </ScrollView>
    </SafeAreaView>
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

  icon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

 topBarTitle: {
  color: COLORS.card,
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
    margin: 14,
    borderRadius: 16,
    padding: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },

  info: {
    marginTop: 10,
    fontSize: 16,
    color: '#475569',
  },
  vitalsTask: {
  marginTop: 12,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  padding: 14,
  backgroundColor: '#FAFAFA',
},

vitalsTitle: {
  fontSize: 15,
  fontWeight: '600',
  color: '#1E293B',
},

vitalsStatus: {
  marginTop: 6,
  color: '#64748B',
},
sectionHeading: {
  fontSize: 16,
  fontWeight: '700',
  color: '#234A7A',
  marginBottom: 12,
},
actionButton: {
  backgroundColor: '#234A7A',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 10,
},

actionButtonText: {
  color: '#FFFFFF',
  fontWeight: '600',
},
});
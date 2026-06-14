import React from 'react';
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
import { generateVitalsTasks } from '../services/taskGenerator';

export default function PatientDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const patient = route.params?.patient;
  const vitalsTasks = generateVitalsTasks(patient);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.icon}>‹</Text>

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
        task: {
  status: task.status.toUpperCase(),
  title: task.title,
  location: patient?.ward,
  due: task.due,
  assigned: 'Nursing Staff',
  type: 'VITALS',
  patientId: patient?.id,
  patientName: patient?.name,
},
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
  paddingTop: 35,
  paddingBottom: 120,
},

  topBar: {
    height: 64,
    backgroundColor: '#234A7A',
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
    color: '#FFFFFF',
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
});
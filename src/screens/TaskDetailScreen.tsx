import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function TaskDetailScreen() {
      const route = useRoute<any>();

const task =
  route.params?.task || {
    status: 'OVERDUE',
    title: 'Vital Signs Monitoring',
    location: 'General Ward - 2',
    due: '02:00 PM',
    assigned: 'Nurse Lakshmi',
    type: 'VITALS',
  };
    const [photoAttached, setPhotoAttached] = useState(false);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [bpSystolic, setBpSystolic] = useState('');
    const [bpDiastolic, setBpDiastolic] = useState('');
    const [pulse, setPulse] = useState('');
    const [spo2, setSpo2] = useState('');
    const [temperature, setTemperature] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const pickEvidence = async () => {
  const result =
    await ImagePicker.launchCameraAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

  if (!result.canceled) {
    setPhotoUri(
      result.assets[0].uri
    );

    setPhotoAttached(true);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.icon}>‹</Text>

          <Text style={styles.topBarTitle}>
            Task Details
          </Text>

          <View style={{ width: 20 }} />
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusText}>
            {task.status}
          </Text>

          <Text style={styles.taskTitle}>
            {task.title}
          </Text>
        </View>

        <View style={styles.card}>
          <LabelValue
            label="Assigned To"
            value={task.assigned}
          />

          <LabelValue
            label="Location"
            value={task.location}
          />

          <LabelValue
            label="Due Time"
            value={task.due}
          />
        </View>

        <View style={styles.card}>
  <Text style={styles.sectionTitle}>
    Task Instructions
  </Text>

  <Text style={styles.bodyText}>
    {task.type === 'VITALS'
      ? 'Record blood pressure, pulse, temperature and respiratory rate for the patient.'
      : 'Capture evidence photo and record remarks before completing this checklist item.'}
  </Text>
</View>

        <View style={styles.card}>
  <Text style={styles.sectionTitle}>
    NABH Reference
  </Text>

  <Text style={styles.bodyText}>
    {task.type === 'VITALS'
      ? 'COP.2 – Patient Assessment'
      : 'FMS / Operations Checklist'}
  </Text>
</View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Evidence Status
          </Text>

         <Text style={styles.pendingText}>
  {photoAttached
    ? '✓ Evidence Attached'
    : 'Not Submitted'}
</Text>

<TouchableOpacity
  onPress={pickEvidence}
>
  <Text
    style={{
      color: '#234A7A',
      marginTop: 12,
      fontWeight: '700',
    }}
  >
    Attach Evidence
  </Text>
</TouchableOpacity>
{photoUri && (
  <Image
    source={{ uri: photoUri }}
    style={{
      width: '100%',
      height: 180,
      borderRadius: 12,
      marginTop: 12,
    }}
  />
)}
        </View>
{task.type === 'VITALS' && (
<View style={styles.card}>
  <Text style={styles.sectionTitle}>
    Vital Signs
  </Text>

<TextInput
  placeholder="BP Systolic"
  value={bpSystolic}
  onChangeText={setBpSystolic}
  style={styles.input}
/>

<TextInput
  placeholder="BP Diastolic"
  value={bpDiastolic}
  onChangeText={setBpDiastolic}
  style={styles.input}
/>

<TextInput
  placeholder="Pulse Rate"
  value={pulse}
  onChangeText={setPulse}
  style={styles.input}
/>

<TextInput
  placeholder="SpO₂"
  value={spo2}
  onChangeText={setSpo2}
  style={styles.input}
/>

<TextInput
  placeholder="Temperature"
  value={temperature}
  onChangeText={setTemperature}
  style={styles.input}
/>

<TextInput
  placeholder="Respiratory Rate"
  value={respiratoryRate}
  onChangeText={setRespiratoryRate}
  style={styles.input}
/>
</View>
)}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Remarks
          </Text>

          <TextInput
            multiline
            placeholder="Add remarks..."
            style={styles.textArea}
          />
        </View>

        <TouchableOpacity
  style={[
    styles.button,
    !photoAttached && {
      opacity: 0.5,
    },
  ]}
  disabled={!photoAttached}
>
          <Text style={styles.buttonText}>
            Mark Complete
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LabelValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
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

  statusCard: {
    backgroundColor: '#FFFFFF',
    margin: 14,
    padding: 18,
    borderRadius: 18,
  },

  statusText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 12,
  },

  taskTitle: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginBottom: 14,
    padding: 18,
    borderRadius: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#234A7A',
    marginBottom: 12,
  },

  bodyText: {
    color: '#475569',
    lineHeight: 22,
  },

  label: {
    color: '#94A3B8',
    fontSize: 12,
  },

  value: {
    marginTop: 4,
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
  },

  pendingText: {
    color: '#D97706',
    fontWeight: '700',
  },
input: {
  height: 48,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  paddingHorizontal: 12,
  marginTop: 10,
  backgroundColor: '#FFFFFF',
},
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#234A7A',
    marginHorizontal: 14,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
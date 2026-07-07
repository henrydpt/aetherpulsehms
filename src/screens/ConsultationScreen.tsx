import React, {
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
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS }
  from '../theme/colors';

import {
  saveConsultation as
  saveConsultationRecord,
} from '../services/consultationSaveService';

export default function ConsultationScreen() {
  const route =
    useRoute<any>();

  const patient =
    route.params?.patient;
console.log(patient);
  const queueId =
    route.params?.queueId;
const navigation =
  useNavigation<any>();
    const [
  chiefComplaint,
  setChiefComplaint,
] = useState('');

const [
  diagnosis,
  setDiagnosis,
] = useState('');
const [bp, setBp] =
  useState('');

const [pulse, setPulse] =
  useState('');

const [
  temperature,
  setTemperature,
] = useState('');

const [spo2, setSpo2] =
  useState('');
  const [
  prescription,
  setPrescription,
] = useState('');

const [notes, setNotes] =
  useState('');
async function saveConsultation() {
  try {
    await saveConsultationRecord({
      op_queue_id: queueId,
      patient_id:
        patient?.patient_id,

      chief_complaint:
        chiefComplaint,

      diagnosis,

      bp,
      pulse,
      temperature,
      spo2,

      prescription,
      notes,
    });

    Alert.alert(
      'Success',
      'Consultation saved'
    );
  } catch (error: any) {
    Alert.alert(
      'Error',
      error.message
    );
  }
}

async function admitToIpd() {
navigation.navigate(
  'Admissions',
  {
    patient: {
      id:
        patient?.patient_id,
      name:
        patient?.patientName,
    },

    encounterId:
      queueId,
  }
);
}

async function completeVisit() {
Alert.alert(
  'Coming Soon',
  'Complete Consultation workflow is under development.'
);
}
return (
  <SafeAreaView style={styles.container}>

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Consultation
          </Text>
        </View>
<View style={styles.card}>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 18,
        marginRight: 8,
      }}
    >
      👤
    </Text>

    <Text
      style={{
        fontSize: 18,
        fontWeight: '700',
      }}
    >
      Patient Information
    </Text>
  </View>

  <Text
    style={{
      marginTop: 12,
      color: '#64748B',
    }}
  >
    Name:
{' '}
{patient?.patientName ||
  '-'}
  </Text>

  <Text
    style={{
      marginTop: 4,
      color: '#64748B',
    }}
  >
    Age/Gender:
{' '}
{patient?.age || '-'}
{' / '}
{patient?.gender || '-'}
  </Text>

  <Text
    style={{
      marginTop: 4,
      color: '#64748B',
    }}
  >
    Token:
{' '}
{patient?.token_number ||
  '-'}
  </Text>
</View>
        <View style={styles.card}>
          <Text style={styles.label}>
            Chief Complaint
          </Text>

<TextInput
  style={styles.input}
  placeholder="Enter complaint"
  value={chiefComplaint}
  onChangeText={
    setChiefComplaint
  }
/>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Diagnosis
          </Text>

<TextInput
  style={styles.input}
  placeholder="Enter diagnosis"
  value={diagnosis}
  onChangeText={
    setDiagnosis
  }
/>
</View>
<View style={styles.card}>
  <Text style={styles.label}>
    Vitals
  </Text>

  <View
    style={{
      flexDirection: 'row',
      justifyContent:
        'space-between',
      marginTop: 12,
    }}
  >
    <TextInput
      style={styles.vitalInput}
      placeholder="BP"
      value={bp}
      onChangeText={setBp}
    />

    <TextInput
      style={styles.vitalInput}
      placeholder="Pulse"
      value={pulse}
      onChangeText={setPulse}
    />
  </View>

  <View
    style={{
      flexDirection: 'row',
      justifyContent:
        'space-between',
      marginTop: 12,
    }}
  >
    <TextInput
      style={styles.vitalInput}
      placeholder="Temp"
      value={temperature}
      onChangeText={
        setTemperature
      }
    />

    <TextInput
      style={styles.vitalInput}
      placeholder="SPO2"
      value={spo2}
      onChangeText={setSpo2}
    />
  </View>
</View>
<View style={styles.card}>
  <Text style={styles.label}>
    Prescription
  </Text>

  <TextInput
    style={styles.multiLineInput}
    placeholder="Enter prescription"
    multiline
    numberOfLines={4}
    value={prescription}
    onChangeText={
      setPrescription
    }
  />
</View>

<View style={styles.card}>
  <Text style={styles.label}>
    Doctor Notes
  </Text>

  <TextInput
    style={styles.multiLineInput}
    placeholder="Enter notes"
    multiline
    numberOfLines={4}
    value={notes}
    onChangeText={setNotes}
  />
</View>
<View style={styles.card}>
  <TouchableOpacity
    style={styles.primaryButton}
    onPress={saveConsultation}
  >
    <Text style={styles.buttonText}>
      Save Consultation
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.secondaryButton}
    onPress={admitToIpd}
  >
    <Text
      style={
        styles.secondaryButtonText
      }
    >
      Admit to IPD
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.successButton}
    onPress={completeVisit}
  >
    <Text style={styles.buttonText}>
      Complete Consultation
    </Text>
  </TouchableOpacity>
</View>

      </ScrollView>

    </KeyboardAvoidingView>

  </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F8F5EE',
    },

    content: {
      paddingBottom: 24,
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
      color: COLORS.card,
      fontSize: 18,
      fontWeight: '700',
    },

card: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  marginTop: 10,
  borderRadius: 16,
  padding: 16,
},

    label: {
      fontWeight: '600',
      marginBottom: 8,
    },

    input: {
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: 12,
      padding: 12,
    },
    vitalInput: {
  width: '48%',
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  padding: 12,
},
multiLineInput: {
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  padding: 12,
  minHeight: 100,
  textAlignVertical: 'top',
},
primaryButton: {
  backgroundColor:
    COLORS.primary,
  borderRadius: 12,
  padding: 14,
  alignItems: 'center',
},

successButton: {
  backgroundColor:
    '#16A34A',
  borderRadius: 12,
  padding: 14,
  alignItems: 'center',
  marginTop: 12,
},

secondaryButton: {
  borderWidth: 1,
  borderColor:
    COLORS.primary,
  borderRadius: 12,
  padding: 14,
  alignItems: 'center',
  marginTop: 12,
},

buttonText: {
  color: '#FFFFFF',
  fontWeight: '700',
},

secondaryButtonText: {
  color: COLORS.primary,
  fontWeight: '700',
},
  });
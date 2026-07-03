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
}
  from 'react-native';
import {
  getVitalsHistory,
} from '../services/vitalsQueryService';
import {
  saveDoctorRound,
  getDoctorRounds,
} from '../services/doctorRoundService';
import {
  saveMedicationAdministration,
  getMedicationAdministrations,
} from '../services/medicationAdministrationService';
import {
  getMedicationOrders,
} from '../services/medicationOrderService';
import {
  dischargeAdmission,
  saveDischargeSummary,
  getDischargeSummary,
} from '../services/dischargeService';

export default function MedicationAdministrationScreen() {
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
  administrationHistory,
  setAdministrationHistory,
] = useState<
  Record<string, any[]>
>({});
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
const history: Record<
  string,
  any[]
> = {};

for (const order of medications) {
  history[order.id] =
    await getMedicationAdministrations(
      order.id
    );
}

setAdministrationHistory(
  history
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

<View style={{ flex: 1 }}>
  <View style={styles.topBar}>
    <Text
      style={styles.topBarTitle}
    >
      Medication Administration
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
    Medication Administration
  </Text>

  <Text style={styles.detailText}>
    Select a medication and record its administration.
  </Text>
</View>

{medicationOrders.length === 0 ? (
  <View style={styles.card}>
    <Text style={styles.detailText}>
      No medication orders available.
    </Text>
  </View>
) : (
  medicationOrders.map((order: any) => (
    <View
      key={order.id}
      style={styles.card}
    >
      <Text style={styles.title}>
        {order.medication_name}
      </Text>

      <Text style={styles.detailText}>
        {order.dose} • {order.route}
      </Text>

      <Text style={styles.detailText}>
        {order.frequency} • {order.duration_days} Days
      </Text>

      {order.instructions ? (
        <Text style={styles.detailText}>
          {order.instructions}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#16A34A',
            padding: 12,
            borderRadius: 10,
            marginRight: 6,
            alignItems: 'center',
          }}
onPress={() =>
  navigation.navigate(
    'MedicationAdministrationRecord',
    {
      admission,
      medicationOrder: order,
    }
  )
}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
            }}
          >
            Administer
          </Text>
</TouchableOpacity>
      </View>

      {(administrationHistory[
        order.id
      ] || []).length > 0 && (
        <View
          style={{
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            Administration History
          </Text>

          {(administrationHistory[
            order.id
          ] || []).map(
            (item: any) => (
              <Text
                key={item.id}
                style={styles.detailText}
              >
                • {item.status} •{' '}
                {new Date(
                  item.administered_at
                ).toLocaleString()}
              </Text>
            )
          )}
        </View>
      )}
    </View>
  ))
)}
</ScrollView>
</View>
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
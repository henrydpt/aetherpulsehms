import React, {
  useEffect,
  useState,
} from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { loadBeds } from '../services/bedQueryService';
import {
  loadWardOptions,
} from '../services/wardQueryService';
import {
  getAdmissionsWithPatients
} from '../services/admissionListService';
import { testAdmission } from '../services/testAdmissionService';
import { allocateBed }
  from '../services/bedAllocationService';
import {
  admitEncounter,
} from '../services/opConsultationService';
  import { COLORS }
  from '../theme/colors';
  import {
  StatusBar,
  Platform,
} from 'react-native';
export default function AdmissionsScreen() {
  const route = useRoute<any>();
const patient =
  route.params?.patient;
const encounterId =
  route.params?.encounterId;
  const [
    admissions,
    setAdmissions,
  ] = useState<any[]>([]);

  useEffect(() => {
    loadAdmissions();
  }, []);
const [wards, setWards] =
  useState<any[]>([]);

const [selectedWard, setSelectedWard] =
  useState('');

const [doctor, setDoctor] =
  useState('');

const [diagnosis, setDiagnosis] =
  useState('');
const [beds, setBeds] =
  useState<any[]>([]);

const [selectedBed, setSelectedBed] =
  useState('');
async function handleCreateAdmission() {

  try {

    if (!selectedWard) {
      alert('Select Ward');
      return;
    }

    if (!selectedBed) {
      alert('Select Bed');
      return;
    }

    const admission =
      await testAdmission(
        patient.id
      );

await allocateBed(
  admission.id,
  selectedBed
);

if (encounterId) {
  await admitEncounter(
    encounterId
  );
}

    console.log(
      'CREATED',
      admission
    );

    loadAdmissions();

  } catch (error: any) {

    alert(
      error?.message ||
      'Admission failed'
    );

  }
}

async function loadAdmissions() {
const data =
  await getAdmissionsWithPatients();

  setAdmissions(data);

  const wardData =
    await loadWardOptions();

  setWards(wardData);
}

  return (
<SafeAreaView style={styles.container}>
  <StatusBar
    backgroundColor={COLORS.primary}
    barStyle="light-content"
  />

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.content}
  >
<View
style={styles.topBar}
>
  <View style={{ width: 24 }} />

  <Text style={styles.topBarTitle}>
    IPD Admissions
  </Text>

  <TouchableOpacity>
    <Text style={styles.icon}>＋</Text>
  </TouchableOpacity>
</View>

<View
  style={{
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      fontSize: 28,
      fontWeight: '700',
      color: COLORS.primary,
    }}
  >
    {admissions.length}
  </Text>

  <Text
    style={{
      color: '#64748B',
      marginTop: 4,
    }}
  >
    Active Admissions
  </Text>
</View>

{patient && (
  <>
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: COLORS.primary,
        }}
      >
        Patient Selected
      </Text>

      <Text
        style={{
          marginTop: 8,
          fontSize: 18,
          fontWeight: '700',
        }}
      >
        {patient.name}
      </Text>

      <Text
        style={{
          marginTop: 4,
          color: '#64748B',
        }}
      >
        {patient.id}
      </Text>
    </View>
<Text
  style={{
    marginTop: 16,
    fontWeight: '700',
  }}
>
  Ward
</Text>

{wards.map((ward) => (
  <TouchableOpacity
    key={ward.id}
    style={[
  styles.selectionCard,
  selectedWard === ward.id && {
    borderColor: '#1C146B',
    borderWidth: 2,
  },
]}
    onPress={async () => {
      setSelectedWard(ward.id);

      const bedData =
        await loadBeds(ward.id);

      setBeds(bedData);
    }}
  >
    <Text style={styles.selectionText}>
      {ward.name}
    </Text>
  </TouchableOpacity>
))}

<Text
  style={{
    marginTop: 16,
    fontWeight: '700',
  }}
>
  Available Beds
</Text>

{beds.map((bed) => (
  <TouchableOpacity
    key={bed.id}
    style={[
  styles.selectionCard,
  selectedBed === bed.id && {
    borderColor: '#1C146B',
    borderWidth: 2,
  },
]}
    onPress={() =>
      setSelectedBed(bed.id)
    }
  >
    <Text style={styles.selectionText}>
      {bed.bed_number}
    </Text>
  </TouchableOpacity>
))}
<TextInput
  placeholder="Doctor"
  value={doctor}
  onChangeText={setDoctor}
/>

<TextInput
  placeholder="Diagnosis"
  value={diagnosis}
  onChangeText={setDiagnosis}
/>
<TouchableOpacity
  style={{
    backgroundColor: '#1C146B',
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  }}
  onPress={handleCreateAdmission}
>
  <Text
    style={{
      color: '#FFFFFF',
      fontWeight: '700',
    }}
  >
    Create Admission
  </Text>
</TouchableOpacity>
  </>
)}
{(
  patient
    ? admissions.filter(
        (a) =>
          a.patient_id ===
          patient.id
      )
    : admissions
).map((item) => (
  <View
    key={item.id}
    style={styles.card}
  >
<Text
  style={styles.admissionNo}
>
  {item.admission_number}
</Text>

<Text>
  Patient:
  {' '}
  {item.patientName}
</Text>

<Text>
  Ward:
  {' '}
  {item.wardName || '-'}
</Text>

<Text>
  Bed:
  {' '}
  {item.bedNumber || '-'}
</Text>

<Text>
  Status:
  {' '}
  {item.status}
</Text>
            </View>
))}
</ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

content: {
  paddingBottom: 24,
},

  subtitle: {
    marginTop: 8,
    marginBottom: 16,
    color: '#64748B',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  admissionNo: {
    fontWeight: '700',
    marginBottom: 4,
  },
  selectionCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 14,
  marginTop: 8,
  borderWidth: 1,
  borderColor: '#EEE7D8',
},

selectionText: {
  fontWeight: '600',
},
topBar: {
  minHeight: 90,
  paddingTop: 20,
  backgroundColor: COLORS.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 18,
},

topBarTitle: {
  color: COLORS.card,
  fontSize: 18,
  fontWeight: '700',
},

icon: {
  color: '#FFFFFF',
  fontSize: 22,
},
});
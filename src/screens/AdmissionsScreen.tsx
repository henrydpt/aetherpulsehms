import React, {
  useEffect,
  useState,
} from 'react';
import { useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  TextInput,
  Button,
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
export default function AdmissionsScreen() {
  const route = useRoute<any>();
  const patient =
    route.params?.patient;
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
      <View style={styles.content}>
        <Text style={styles.title}>
          Admissions
        </Text>

<Text style={styles.subtitle}>
  Active Admissions:
  {' '}
  {admissions.length}
</Text>

{patient && (
  <>
    <Text
      style={{
        marginTop: 12,
        fontWeight: '700',
      }}
    >
      Patient: {patient.name}
    </Text>
<Text
  style={{
    marginTop: 16,
    fontWeight: '700',
  }}
>
  Ward
</Text>

{wards.map((ward) => (
  <Button
    key={ward.id}
    title={ward.name}
onPress={async () => {
  setSelectedWard(ward.id);

  const bedData =
    await loadBeds(ward.id);

  setBeds(bedData);
}}
  />
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
  <Button
    key={bed.id}
    title={bed.bed_number}
    onPress={() =>
      setSelectedBed(bed.id)
    }
  />
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
    <Button
      title="Create Admission"
      onPress={handleCreateAdmission}
    />
  </>
)}

<FlatList
data={
  patient
    ? admissions.filter(
        (a) =>
          a.patient_id ===
          patient.id
      )
    : admissions
}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
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
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 20,
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
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
});
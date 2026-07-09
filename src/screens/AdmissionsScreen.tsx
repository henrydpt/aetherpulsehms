import React, {
  useEffect,
  useState,
} from 'react';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Picker,
} from '@react-native-picker/picker';
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
} from 'react-native';
import {
  useAdmissionStore,
} from '../store/admissionStore';
import {
  useUserStore,
} from '../store/userStore';
export default function AdmissionsScreen() {
  const route = useRoute<any>();
const patient =
  route.params?.patient;

const navigation =
  useNavigation<any>();

const encounterId =
  route.params?.encounterId;
const [
  admissions,
  setAdmissions,
] = useState<any[]>([]);

useEffect(() => {
  loadAdmissions();
}, []);
useFocusEffect(
  React.useCallback(() => {
    loadAdmissions();
  }, [])
);

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
const users = useUserStore(
  (state) => state.users
);
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

setAdmissions(
  data.filter(
    (admission: any) =>
      admission.status ===
      'ACTIVE'
  )
);

  const wardData =
    await loadWardOptions();

  setWards(wardData);
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

<View style={{ width: 24 }} />
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
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  }}
>
  Select Ward
</Text>

<View
  style={[
    styles.selectionCard,
    {
      marginHorizontal: 12,
    },
    {
      padding: 0,
      justifyContent: 'center',
    },
  ]}
>
<Picker
  style={styles.picker}
    selectedValue={
      selectedWard
    }
    onValueChange={async (
      value
    ) => {

      setSelectedWard(value);

      setSelectedBed('');

      const bedData =
        await loadBeds(value);

      setBeds(bedData);

    }}
  >

    <Picker.Item
      label="Select Ward"
      value=""
    />

    {wards.map((ward) => (

      <Picker.Item
        key={ward.id}
        label={ward.name}
        value={ward.id}
      />

    ))}

  </Picker>
</View>

<Text
  style={{
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: '700',
    color: COLORS.primary,
  }}
>
  Select Bed
</Text>

<View
  style={[
    styles.selectionCard,
    {
      marginHorizontal: 16,
      padding: 0,
      justifyContent: 'center',
      height: 50,
    },
  ]}
>

<Picker
  style={styles.picker}
    selectedValue={selectedBed}
    onValueChange={(value) =>
      setSelectedBed(value)
    }
  >
    <Picker.Item
      label="Select Bed"
      value=""
    />

    {beds.map((bed) => (
      <Picker.Item
        key={bed.id}
        label={bed.bed_number}
        value={bed.id}
      />
    ))}
  </Picker>
</View>
<Text
  style={{
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: '700',
    color: COLORS.primary,
  }}
>
  Select Doctor
</Text>

<View style={styles.selectionCard}>
  <Picker
    style={styles.picker}
    selectedValue={doctor}
    onValueChange={setDoctor}
  >
    <Picker.Item
      label="Select Doctor"
      value=""
    />

    {users
      .filter(
        (user) =>
          user.role === 'Doctor' &&
          user.active
      )
      .map((doctor) => (
        <Picker.Item
          key={doctor.id}
          label={doctor.name}
          value={doctor.name}
        />
      ))}
  </Picker>
</View>

<Text
  style={{
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: '700',
    color: COLORS.primary,
  }}
>
  Enter Diagnosis
</Text>

<TextInput
  placeholder="Enter diagnosis"
  value={diagnosis}
  onChangeText={setDiagnosis}
  style={{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE7D8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  }}
/>
<TouchableOpacity
  style={{
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
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

<View style={{ height: 24 }} />

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
<TouchableOpacity
  key={item.id}
  style={styles.card}
onPress={() => {

  if (
    item.status ===
    'DISCHARGED'
  ) {

    navigation.navigate(
      'Discharge',
      {
        admission: item,
      }
    );

    return;
  }

navigation.navigate(
  'PatientDashboard',
    {
      admission: item,
    }
  );
}}
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
</TouchableOpacity>
))}
</ScrollView>
</KeyboardAvoidingView>
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
  borderWidth: 1,
  borderColor: '#EEE7D8',
  marginHorizontal: 16,
  marginTop: 8,
  justifyContent: 'center',
  overflow: 'hidden',
},
picker: {
  height: 56,
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
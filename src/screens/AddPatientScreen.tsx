import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { usePatientStore } from '../store/patientStore';
import { COLORS } from '../theme/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function AddPatientScreen() {
  const navigation = useNavigation<any>();

const route = useRoute<any>();

const editPatient =
  route.params?.patient;

const isEditMode =
  route.params?.mode === 'EDIT';
const [name, setName] = useState(
  editPatient?.name || ''
);

const [age, setAge] = useState(
  editPatient?.age?.toString() || ''
);

const [gender, setGender] = useState(
  editPatient?.gender || ''
);

const [ward, setWard] = useState(
  editPatient?.ward || ''
);
const [mobile, setMobile] = useState(
  editPatient?.mobile || ''
);

const [doctorAssigned, setDoctorAssigned] =
  useState(
    editPatient?.doctorAssigned || ''
  );

const [billingType, setBillingType] =
  useState(
    editPatient?.billingType || ''
  );

const [billingRemarks, setBillingRemarks] =
  useState(
    editPatient?.billingRemarks || ''
  );
const [diagnosis, setDiagnosis] = useState(
  editPatient?.diagnosis || ''
);
  const addPatient = usePatientStore(
  (state) => state.addPatient
);
const updatePatient = usePatientStore(
  (state) => state.updatePatient
);
return (
  <SafeAreaView style={styles.container}>
    <StatusBar
      backgroundColor={COLORS.primary}
      barStyle="light-content"
    />
<KeyboardAwareScrollView
  showsVerticalScrollIndicator={false}
  enableOnAndroid={true}
  extraScrollHeight={100}
  keyboardShouldPersistTaps="handled"
  contentContainerStyle={styles.content}
>
      <View style={styles.topBar}>
      <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          {isEditMode
  ? 'Edit Patient'
  : 'Add Patient'}
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Patient Information
        </Text>

        <TextInput
          placeholder="Patient Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
        />

        <TextInput
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />
<TextInput
  placeholder="Mobile Number"
  value={mobile}
  onChangeText={setMobile}
  style={styles.input}
/>

<View style={styles.pickerContainer}>
  <Picker
    style={styles.picker}
    selectedValue={doctorAssigned}
    onValueChange={setDoctorAssigned}
  >
    <Picker.Item
      label="Select Doctor"
      value=""
    />
<Picker.Item
  label="Dr Udumula Ashok Reddy"
  value="Dr Udumula Ashok Reddy"
/>

<Picker.Item
  label="Dr S.V. Geethika Reddy"
  value="Dr S.V. Geethika Reddy"
/>
  </Picker>
</View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Admission Information
        </Text>

        <TextInput
          placeholder="Ward / Room"
          value={ward}
          onChangeText={setWard}
          style={styles.input}
        />

        <TextInput
          placeholder="Diagnosis"
          value={diagnosis}
          onChangeText={setDiagnosis}
          style={styles.input}
        />
<View style={styles.pickerContainer}>
  <Picker
    style={styles.picker}
    selectedValue={billingType}
    onValueChange={setBillingType}
  >
    <Picker.Item
      label="Select Billing Type"
      value=""
    />
    <Picker.Item
      label="Cash"
      value="Cash"
    />
    <Picker.Item
      label="Insurance"
      value="Insurance"
    />
    <Picker.Item
      label="Aarogyasri"
      value="Aarogyasri"
    />
  </Picker>
</View>

<TextInput
  placeholder="Billing Remarks"
  value={billingRemarks}
  onChangeText={setBillingRemarks}
  multiline
  style={styles.textArea}
/>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
if (isEditMode) {
  updatePatient(
    editPatient.id,
{
  name,
  age: Number(age),
  gender,
  ward,
  diagnosis,
  mobile,
  doctorAssigned,
  billingType,
  billingRemarks,
}
  );
} else {
  addPatient({
  id: `PAT${Date.now()}`,
  name,
  age: Number(age),
  gender,
  ward,
  diagnosis,
  mobile,
  doctorAssigned,
  billingType,
  billingRemarks,
});
}

Alert.alert(
  isEditMode
    ? 'Patient Updated'
    : 'Patient Added',
  'Patient admission recorded.'
);

navigation.goBack();
}}
      >
        <Text style={styles.buttonText}>
          Save Patient
        </Text>
      </TouchableOpacity>
</KeyboardAwareScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
  },

  content: {
  paddingBottom: 180,
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

input: {
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  paddingHorizontal: 14,
  height: 56,
  marginBottom: 12,
},
pickerContainer: {
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  marginBottom: 12,
  height: 56,
  justifyContent: 'center',
  overflow: 'hidden',
},

picker: {
  height: 56,
},
textArea: {
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  padding: 14,
  minHeight: 100,
  textAlignVertical: 'top',
  marginTop: 12,
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
    fontWeight: '700',
  },
});

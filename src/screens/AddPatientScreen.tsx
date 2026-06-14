import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePatientStore } from '../store/patientStore';

export default function AddPatientScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [ward, setWard] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const addPatient = usePatientStore(
  (state) => state.addPatient
);
  const navigation = useNavigation<any>();
return (
  <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
  onPress={() => navigation.goBack()}
>
  <Text style={styles.icon}>‹</Text>
</TouchableOpacity>

        <Text style={styles.topBarTitle}>
          Add Patient
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
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
  addPatient({
    id: `PAT${Date.now()}`,
    name,
    age: Number(age),
    gender,
    ward,
    diagnosis,
  });

  Alert.alert(
    'Patient Added',
    'Patient admission recorded.'
  );

  navigation.goBack();
}}
      >
        <Text style={styles.buttonText}>
          Save Patient
        </Text>
      </TouchableOpacity>
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
  padding: 14,
  marginBottom: 12,
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

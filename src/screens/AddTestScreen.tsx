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
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  saveLabTest,
  updateLabTest,
} from '../services/labTestService';
export default function AddTestScreen() {

  const navigation =
    useNavigation<any>();
const route =
  useRoute<any>();

const mode =
  route.params?.mode;

const existingTest =
  route.params?.test;
  const [
    testName,
    setTestName,
  ] = useState('');

  const [
    testCode,
    setTestCode,
  ] = useState('');

  const [
    department,
    setDepartment,
  ] = useState('');

  const [
    sampleType,
    setSampleType,
  ] = useState('');

  const [
    category,
    setCategory,
  ] = useState('');
useEffect(() => {

  if (
    mode !== 'EDIT' ||
    !existingTest
  ) {
    return;
  }

  setTestName(
    existingTest.test_name || ''
  );

  setTestCode(
    existingTest.test_code || ''
  );

  setDepartment(
    existingTest.department || ''
  );

  setSampleType(
    existingTest.sample_type || ''
  );

  setCategory(
    existingTest.category || ''
  );

}, [
  mode,
  existingTest,
]);
async function saveTest() {

  if (
    !testName.trim() ||
    !testCode.trim()
  ) {
    Alert.alert(
      'Validation',
      'Test Name and Test Code are required.'
    );
    return;
  }

  try {

const payload = {

  test_name:
    testName,

  test_code:
    testCode.toUpperCase(),

  department,

  sample_type:
    sampleType,

  category,

  active: true,

};

if (
  mode === 'EDIT'
) {

  await updateLabTest(
    existingTest.id,
    payload
  );

} else {

  await saveLabTest(
    payload
  );

}

    Alert.alert(
      'Success',
      mode === 'EDIT'
  ? 'Laboratory test updated successfully.'
  : 'Laboratory test added successfully.',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.goBack(),
        },
      ]
    );

  } catch (error: any) {

    Alert.alert(
      'Error',
      error.message
    );

  }

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
              Add Test
            </Text>
          </View>

          <View style={styles.card}>

            <Text style={styles.label}>
              Test Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Complete Blood Count"
              value={testName}
              onChangeText={
                setTestName
              }
            />

            <Text style={styles.label}>
              Test Code
            </Text>

            <TextInput
              style={styles.input}
              placeholder="CBC"
              autoCapitalize="characters"
              value={testCode}
              onChangeText={
                setTestCode
              }
            />

            <Text style={styles.label}>
              Department
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Hematology"
              value={department}
              onChangeText={
                setDepartment
              }
            />

            <Text style={styles.label}>
              Sample Type
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Blood"
              value={sampleType}
              onChangeText={
                setSampleType
              }
            />

            <Text style={styles.label}>
              Category
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Routine"
              value={category}
              onChangeText={
                setCategory
              }
            />

          </View>

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveTest}
            >

              <Text style={styles.saveButtonText}>
                Save Test
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
      backgroundColor:
        '#FFFFFF',
      marginHorizontal: 16,
      marginTop: 10,
      borderRadius: 16,
      padding: 16,
    },

    label: {
      fontWeight: '600',
      marginBottom: 8,
      marginTop: 10,
    },

    input: {
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: 12,
      padding: 12,
      backgroundColor:
        '#FFFFFF',
    },

    saveButton: {
      backgroundColor:
        COLORS.primary,
      borderRadius: 12,
      padding: 14,
      alignItems: 'center',
    },

    saveButtonText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16,
    },

  });
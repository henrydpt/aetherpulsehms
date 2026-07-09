import React, {
  useState,
} from 'react';
import {
  useNavigation,
} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  addProcedure,
} from '../services/radiologyProcedureService';
import { COLORS } from '../theme/colors';

export default function AddRadiologyProcedureScreen() {
const navigation =
  useNavigation<any>();
  const [
    procedureName,
    setProcedureName,
  ] = useState('');

  const [
    procedureCode,
    setProcedureCode,
  ] = useState('');

  const [
    modality,
    setModality,
  ] = useState('');

  const [
    department,
    setDepartment,
  ] = useState('');
const [
  bodyPart,
  setBodyPart,
] = useState('');

const [
  estimatedDuration,
  setEstimatedDuration,
] = useState('');

const [
  preparationInstructions,
  setPreparationInstructions,
] = useState('');
  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >

        <View
          style={styles.topBar}
        >

          <Text
            style={styles.topBarTitle}
          >
            Add Procedure
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Procedure Name
          </Text>

          <TextInput
            value={procedureName}
            onChangeText={setProcedureName}
            placeholder="Enter procedure name"
            style={styles.input}
          />

          <Text style={styles.label}>
            Procedure Code
          </Text>

          <TextInput
            value={procedureCode}
            onChangeText={setProcedureCode}
            placeholder="Enter procedure code"
            style={styles.input}
          />

          <Text style={styles.label}>
            Modality
          </Text>

          <TextInput
            value={modality}
            onChangeText={setModality}
            placeholder="X-Ray / CT / MRI / USG"
            style={styles.input}
          />

          <Text style={styles.label}>
            Department
          </Text>

          <TextInput
            value={department}
            onChangeText={setDepartment}
            placeholder="Radiology"
            style={styles.input}
          />
<Text style={styles.label}>
  Body Part
</Text>

<TextInput
  value={bodyPart}
  onChangeText={setBodyPart}
  placeholder="Chest, Brain, Abdomen..."
  style={styles.input}
/>

<Text style={styles.label}>
  Estimated Duration (Minutes)
</Text>

<TextInput
  value={estimatedDuration}
  onChangeText={setEstimatedDuration}
  placeholder="30"
  keyboardType="numeric"
  style={styles.input}
/>

<Text style={styles.label}>
  Preparation Instructions
</Text>

<TextInput
  value={preparationInstructions}
  onChangeText={
    setPreparationInstructions
  }
  placeholder="Enter preparation instructions"
  multiline
  numberOfLines={4}
  textAlignVertical="top"
  style={[
    styles.input,
    {
      height: 110,
    },
  ]}
/>
<TouchableOpacity
  style={styles.button}
  onPress={async () => {

    try {

await addProcedure({

  procedure_name:
    procedureName,

  procedure_code:
    procedureCode,

  modality,

  department,

  body_part:
    bodyPart,

  estimated_duration:
    estimatedDuration
      ? Number(
          estimatedDuration
        )
      : null,

  preparation_instructions:
    preparationInstructions,

});

      Alert.alert(
        'Success',
        'Procedure added successfully.'
      );

      navigation.goBack();

    } catch (error: any) {

      Alert.alert(
        'Error',
        error.message
      );

    }

  }}
>

            <Text
              style={styles.buttonText}
            >
              Save Procedure
            </Text>

          </TouchableOpacity>

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
    paddingBottom: 100,
  },

  topBar: {
    height: 90,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

});
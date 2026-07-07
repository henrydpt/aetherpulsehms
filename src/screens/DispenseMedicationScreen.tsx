import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import {
  Picker,
} from '@react-native-picker/picker';

import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';

import { COLORS } from '../theme/colors';

import {
  getInventory,
} from '../services/inventoryService';

import {
  dispenseMedicationWorkflow,
} from '../workflows/dispenseMedicationWorkflow';

export default function DispenseMedicationScreen() {

  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { order } = route.params;

  const [
    inventory,
    setInventory,
  ] = useState<any[]>([]);

  const [
    inventoryId,
    setInventoryId,
  ] = useState('');

  const [
    quantity,
    setQuantity,
  ] = useState('1');

  const [
    remarks,
    setRemarks,
  ] = useState('');

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {

    const data =
      await getInventory();

    const matching =
    
      data.filter(
        (item: any) =>
          item.medicines?.name ===
          order.medication_name
      );
    setInventory(matching);

    if (matching.length > 0) {
      setInventoryId(
        matching[0].id
      );
    }

  }

  async function handleDispense() {

const result =
  await dispenseMedicationWorkflow(
    order.id,
    inventoryId,
    Number(quantity),
    'Pharmacist',
    remarks
  );

if (!result.success) {

  Alert.alert(
    'Error',
    result.message
  );

  return;

}

Alert.alert(
  'Success',
  result.message,
  [
    {
      text: 'OK',
      onPress: () =>
        navigation.goBack(),
    },
  ]
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

    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >

      <View style={{ flex: 1 }}>

        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Dispense Medication
          </Text>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
        >

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              Patient
            </Text>

            <Text style={styles.title}>
              {order.patient_name ??
                'Patient'}
            </Text>

            <Text style={styles.detail}>
              {order.medication_name}
            </Text>

            <Text style={styles.detail}>
              {order.dose}
              {' • '}
              {order.route}
            </Text>

          </View>

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              Inventory Batch
            </Text>

            <View
              style={styles.pickerContainer}
            >

              <Picker
                selectedValue={
                  inventoryId
                }
                onValueChange={
                  setInventoryId
                }
              >

                {inventory.map(
                  (item: any) => (
                    <Picker.Item
                      key={item.id}
                      label={`${item.batch_no} (${item.quantity} available)`}
                      value={item.id}
                    />
                  )
                )}

              </Picker>

            </View>

            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={
                setQuantity
              }
              keyboardType="numeric"
              placeholder="Quantity"
            />

            <TextInput
              style={[
                styles.input,
                {
                  minHeight: 100,
                  textAlignVertical:
                    'top',
                },
              ]}
              multiline
              placeholder="Remarks"
              value={remarks}
              onChangeText={
                setRemarks
              }
            />

            <TouchableOpacity
              style={styles.button}
              onPress={
                handleDispense
              }
            >

              <Text
                style={
                  styles.buttonText
                }
              >
                Dispense Medication
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

      </View>

    </TouchableWithoutFeedback>

  </KeyboardAvoidingView>

</SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  sectionTitle: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  detail: {
    marginTop: 6,
    color: '#475569',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

});
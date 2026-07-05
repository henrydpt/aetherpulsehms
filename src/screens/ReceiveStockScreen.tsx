import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker
  from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { COLORS } from '../theme/colors';

import {
  getMedicines,
} from '../services/medicineService';

import {
  addInventory,
} from '../services/inventoryService';

export default function ReceiveStockScreen() {

  const [
    medicines,
    setMedicines,
  ] = useState<any[]>([]);

  const [
    medicineId,
    setMedicineId,
  ] = useState('');

  const [
    batchNo,
    setBatchNo,
  ] = useState('');

const [
  expiryDate,
  setExpiryDate,
] = useState(new Date());

const [
  showExpiryPicker,
  setShowExpiryPicker,
] = useState(false);

  const [
    quantity,
    setQuantity,
  ] = useState('');

  const [
    purchasePrice,
    setPurchasePrice,
  ] = useState('');

  const [
    sellingPrice,
    setSellingPrice,
  ] = useState('');

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    const data =
      await getMedicines();

    setMedicines(data);

    if (data.length > 0) {
      setMedicineId(data[0].id);
    }
  }

  async function handleSave() {

    await addInventory(
      medicineId,
      batchNo,
      expiryDate
  .toISOString()
  .split('T')[0],
      Number(quantity),
      Number(purchasePrice),
      Number(sellingPrice)
    );

    Alert.alert(
      'Success',
      'Stock received successfully.'
    );

    setBatchNo('');
    setExpiryDate(
  new Date()
);
    setQuantity('');
    setPurchasePrice('');
    setSellingPrice('');
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
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >

      <View style={{ flex: 1 }}>

      <View style={styles.topBar}>
        <Text style={styles.title}>
          Receive Stock
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

          <Text style={styles.label}>
            Medicine
          </Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={medicineId}
              onValueChange={
                setMedicineId
              }
            >
              {medicines.map(
                (medicine: any) => (
                  <Picker.Item
                    key={medicine.id}
                    label={`${medicine.name} (${medicine.strength})`}
                    value={medicine.id}
                  />
                )
              )}
            </Picker>
          </View>

          <TextInput
            placeholder="Batch Number"
            value={batchNo}
            onChangeText={setBatchNo}
            style={styles.input}
          />

<TouchableOpacity
  onPress={() =>
    setShowExpiryPicker(true)
  }
  style={styles.input}
>
  <Text>
    {expiryDate
      .toISOString()
      .split('T')[0]}
  </Text>
</TouchableOpacity>

{showExpiryPicker && (
  <DateTimePicker
    value={expiryDate}
    mode="date"
    display="default"
    minimumDate={new Date()}
    onChange={(
      event,
      selectedDate
    ) => {
      setShowExpiryPicker(false);

      if (selectedDate) {
        setExpiryDate(
          selectedDate
        );
      }
    }}
  />
)}

          <TextInput
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
          />

          <TextInput
            placeholder="Purchase Price"
            keyboardType="numeric"
            value={purchasePrice}
            onChangeText={setPurchasePrice}
            style={styles.input}
          />

          <TextInput
            placeholder="Selling Price"
            keyboardType="numeric"
            value={sellingPrice}
            onChangeText={setSellingPrice}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
          >
            <Text
              style={styles.buttonText}
            >
              Receive Stock
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      COLORS.primary,
  },

  title: {
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

  label: {
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor:
      '#FFFFFF',
  },

  button: {
    marginTop: 12,
    backgroundColor:
      COLORS.primary,
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
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
  Alert,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  loadRadiologyProcedures,
} from '../services/radiologyProcedureQueryService';
import {
  createRadiologyOrder,
} from '../services/radiologyOrderService';
export default function RadiologyOrdersScreen() {
const navigation =
  useNavigation<any>();

const route =
  useRoute<any>();

const admission =
  route.params?.admission;

const [
  procedures,
  setProcedures,
] = useState<any[]>([]);

const [
  selectedProcedures,
  setSelectedProcedures,
] = useState<any[]>([]);
useEffect(() => {
  loadProcedures();
}, []);

async function loadProcedures() {

  const data =
    await loadRadiologyProcedures();

  setProcedures(data);

}
async function placeOrder() {

  if (
    selectedProcedures.length === 0
  ) {

    Alert.alert(
      'Validation',
      'Please select at least one radiology procedure.'
    );

    return;

  }

  try {

    await createRadiologyOrder(

      admission.patient_id,

      admission.id,

      admission.patientName,

      'Doctor',

      selectedProcedures.map(
        (p) => p.id
      )

    );

    Alert.alert(
      'Success',
      'Radiology order placed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedProcedures([]);
            navigation.goBack();
          },
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <View style={styles.topBar}>

          <View style={{ width: 24 }} />

          <Text style={styles.topBarTitle}>
            Radiology Orders
          </Text>

          <View style={{ width: 24 }} />

        </View>
<View
  style={{
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  }}
>

  <Text
    style={{
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.primary,
    }}
  >
    Patient Information
  </Text>

  <Text
    style={{
      marginTop: 12,
      fontSize: 18,
      fontWeight: '700',
    }}
  >
    {admission?.patientName}
  </Text>

  <Text
    style={{
      marginTop: 6,
      color: '#64748B',
    }}
  >
    Admission No: {admission?.admission_number}
  </Text>

  <Text
    style={{
      marginTop: 4,
      color: '#64748B',
    }}
  >
    Ward: {admission?.wardName || '-'}
  </Text>

</View>
<View
  style={{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  }}
>

<Text
  style={{
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
  }}
>
  Available Procedures
</Text>

{procedures.map((procedure) => (

<TouchableOpacity
  key={procedure.id}
  onPress={() => {

    const exists =
      selectedProcedures.some(
        (p) =>
          p.id === procedure.id
      );

    if (exists) {

      setSelectedProcedures(
        selectedProcedures.filter(
          (p) =>
            p.id !== procedure.id
        )
      );

    } else {

      setSelectedProcedures([
        ...selectedProcedures,
        procedure,
      ]);

    }

  }}

  style={{
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor:
      selectedProcedures.some(
        (p) =>
          p.id === procedure.id
      )
        ? '#16A34A'
        : '#E2E8F0',
    backgroundColor:
      selectedProcedures.some(
        (p) =>
          p.id === procedure.id
      )
        ? '#F0FDF4'
        : '#FFFFFF',
  }}
>

<Text
  style={{
    fontWeight: '700',
    fontSize: 16,
  }}
>
  🩻 {procedure.procedure_name}
</Text>

<Text
  style={{
    color: '#64748B',
    marginTop: 4,
  }}
>
  {procedure.procedure_code}
</Text>

</TouchableOpacity>

))}
<TouchableOpacity
  onPress={placeOrder}
  style={{
    marginTop: 8,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16,
    }}
  >
    Order Selected Procedures
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
    backgroundColor: '#F8FAFC',
  },

  content: {
    paddingBottom: 24,
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

});
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
  getLabTests,
} from '../services/labTestService';
import {
  createLabOrder,
} from '../services/labOrderService';
export default function LabOrdersScreen() {
const navigation =
  useNavigation<any>();
const route =
  useRoute<any>();

const admission =
  route.params?.admission;

const [
  tests,
  setTests,
] = useState<any[]>([]);
const [
  selectedTests,
  setSelectedTests,
] = useState<any[]>([]);
useEffect(() => {
  loadTests();
}, []);

async function loadTests() {

  const data =
    await getLabTests();

  setTests(data);

}
function toggleTest(
  test: any
) {

  const exists =
    selectedTests.some(
      (t) =>
        t.id === test.id
    );

  if (exists) {

    setSelectedTests(
      selectedTests.filter(
        (t) =>
          t.id !== test.id
      )
    );

  } else {

    setSelectedTests([
      ...selectedTests,
      test,
    ]);

  }

}
async function placeOrder() {

  if (
    selectedTests.length === 0
  ) {

    Alert.alert(
      'Validation',
      'Please select at least one laboratory test.'
    );

    return;

  }

  try {

await createLabOrder(

  {

    patient_id:
      admission?.patient_id,

    patient_name:
      admission?.patientName,

    admission_id:
      admission?.id,

    ordered_by:
      'Doctor',

  },

  selectedTests

);

    Alert.alert(

      'Success',

      'Laboratory tests ordered successfully.',

      [

        {

          text: 'OK',

          onPress: () => {

            setSelectedTests([]);

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

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >

        <View style={styles.topBar}>
          <Text
            style={styles.topBarTitle}
          >
            Lab Orders
          </Text>
        </View>

<View style={styles.card}>

  <Text
    style={styles.heading}
  >
    Available Tests
  </Text>

  {tests.map((test) => (

<TouchableOpacity
  key={test.id}
  onPress={() =>
    toggleTest(test)
  }
  
  style={{
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor:
      selectedTests.some(
        (t) =>
          t.id === test.id
      )
        ? '#16A34A'
        : '#E2E8F0',
    backgroundColor:
      selectedTests.some(
        (t) =>
          t.id === test.id
      )
        ? '#F0FDF4'
        : '#FFFFFF',
  }}
>
    
{selectedTests.some(
  (t) =>
    t.id === test.id
) && (
  <Text
    style={{
      color: '#16A34A',
      fontWeight: '700',
      marginBottom: 6,
    }}
  >
    ✓ Selected
  </Text>
)}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
        }}
      >
        🧪 {test.test_name}
      </Text>

      <Text
        style={{
          marginTop: 4,
          color: '#64748B',
        }}
      >
        {test.test_code}
        {' • '}
        {test.department}
      </Text>

    </TouchableOpacity>

  ))}

{selectedTests.length > 0 && (

  <View
    style={{
      marginTop: 24,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0',
    }}
  >

    <Text
      style={{
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 12,
      }}
    >
      Selected Tests ({selectedTests.length})
    </Text>

    {selectedTests.map((test) => (

      <Text
        key={test.id}
        style={{
          color: '#16A34A',
          marginBottom: 8,
          fontSize: 15,
        }}
      >
        ✓ {test.test_name}
      </Text>

    ))}

  </View>

)}
<TouchableOpacity
  style={styles.orderButton}
  onPress={placeOrder}
>

  <Text
    style={styles.orderButtonText}
  >
    Order Selected Tests
  </Text>

</TouchableOpacity>
</View>

      </ScrollView>

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
      margin: 16,
      borderRadius: 16,
      padding: 16,
    },

    heading: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.primary,
    },

    message: {
      marginTop: 12,
      color: '#64748B',
      lineHeight: 22,
    },
orderButton: {
  marginTop: 20,
  backgroundColor: COLORS.primary,
  borderRadius: 12,
  padding: 14,
  alignItems: 'center',
},

orderButtonText: {
  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 16,
},
  });
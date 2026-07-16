import React, {
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
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  createPayment,
} from '../services/paymentService';

export default function PaymentCollectionScreen() {

const route =
    useRoute<any>();

const navigation =
  useNavigation<any>();

const admission =
  route.params?.admission;

const encounter =
  route.params?.encounter;

const [
  amount,
  setAmount,
] = useState('');

const [
  paymentMode,
  setPaymentMode,
] = useState('Cash');

const [
  receivedBy,
  setReceivedBy,
] = useState('Cashier');

const [
  remarks,
  setRemarks,
] = useState('');
async function receivePayment() {

  try {

await createPayment(

  admission
    ? admission.id
    : null,

  encounter
    ? encounter.id
    : null,

  Number(amount),

  paymentMode,

  receivedBy,

  remarks

);

    Alert.alert(
      'Success',
      'Payment received successfully.'
    );
navigation.goBack();
  } catch (e) {

    Alert.alert(
      'Error',
      'Unable to receive payment.'
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

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Collect Payment
        </Text>

        <View style={{ width: 24 }} />

      </View>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.content}
  keyboardShouldPersistTaps="handled"
>

<View
  style={{
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  }}
>

<Text
  style={{
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 20,
  }}
>
  Receive Payment
</Text>

<Text>Amount</Text>

<TextInput
  value={amount}
  onChangeText={setAmount}
  keyboardType="numeric"
  style={styles.input}
/>

<Text
  style={{
    marginTop: 16,
  }}
>
  Payment Mode
</Text>

<TextInput
  value={paymentMode}
  onChangeText={setPaymentMode}
  style={styles.input}
/>

<Text
  style={{
    marginTop: 16,
  }}
>
  Received By
</Text>

<TextInput
  value={receivedBy}
  onChangeText={setReceivedBy}
  style={styles.input}
/>

<Text
  style={{
    marginTop: 16,
  }}
>
  Remarks
</Text>

<TextInput
  value={remarks}
  onChangeText={setRemarks}
  style={[
    styles.input,
    {
      height: 90,
      textAlignVertical: 'top',
    },
  ]}
  multiline
/>

<TouchableOpacity
  style={styles.button}
  onPress={receivePayment}
>

<Text style={styles.buttonText}>
  Receive Payment
</Text>

</TouchableOpacity>

</View>

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
input: {
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 10,
  padding: 12,
  marginTop: 8,
},

button: {
  backgroundColor: COLORS.primary,
  marginTop: 24,
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
},

buttonText: {
  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 16,
},
});
import React, {
  useEffect,
  useState,
} from 'react';
import {
  useRoute,
} from '@react-navigation/native';
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
import { COLORS } from '../theme/colors';
import {
  getLabOrderItems,
} from '../services/labOrderDetailService';
import {
  saveLabResult,
} from '../services/labResultService';
export default function LabOrderDetailScreen() {
const route =
  useRoute<any>();

const order =
  route.params?.order;

const [
  items,
  setItems,
] = useState<any[]>([]);
useEffect(() => {
  loadItems();
}, []);

async function loadItems() {

  const data =
    await getLabOrderItems(
      order.id
    );

  setItems(data);

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
      : undefined
  }
>

      <ScrollView
        contentContainerStyle={styles.content}
      >

        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Laboratory Order
          </Text>
        </View>

{items.map((item) => (

  <View
    key={item.id}
    style={styles.card}
  >

    <Text
      style={styles.heading}
    >
      🧪 {item.lab_test_master?.test_name}
    </Text>

    <Text
      style={styles.message}
    >
      Code:{' '}
      {item.lab_test_master?.test_code}
    </Text>

    <Text
      style={styles.message}
    >
      Department:{' '}
      {item.lab_test_master?.department}
    </Text>

    <Text
      style={styles.message}
    >
      Status:{' '}
      {item.status}
    </Text>
<Text
  style={{
    marginTop: 16,
    fontWeight: '600',
  }}
>
  Result
</Text>

<TextInput
  placeholder="Enter result"
  style={styles.input}
  value={item.result ?? ''}
  onChangeText={(text) => {
    setItems((current) =>
      current.map((i) =>
        i.id === item.id
          ? {
              ...i,
              result: text,
            }
          : i
      )
    );
  }}
/>
<Text
  style={{
    marginTop: 12,
    fontWeight: '600',
  }}
>
  Remarks
</Text>

<TextInput
  placeholder="Optional remarks"
  style={styles.input}
  value={item.remarks ?? ''}
  onChangeText={(text) => {
    setItems((current) =>
      current.map((i) =>
        i.id === item.id
          ? {
              ...i,
              remarks: text,
            }
          : i
      )
    );
  }}
/>
<TouchableOpacity
  style={styles.saveButton}
  onPress={async () => {

    try {

      await saveLabResult(
        item
      );

      Alert.alert(
        'Success',
        'Result saved successfully.'
      );

      loadItems();

    } catch (error: any) {

      Alert.alert(
        'Error',
        error.message
      );

    }

  }}
>

  <Text
    style={styles.saveButtonText}
  >
    Save Result
  </Text>

</TouchableOpacity>
  </View>

))}

      </ScrollView>
</KeyboardAvoidingView>
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
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  marginTop: 10,
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
input: {
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  padding: 12,
  marginTop: 8,
  backgroundColor: '#FFFFFF',
},
saveButton: {
  marginTop: 16,
  backgroundColor: '#16A34A',
  borderRadius: 12,
  padding: 12,
  alignItems: 'center',
},

saveButtonText: {
  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 15,
},
});
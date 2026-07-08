import React, {
  useEffect,
  useState,
} from 'react';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { COLORS } from '../theme/colors';
import {
  getLabOrders,
} from '../services/labQueueService';
export default function LabQueueScreen() {
const navigation =
  useNavigation<any>();
const [
  orders,
  setOrders,
] = useState<any[]>([]);
useFocusEffect(
  React.useCallback(() => {

    loadOrders();

  }, [])
);

async function loadOrders() {

  const data =
    await getLabOrders();

  setOrders(data);

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
            Laboratory Queue
          </Text>
        </View>

{orders.map((order) => (

  <View
    key={order.id}
    style={styles.card}
  >

<Text
  style={styles.heading}
>
  🧪 {order.patient_name}
</Text>

    <Text
      style={styles.message}
    >
      Patient ID: {order.patient_id}
    </Text>
<Text
  style={styles.message}
>
Tests Ordered:{' '}
{order.lab_order_items?.[0]?.count ?? 0}
</Text>
    <Text
      style={styles.message}
    >
      Status: {order.status}
    </Text>

    <Text
      style={styles.message}
    >
      Ordered:
      {' '}
{new Date(
  order.ordered_at
).toLocaleDateString(
  'en-GB',
  {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }
)}
{' • '}
{new Date(
  order.ordered_at
).toLocaleTimeString(
  'en-GB',
  {
    hour: '2-digit',
    minute: '2-digit',
  }
)}
    </Text>
<TouchableOpacity
  onPress={() =>
    navigation.navigate(
      'Lab Order Detail',
      {
        order,
      }
    )
  }
  style={{
    marginTop: 16,
    alignSelf: 'flex-end',
  }}
>
  <Text
    style={{
      color: COLORS.primary,
      fontWeight: '700',
      fontSize: 16,
    }}
  >
    Process →
  </Text>
</TouchableOpacity>
  </View>

))}

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
  paddingBottom: 100,
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

  });
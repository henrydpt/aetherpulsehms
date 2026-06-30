import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';
import {
  getOpQueueWithPatients,
} from '../services/opQueueListService';
import {
  startConsultation,
  completeConsultation,
} from '../services/opConsultationService';

export default function OpQueueScreen() {

  const [queue, setQueue] =
    useState<any[]>([]);

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
const data =
  await getOpQueueWithPatients();

    setQueue(data);
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
<StatusBar
  backgroundColor={COLORS.primary}
  barStyle="light-content"
/>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 24,
  }}
>
  <View style={styles.topBar}>
    <View style={{ width: 24 }} />

    <Text style={styles.topBarTitle}>
      OPD Queue
    </Text>

    <View style={{ width: 24 }} />
  </View>

  <View
    style={{
      backgroundColor: '#FFFFFF',
      margin: 16,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.primary,
      }}
    >
      {queue.length}
    </Text>

    <Text
      style={{
        color: '#64748B',
        marginTop: 4,
      }}
    >
      Active Queue
    </Text>
  </View>

  {queue.map((item: any) => (
    <View
      key={item.id}
      style={styles.card}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          color: COLORS.primary,
        }}
      >
        #{item.token_number}
      </Text>

      <Text
        style={{
          marginTop: 8,
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        {item.patientName}
      </Text>

      <Text
        style={{
          marginTop: 4,
          color: '#64748B',
        }}
      >
        {item.status}
      </Text>

      {item.status === 'WAITING' && (
        <TouchableOpacity
          onPress={async () => {
            await startConsultation(
              item.id
            );

            loadQueue();
          }}
        >
          <Text
            style={{
              color: '#16A34A',
              marginTop: 12,
              fontWeight: '700',
            }}
          >
            Start Consultation
          </Text>
        </TouchableOpacity>
      )}

      {item.status ===
        'IN_CONSULTATION' && (
        <TouchableOpacity
          onPress={async () => {
            await completeConsultation(
              item.id
            );

            loadQueue();
          }}
        >
          <Text
            style={{
              color: '#2563EB',
              marginTop: 12,
              fontWeight: '700',
            }}
          >
            Complete Consultation
          </Text>
        </TouchableOpacity>
      )}
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

    title: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 12,
    },

    card: {
      backgroundColor:
        '#FFFFFF',
      padding: 14,
      marginTop: 10,
      borderRadius: 10,
    },
    topBar: {
  height: 90,
  paddingTop: 20,
  backgroundColor: COLORS.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 18,
},

topBarTitle: {
  color: COLORS.card,
  fontSize: 18,
  fontWeight: '700',
},
  });
import React, {
  useEffect,
  useState,
} from 'react';
import { useRoute }
  from '@react-navigation/native';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
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
const navigation =
  useNavigation<any>();
  const [queue, setQueue] =
    useState<any[]>([]);

useEffect(() => {
  loadQueue();
}, []);

useFocusEffect(
  React.useCallback(() => {
    loadQueue();
  }, [])
);

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

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >

      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: COLORS.primary,
        }}
      >
        {item.token_number}
      </Text>

      <Text
        style={{
          color:
            item.status === 'WAITING'
              ? '#D97706'
              : '#16A34A',
          fontWeight: '700',
        }}
      >
        {item.status}
      </Text>

    </View>

    <Text
      style={{
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
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
      {item.patient_id}
    </Text>

    <Text
      style={{
        marginTop: 4,
        color: '#64748B',
      }}
    >
      {item.patientAge} Y / {item.patientGender}
    </Text>

    <Text
      style={{
        marginTop: 4,
        color: '#64748B',
      }}
    >
      Doctor: {item.doctorAssigned || '-'}
    </Text>

    {item.status === 'WAITING' && (

      <TouchableOpacity
        onPress={async () => {

          await startConsultation(
            item.id
          );

          navigation.navigate(
            'Consultation',
            {
              patient: item,
              queueId: item.id,
            }
          );

          loadQueue();

        }}
      >

        <Text
          style={{
            color: '#16A34A',
            marginTop: 16,
            fontWeight: '700',
            fontSize: 16,
          }}
        >
          Start Consultation
        </Text>

      </TouchableOpacity>

    )}

    {item.status ===
      'IN_CONSULTATION' && (

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Consultation',
            {
              patient: item,
              queueId: item.id,
            }
          )
        }
      >

        <Text
          style={{
            color: '#2563EB',
            marginTop: 16,
            fontWeight: '700',
            fontSize: 16,
          }}
        >
          Continue Consultation
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
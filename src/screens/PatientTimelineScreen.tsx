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
} from 'react-native';
import {
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  getPatientTimeline,
} from '../services/patientTimelineService';
export default function PatientTimelineScreen() {

  const route =
    useRoute<any>();

const admission =
  route.params?.admission;

const [
  timeline,
  setTimeline,
] = useState<any[]>([]);
useEffect(() => {
  loadTimeline();
}, []);

async function loadTimeline() {

  const data =
await getPatientTimeline(
  admission.id,
  admission.patient_id
);

  setTimeline(data);

}
  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Patient Timeline
        </Text>

        <View style={{ width: 24 }} />

      </View>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.content}
>

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
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
  }}
>
  Patient Timeline
</Text>

{timeline.map((event) => (

<View
  key={`${event.type}-${event.id}`}
  style={{
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    paddingLeft: 16,
    marginBottom: 20,
  }}
>

<Text
  style={{
    fontSize: 16,
    fontWeight: '700',
  }}
>
  {event.title}
</Text>

<Text
  style={{
    marginTop: 4,
    color: '#64748B',
  }}
>
  {new Date(event.eventTime)
    .toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    )
    .replace(/ /g, '-')}
  {' • '}
  {new Date(event.eventTime)
    .toLocaleTimeString(
      'en-GB',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    )}
</Text>

</View>

))}

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
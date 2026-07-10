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
  TextInput,
} from 'react-native';
import {
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  getDiagnosticResults,
} from '../services/diagnosticResultService';
export default function DiagnosticResultsScreen() {

  const route = useRoute<any>();

  const admission =
    route.params?.admission;
const [
  diagnostics,
  setDiagnostics,
] = useState<any[]>([]);
const [
  search,
  setSearch,
] = useState('');
useEffect(() => {
  loadResults();
}, []);

async function loadResults() {

  const data =
    await getDiagnosticResults();

  setDiagnostics(data);

}
  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Diagnostic Results
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
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
  }}
>
  Diagnostic Results
</Text>

<TextInput
  placeholder="Search patient, investigation or doctor..."
  value={search}
  onChangeText={setSearch}
  style={{
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  }}
/>

{diagnostics.length === 0 ? (

<Text
  style={{
    color: '#64748B',
  }}
>
  No diagnostic investigations found.
</Text>

) : (

diagnostics
  .filter((result) => {

    const text = (
      `${result.patient_name ?? ''} ` +
      `${result.ordered_by ?? ''} ` +
      `${result.type ?? ''}`
    ).toLowerCase();

    return text.includes(
      search.toLowerCase()
    );

  })
  .map(
(result) => (

<View
  key={`${result.type}-${result.id}`}
  style={{
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  }}
>

<Text
  style={{
    fontSize: 16,
    fontWeight: '700',
  }}
>
  {result.type === 'LAB'
    ? '🧪'
    : '🩻'}{' '}
  {result.investigation}
</Text>

<Text
  style={{
    marginTop: 4,
    color: '#64748B',
  }}
>
  Ordered By: {result.ordered_by}
</Text>

<Text
  style={{
    marginTop: 2,
    color: '#64748B',
  }}
>
  {new Date(result.ordered_at)
    .toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    )
    .replace(/ /g, '-')}
</Text>

</View>

))

)}

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
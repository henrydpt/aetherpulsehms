import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function PatientDetailScreen() {
  const route = useRoute<any>();

  const patient = route.params?.patient;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.icon}>‹</Text>

          <Text style={styles.topBarTitle}>
            Patient Details
          </Text>

          <View style={{ width: 20 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.name}>
            {patient?.name}
          </Text>

          <Text style={styles.info}>
            Age: {patient?.age}
          </Text>

          <Text style={styles.info}>
            Gender: {patient?.gender}
          </Text>

          <Text style={styles.info}>
            {patient?.ward}
          </Text>

          <Text style={styles.info}>
            {patient?.diagnosis}
          </Text>
        </View>
      </ScrollView>
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
    height: 64,
    backgroundColor: '#234A7A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  icon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
    margin: 14,
    borderRadius: 16,
    padding: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },

  info: {
    marginTop: 10,
    fontSize: 16,
    color: '#475569',
  },
});
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function PatientsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.icon}>☰</Text>

          <Text style={styles.topBarTitle}>
            Patients
          </Text>

          <Text style={styles.icon}>＋</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search patients by name or ID"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <PatientCard
          name="Ravi"
          age="40"
          gender="Male"
          ward="General Ward - 2 / 205"
          diagnosis="Chest Pain"
        />

        <PatientCard
          name="Kumar"
          age="40"
          gender="Male"
          ward="General Ward - 1 / 103"
          diagnosis="Fever"
        />

        <PatientCard
          name="Chalasani"
          age="50"
          gender="Male"
          ward="General Ward - 1 / 104"
          diagnosis="Cold & Cough"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function PatientCard({
  name,
  age,
  gender,
  ward,
  diagnosis,
}: any) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.avatar}>
        <Text style={{ fontSize: 20 }}>👤</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.meta}>
          {age} Y / {gender}
        </Text>

        <Text style={styles.meta}>
          {ward}
        </Text>

        <Text style={styles.diagnosis}>
          {diagnosis}
        </Text>
      </View>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
  },

  content: {
    paddingTop: 35,
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

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  icon: {
    color: '#FFFFFF',
    fontSize: 22,
  },

  searchContainer: {
    padding: 14,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  meta: {
    color: '#64748B',
    marginTop: 2,
    fontSize: 13,
  },

  diagnosis: {
    color: '#334155',
    marginTop: 4,
    fontSize: 13,
  },

  arrow: {
    fontSize: 28,
    color: '#94A3B8',
  },
});
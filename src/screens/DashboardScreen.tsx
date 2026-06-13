import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Top Bar */}

        <View style={styles.topBar}>
          <Text style={styles.icon}>☰</Text>

          <Text style={styles.topBarTitle}>
            Dashboard
          </Text>

          <Text style={styles.icon}>🔔</Text>
        </View>

        {/* Greeting */}

        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.goodMorning}>
              Good Morning,
            </Text>

            <Text style={styles.userName}>
              Nursing Head 👋
            </Text>

            <Text style={styles.hospital}>
              Udumula Hospitals
            </Text>
          </View>

          <View style={styles.dateChip}>
            <Text style={styles.dateText}>
              14 May 2025
            </Text>
          </View>
        </View>

        {/* Overview */}

        <Text style={styles.sectionTitle}>
          Today's Overview
        </Text>

        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Patients Admitted
            </Text>

            <Text style={styles.kpiValue}>
              18
            </Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Pending Tasks
            </Text>

            <Text style={styles.kpiValue}>
              24
            </Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Overdue Tasks
            </Text>

            <Text style={styles.kpiValueDanger}>
              3
            </Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>
              Completed Tasks
            </Text>

            <Text style={styles.kpiValueSuccess}>
              12
            </Text>
          </View>
        </View>

        {/* Compliance */}

        <Text style={styles.sectionTitle}>
          Compliance Score (Overall)
        </Text>

        <View style={styles.complianceCard}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>
              92%
            </Text>
          </View>

          <View style={styles.complianceInfo}>
            <Text style={styles.complianceTitle}>
              NABH Compliance
            </Text>

            <Text style={styles.complianceStatus}>
              Excellent
            </Text>

            <Text style={styles.complianceTime}>
              Last updated: 10:30 AM
            </Text>
          </View>
        </View>

        {/* Critical Alerts */}

        <Text style={styles.sectionTitle}>
          Critical Alerts
        </Text>

        <TouchableOpacity style={styles.alertCard}>
          <View>
            <Text style={styles.alertTitle}>
              3 tasks are overdue
            </Text>

            <Text style={styles.alertSubtitle}>
              Please take immediate action
            </Text>
          </View>

          <Text style={styles.alertArrow}>
            ›
          </Text>
        </TouchableOpacity>
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
    fontSize: 20,
  },

  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 20,
    alignItems: 'flex-start',
  },

  goodMorning: {
    color: '#64748B',
    fontSize: 14,
  },

  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 4,
  },

  hospital: {
    color: '#475569',
    marginTop: 4,
  },

  dateChip: {
    backgroundColor: '#EFE7D6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  dateText: {
    color: '#6B7280',
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginHorizontal: 18,
    marginTop: 22,
    marginBottom: 12,
  },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  kpiCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  kpiLabel: {
    fontSize: 12,
    color: '#64748B',
  },

  kpiValue: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: '#1E293B',
  },

  kpiValueDanger: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: '#DC2626',
  },

  kpiValueSuccess: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: '#16A34A',
  },

  complianceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: '#C89B3C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },

  complianceInfo: {
    marginLeft: 18,
  },

  complianceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  complianceStatus: {
    color: '#16A34A',
    fontWeight: '600',
    marginTop: 4,
  },

  complianceTime: {
    color: '#64748B',
    marginTop: 8,
    fontSize: 12,
  },

  alertCard: {
    backgroundColor: '#FFF8F0',
    marginHorizontal: 18,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0D6C0',
  },

  alertTitle: {
    color: '#991B1B',
    fontWeight: '700',
  },

  alertSubtitle: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 12,
  },

  alertArrow: {
    fontSize: 28,
    color: '#C89B3C',
  },
});
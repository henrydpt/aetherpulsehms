import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ComplianceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.icon}>‹</Text>

          <Text style={styles.topBarTitle}>
            NABH Compliance
          </Text>

          <View style={{ width: 20 }} />
        </View>

        <View style={styles.grid}>
          <ComplianceCard
            chapter="FMS"
            percent="28%"
            completed="7/25 Completed"
          />

          <ComplianceCard
            chapter="COP"
            percent="12%"
            completed="6/49 Completed"
          />

          <ComplianceCard
            chapter="HIC"
            percent="18%"
            completed="2/11 Completed"
          />

          <ComplianceCard
            chapter="AAC"
            percent="0%"
            completed="0/6 Completed"
          />

          <ComplianceCard
            chapter="MOM"
            percent="25%"
            completed="2/8 Completed"
          />

          <ComplianceCard
            chapter="HRM"
            percent="33%"
            completed="2/6 Completed"
          />
        </View>

        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportText}>
            View Detailed Compliance Report
          </Text>

          <Text style={styles.arrow}>
            ›
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ComplianceCard({
  chapter,
  percent,
  completed,
}: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.chapter}>
        {chapter}
      </Text>

      <Text style={styles.percent}>
        {percent}
      </Text>

      <Text style={styles.completed}>
        {completed}
      </Text>

      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>
    </View>
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
    fontSize: 24,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 14,
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  chapter: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },

  percent: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '700',
    color: '#234A7A',
  },

  completed: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748B',
  },

  progressTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginTop: 12,
    overflow: 'hidden',
  },

  progressFill: {
    width: '35%',
    height: 6,
    backgroundColor: '#C89B3C',
  },

  reportButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEE7D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reportText: {
    fontWeight: '600',
    color: '#1E293B',
  },

  arrow: {
    fontSize: 24,
    color: '#64748B',
  },
});
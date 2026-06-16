import React from 'react';
import { useTaskStore } from '../store/taskStore';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { usePatientStore } from '../store/patientStore';
import { COLORS } from '../theme/colors';
export default function ComplianceScreen() {
    const tasks = useTaskStore(
  (state) => state.tasks
);
const patientCount = usePatientStore(
  (state) => state.patients.length
);
const completedTasks =
  tasks.filter(
    (task) =>
      task.status ===
      'COMPLETED'
  ).length;

const pendingTasks =
  tasks.filter(
    (task) =>
      task.status ===
      'PENDING'
  ).length;

const overdueTasks =
  tasks.filter(
    (task) =>
      task.status !==
        'COMPLETED' &&
      task.dueDate &&
      task.dueTime &&
      new Date(
        `${task.dueDate} ${task.dueTime}`
      ) < new Date()
  ).length;

const compliancePercent =

  tasks.length > 0
    ? Math.round(
        (completedTasks /
          tasks.length) *
          100
      )
    : 0;
const inProgressTasks =
  tasks.filter(
    (task) =>
      task.status ===
      'IN_PROGRESS'
  ).length;
const adminTasks =
  tasks.filter(
    (task) =>
      task.taskCategory === 'ADMIN'
  );

const nursingTasks =
  tasks.filter(
    (task) =>
      task.taskCategory === 'PATIENT'
  );

const adminCompleted =
  adminTasks.filter(
    (task) =>
      task.status === 'COMPLETED'
  ).length;

const nursingCompleted =
  nursingTasks.filter(
    (task) =>
      task.status === 'COMPLETED'
  ).length;

const adminInProgress =
  adminTasks.filter(
    (task) =>
      task.status === 'IN_PROGRESS'
  ).length;

const nursingInProgress =
  nursingTasks.filter(
    (task) =>
      task.status === 'IN_PROGRESS'
  ).length;
  const adminPending =
  adminTasks.filter(
    (task) =>
      task.status === 'PENDING'
  ).length;

const nursingPending =
  nursingTasks.filter(
    (task) =>
      task.status === 'PENDING'
  ).length;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <View style={{ width: 20 }} />

          <Text style={styles.topBarTitle}>
            Analytics
          </Text>

          <View style={{ width: 20 }} />
        </View>
<Text style={styles.sectionTitle}>
  Task Funnel
</Text>

<View style={styles.analyticsCard}>
<Text style={styles.funnelLabel}>
  ADMIN TASKS ({adminTasks.length})
</Text>

<Text style={styles.funnelLabel}>
  Pending ({adminPending})
</Text>

<View style={styles.barTrack}>
  <View
    style={[
      styles.barFill,
      {
        width:
          adminTasks.length > 0
            ? `${Math.round(
                (adminPending /
                  adminTasks.length) *
                  100
              )}%`
            : '0%',
      },
    ]}
  />
</View>

<Text style={styles.funnelLabel}>
  Completed ({adminCompleted})
</Text>

<View style={styles.barTrack}>
  <View
    style={[
      styles.barFill,
      {
        width:
          adminTasks.length > 0
            ? `${Math.round(
                (adminCompleted /
                  adminTasks.length) *
                  100
              )}%`
            : '0%',
      },
    ]}
  />
</View>

<Text
  style={[
    styles.funnelLabel,
    { marginTop: 24 },
  ]}
>
  NURSING TASKS ({nursingTasks.length})
</Text>

<Text style={styles.funnelLabel}>
  Pending ({nursingPending})
</Text>

<View style={styles.barTrack}>
  <View
    style={[
      styles.barFill,
      {
        width:
          nursingTasks.length > 0
            ? `${Math.round(
                (nursingPending /
                  nursingTasks.length) *
                  100
              )}%`
            : '0%',
      },
    ]}
  />
</View>

<Text style={styles.funnelLabel}>
  Completed ({nursingCompleted})
</Text>

<View style={styles.barTrack}>
  <View
    style={[
      styles.barFill,
      {
        width:
          nursingTasks.length > 0
            ? `${Math.round(
                (nursingCompleted /
                  nursingTasks.length) *
                  100
              )}%`
            : '0%',
      },
    ]}
  />
</View>
</View>
<Text style={styles.sectionTitle}>
  Task Distribution
</Text>

<View style={styles.analyticsCard}>
  <Text style={styles.funnelLabel}>
    Insights will be available once
    sufficient task categorization
    data is collected.
  </Text>
</View>

<Text style={styles.sectionTitle}>
  Weekly Trends
</Text>

<View style={styles.analyticsCard}>
  <Text style={styles.funnelLabel}>
    Historical trend analysis will
    be available after multiple
    weeks of operational data.
  </Text>
</View>
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
  paddingBottom: 100,
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
sectionTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#1E293B',
  marginHorizontal: 16,
  marginTop: 20,
  marginBottom: 12,
},

analyticsCard: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  padding: 14,
  borderRadius: 20,

  shadowColor: '#4338CA',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  elevation: 3,
},

funnelLabel: {
  fontSize: 13,
  fontWeight: '600',
  color: '#475569',
  marginBottom: 4,
  marginTop: 8,
},

barTrack: {
  height: 12,
  backgroundColor: '#E2E8F0',
  borderRadius: 999,
  overflow: 'hidden',
},

barFill: {
  height: 12,
  backgroundColor: '#4338CA',
  borderRadius: 999,
},
  icon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
statusCard: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 14,
  marginTop: 14,
  padding: 18,
  borderRadius: 18,
  borderWidth: 1,
borderColor: '#E2E8F0',

shadowColor: '#4338CA',
shadowOpacity: 0.08,
shadowRadius: 10,
shadowOffset: {
  width: 0,
  height: 4,
},
elevation: 3,
},

statusLabel: {
  color: '#64748B',
  fontSize: 12,
  fontWeight: '600',
},

statusTitle: {
  marginTop: 8,
  fontSize: 22,
  fontWeight: '700',
},

statusPercent: {
  marginTop: 6,
  color: '#475569',
  fontSize: 14,
},

summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 18,
},

summaryItem: {
  flex: 1,
  alignItems: 'center',
},

summaryValue: {
  fontSize: 28,
  fontWeight: '700',
  color: '#4338CA',
},

summaryLabel: {
  marginTop: 4,
  fontSize: 12,
  color: '#64748B',
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
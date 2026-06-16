import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { usePatientStore } from '../store/patientStore';
import { useTaskStore } from '../store/taskStore';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/colors';
export default function DashboardScreen() {
const navigation = useNavigation<any>();

const tasks = useTaskStore(
  (state) => state.tasks
);

const patientCount = usePatientStore(
  (state) => state.patients.length
);

const pendingTasks =
  tasks.filter(
    (task) =>
      task.status ===
      'PENDING'
  ).length;

const completedTasks =
  tasks.filter(
    (task) =>
      task.status ===
      'COMPLETED'
  ).length;

const overdueTasks =
  tasks.filter((task) => {
    if (
      task.status ===
      'COMPLETED'
    ) {
      return false;
    }

    if (
      !task.dueDate ||
      !task.dueTime
    ) {
      return false;
    }

    return (
      new Date(
        `${task.dueDate} ${task.dueTime}`
      ) < new Date()
    );
  }).length;

const highPriorityTasks =
  tasks.filter(
    (task) =>
      task.priority ===
      'HIGH'
  ).length;
  const currentHour =
  new Date().getHours();

const greeting =
  currentHour < 12
    ? 'Good Morning'
    : currentHour < 17
    ? 'Good Afternoon'
    : 'Good Evening';
  return (
      <SafeAreaView style={styles.container}>
    <StatusBar
      backgroundColor={COLORS.primary}
      barStyle="light-content"
    />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Top Bar */}

<View style={styles.topBar}>
  <View />

  <Text style={styles.topBarTitle}>
    Udumula Hospitals Dashboard
  </Text>

  <View style={{ width: 20 }} />
</View>

        {/* Greeting */}

        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.goodMorning}>
              {greeting},
            </Text>

            <Text style={styles.userName}>
              Nursing Head
            </Text>
          </View>

          <View style={styles.dateChip}>
            <Text style={styles.dateText}>
  {new Date().toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  )}
</Text>
          </View>
        </View>

        {/* Overview */}

        <Text style={styles.sectionTitle}>
          Today's Overview
        </Text>

        <View style={styles.kpiGrid}>
          <TouchableOpacity
  style={[
  styles.kpiCard,
  styles.activeCard,
]}
  onPress={() =>
    navigation.navigate('Patients')
  }
>
            <Text style={styles.kpiLabel}>
  👥 Active Patients
</Text>

            <Text style={styles.kpiValue}>
              {patientCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={[
  styles.kpiCard,
  styles.pendingCard,
]}
  onPress={() =>
    navigation.navigate(
  'Tasks',
  {
    initialFilter:
      'PENDING',
  }
)
  }
>
            <Text style={styles.kpiLabel}>
              📋 Pending Tasks
            </Text>

            <Text style={styles.kpiValue}>
              {pendingTasks}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={[
  styles.kpiCard,
  styles.overdueCard,
]}
  onPress={() =>
navigation.navigate(
  'Tasks',
  {
    initialFilter:
      'OVERDUE',
  }
)
  }
>
            <Text style={styles.kpiLabel}>
              ⚠️ Overdue Tasks
            </Text>

            <Text style={styles.kpiValueDanger}>
  {overdueTasks}
</Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={[
  styles.kpiCard,
  styles.completedCard,
]}
  onPress={() =>
    navigation.navigate(
  'Tasks',
  {
    initialFilter:
      'COMPLETED',
  }
)
  }
>
            <Text style={styles.kpiLabel}>
              ✅ Completed Tasks
            </Text>

            <Text style={styles.kpiValueSuccess}>
  {completedTasks}
</Text>
          </TouchableOpacity>

<TouchableOpacity
  style={[
  styles.kpiCard,
  styles.priorityCard,
]}
  onPress={() =>
    navigation.navigate(
  'Tasks'
)
  }
>
  <Text style={styles.kpiLabel}>
    ⭐ High Priority
  </Text>

  <Text style={styles.kpiValueDanger}>
    {highPriorityTasks}
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
  styles.kpiCard,
  styles.complianceAccentCard,
]}
  onPress={() =>
    navigation.navigate('Compliance')
  }
>
  <Text style={styles.kpiLabel}>
    🛡️ Compliance %
  </Text>

  <Text style={styles.kpiValueSuccess}>
    {tasks.length > 0
      ? Math.round(
          (completedTasks /
            tasks.length) *
            100
        )
      : 0}
    %
  </Text>
</TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingBottom: 20,
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
    backgroundColor: COLORS.indigoLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  dateText: {
    color: COLORS.primary,
fontWeight: '600'
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
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
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEF2FF',
    shadowColor: '#4338CA',
shadowOpacity: 0.08,
shadowRadius: 10,
shadowOffset: {
  width: 0,
  height: 4,
},
elevation: 3,
  },
activeCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#4F46E5',
},

pendingCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#14B8A6',
},

overdueCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#EF4444',
},

completedCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#22C55E',
},

priorityCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#F59E0B',
},

complianceAccentCard: {
  borderLeftWidth: 4,
  borderLeftColor: '#06B6D4',
},
  kpiLabel: {
    fontSize: 12,
    color: COLORS.primary,
  },

  kpiValue: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
  },

  kpiValueDanger: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.danger,
  },

  kpiValueSuccess: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.success,
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
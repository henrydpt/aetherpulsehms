import React from 'react';
import { useAuthStore } from '../store/authStore';
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
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { taskTemplates } from '../data/taskTemplates';
import { testWardLoad } from '../services/testWardService';
import { getHospitalStats } from '../services/hospitalStatsService';
export default function DashboardScreen() {
const navigation = useNavigation<any>();
const role = useAuthStore(
  (state) => state.role
);
const displayName =
  useAuthStore(
    (state) => state.userName
  );
const tasks = useTaskStore(
  (state) => state.tasks
);

const patients = usePatientStore(
  (state) => state.patients
);

const userName = useAuthStore(
  (state) => state.userName
);
useEffect(() => {
  async function loadData() {
    testWardLoad();

    const stats =
      await getHospitalStats();

    console.log(
      'HMS STATS',
      stats
    );
  }

  loadData();
}, []);
const visiblePatients =
  role === 'Doctor'
    ? patients.filter(
        (patient) =>
          patient.doctorAssigned ===
          userName
      )
    : patients;

const patientCount =
  visiblePatients.length;
const doctorPatientIds =
  visiblePatients.map(
    (patient) => patient.id
  );

const visibleTasks =
  role === 'Doctor'
    ? tasks.filter(
        (task) =>
          doctorPatientIds.includes(
            task.patientId
          )
      )
    : role === 'Executive'
    ? tasks.filter(
        (task) =>
          task.assigned ===
          userName
      )
    : tasks;

const pendingTasks =
  visibleTasks.filter(
    (task) =>
      task.status ===
      'PENDING'
  ).length;

const completedTasks =
  visibleTasks.filter(
    (task) =>
      task.status ===
      'COMPLETED'
  ).length;
const parseTaskDateTime = (task: any) => {
  if (!task.dueDate || !task.dueTime) {
    return null;
  }

  const [time, period] =
    task.dueTime.split(' ');

  let [hours, minutes] =
    time.split(':').map(Number);

  if (
    period === 'PM' &&
    hours !== 12
  ) {
    hours += 12;
  }

  if (
    period === 'AM' &&
    hours === 12
  ) {
    hours = 0;
  }

  const dueDateTime =
    new Date(task.dueDate);

  dueDateTime.setHours(
    hours,
    minutes,
    0,
    0
  );

  return dueDateTime;
};
const overdueTasks =
  visibleTasks.filter((task) => {
    if (
      task.status ===
      'COMPLETED'
    ) {
      return false;
    }

    const dueDateTime =
      parseTaskDateTime(task);

    if (!dueDateTime) {
      return false;
    }

    return (
      dueDateTime <
      new Date()
    );
  }).length;

const escalatedTasks =
  visibleTasks.filter((task) => {
    if (
      task.status ===
      'COMPLETED'
    ) {
      return false;
    }

    const dueDateTime =
      parseTaskDateTime(task);

    if (!dueDateTime) {
      return false;
    }

    const escalationTime =
      new Date(
        dueDateTime.getTime() +
        (task.escalationMinutes || 0) *
          60 *
          1000
      );

    return (
      escalationTime <
      new Date()
    );
  }).length;
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
          <View style={styles.greetingLeft}>
            <Text style={styles.goodMorning}>
              {greeting},
            </Text>

<Text style={styles.userName}>
  {displayName}
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
<TouchableOpacity
  style={styles.attentionCard}
  onPress={() =>
    navigation.navigate(
      'Admissions'
    )
  }
>
  <Text style={styles.attentionTitle}>
    HMS Admissions
  </Text>

  <Text style={styles.attentionItem}>
    View Admissions Module
  </Text>
</TouchableOpacity>
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
<View style={styles.kpiHeader}>
  <Ionicons
    name="people"
    size={16}
    color="#4F46E5"
  />
  <Text style={styles.kpiLabel}>
    Active Patients
  </Text>
</View>

            <Text style={styles.kpiValueActive}>
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
<View style={styles.kpiHeader}>
  <Ionicons
    name="clipboard"
    size={16}
    color="#14B8A6"
  />
  <Text style={styles.kpiLabel}>
    Pending Tasks
  </Text>
</View>

            <Text style={styles.kpiValuePending}>
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
<View style={styles.kpiHeader}>
  <Ionicons
    name="warning"
    size={16}
    color="#EF4444"
  />
  <Text style={styles.kpiLabel}>
    Overdue Tasks
  </Text>
</View>

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
<View style={styles.kpiHeader}>
  <Ionicons
    name="checkmark-circle"
    size={16}
    color="#22C55E"
  />
  <Text style={styles.kpiLabel}>
    Completed Tasks
  </Text>
</View>

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
    'Tasks',
    {
      initialFilter:
  'ESCALATED',
    }
  )
}
>
<View style={styles.kpiHeader}>
<Ionicons
  name="star"
  size={16}
  color="#EF4444"
/>
  <Text style={styles.kpiLabel}>
    Escalated Tasks
  </Text>
</View>

  <Text style={styles.kpiValuePriority}>
    {escalatedTasks}
  </Text>
</TouchableOpacity>
{role !== 'Doctor' && (
<TouchableOpacity
  style={[
  styles.kpiCard,
  styles.complianceAccentCard,
]}
  onPress={() =>
    navigation.navigate('Analytics')
  }
>
<View style={styles.kpiHeader}>
  <Ionicons
    name="shield-checkmark"
    size={16}
    color="#06B6D4"
  />
  <Text style={styles.kpiLabel}>
    Compliance %
  </Text>
</View>

  <Text style={styles.kpiValueCompliance}>
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
)}
        </View>
<View style={styles.attentionCard}>
  <Text style={styles.attentionTitle}>
    Attention Required
  </Text>

  <Text style={styles.attentionItem}>
    ⚠ {overdueTasks} overdue tasks require attention
  </Text>

  <Text style={styles.attentionItem}>
    📋 {pendingTasks} tasks pending completion
  </Text>

  <Text style={styles.attentionItem}>
    🚨 {escalatedTasks} escalated tasks require attention
  </Text>
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

greetingLeft: {
  flex: 1,
  paddingRight: 10,
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
    marginTop: 12,
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
attentionCard: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 18,
  marginTop: 8,
  padding: 18,
  borderRadius: 18,
  borderLeftWidth: 4,
  borderLeftColor: '#F59E0B',

  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  elevation: 2,
},

attentionTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: COLORS.text,
  marginBottom: 12,
},

attentionItem: {
  fontSize: 14,
  color: '#475569',
  marginBottom: 8,
},
  kpiLabel: {
    fontSize: 12,
    marginLeft: 6,
    color: COLORS.primary,
  },
kpiHeader: {
  flexDirection: 'row',
  alignItems: 'center',
},
  kpiValue: {
    marginTop: 12,
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
  },
kpiValueActive: {
  marginTop: 12,
  fontSize: 30,
  fontWeight: '700',
  color: '#4F46E5',
},

kpiValuePending: {
  marginTop: 12,
  fontSize: 30,
  fontWeight: '700',
  color: '#14B8A6',
},

kpiValuePriority: {
  marginTop: 12,
  fontSize: 30,
  fontWeight: '700',
  color: '#F59E0B',
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
kpiValueCompliance: {
  marginTop: 12,
  fontSize: 30,
  fontWeight: '700',
  color: '#06B6D4',
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
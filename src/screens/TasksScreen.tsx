import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TaskCard from '../components/tasks/TaskCard';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../store/taskStore';
export default function TasksScreen() {
const navigation = useNavigation<any>();

const tasks = useTaskStore(
  (state) => state.tasks
);
const [activeFilter, setActiveFilter] =
  useState('ALL');

const isOverdue = (task: any) => {
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

  const dueDateTime =
    new Date(
      `${task.dueDate} ${task.dueTime}`
    );
console.log(
  'OVERDUE CHECK',
  task.title,
  task.dueDate,
  task.dueTime,
  dueDateTime
);
  return (
    dueDateTime <
    new Date()
  );
};

const filteredTasks =
  tasks.filter((task) => {
    if (activeFilter === 'ALL') {
      return true;
    }

    if (
      activeFilter ===
      'PENDING'
    ) {
      return (
        task.status ===
          'PENDING' &&
        !isOverdue(task)
      );
    }

    if (
      activeFilter ===
      'COMPLETED'
    ) {
      return (
        task.status ===
        'COMPLETED'
      );
    }

    if (
      activeFilter ===
      'OVERDUE'
    ) {
      return isOverdue(task);
    }

    return true;
  });

const adminTasks =
  filteredTasks.filter(
    (task) =>
      task.taskCategory ===
      'ADMIN'
  );

const patientTasks =
  filteredTasks.filter(
    (task) =>
      task.taskCategory ===
      'PATIENT'
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.icon}>☰</Text>

          <Text style={styles.topBarTitle}>
            My Tasks
          </Text>

<TouchableOpacity
  onPress={() =>
    navigation.navigate('CreateTask')
  }
>
  <Text style={styles.icon}>＋</Text>
</TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
<TouchableOpacity
  onPress={() =>
    setActiveFilter('ALL')
  }
>
  <Text
    style={
      activeFilter === 'ALL'
        ? styles.activeFilter
        : styles.filter
    }
  >
    All
  </Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() =>
    setActiveFilter('PENDING')
  }
>
  <Text
    style={
      activeFilter === 'PENDING'
        ? styles.activeFilter
        : styles.filter
    }
  >
    Pending
  </Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() =>
    setActiveFilter('COMPLETED')
  }
>
  <Text
    style={
      activeFilter ===
      'COMPLETED'
        ? styles.activeFilter
        : styles.filter
    }
  >
    Completed
  </Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() =>
    setActiveFilter('OVERDUE')
  }
>
  <Text
    style={
      activeFilter ===
      'OVERDUE'
        ? styles.activeFilter
        : styles.filter
    }
  >
    Overdue
  </Text>
</TouchableOpacity>
        </View>

<Text style={styles.sectionHeading}>
  ADMIN TASKS
</Text>

{adminTasks.map((task, index) => (
<TaskCard
  key={`admin-${index}`}
  status={task.status}
  statusColor={task.statusColor}
  title={task.title}
  location={task.location}
  due={task.due}
  assigned={task.assigned}
  priority={task.priority}
  dueDate={task.dueDate}
  dueTime={task.dueTime}
  escalationMinutes={
    task.escalationMinutes
  }
  dueText={task.dueText}
    onPress={() =>
      navigation.navigate('TaskDetail', {
        task,
      })
    }
  />
))}

<Text style={styles.sectionHeading}>
  PATIENT CARE TASKS
</Text>

{patientTasks.map((task, index) => (
<TaskCard
  key={`patient-${index}`}
  status={task.status}
  statusColor={task.statusColor}
  title={`${task.patientName} - ${task.title}`}
  location={task.location}
  due={task.due}
  assigned={task.assigned}
  priority={task.priority}
  dueDate={task.dueDate}
  dueTime={task.dueTime}
  escalationMinutes={
    task.escalationMinutes
  }
  dueText={task.dueText}
    onPress={() =>
      navigation.navigate('TaskDetail', {
        task,
      })
    }
  />
))}
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

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },

  activeFilter: {
    color: '#234A7A',
    fontWeight: '700',
  },

  filter: {
    color: '#64748B',
    fontSize: 12,
  },
sectionHeading: {
  marginTop: 20,
  marginBottom: 8,
  marginHorizontal: 14,
  color: '#234A7A',
  fontSize: 14,
  fontWeight: '700',
  letterSpacing: 0.5,
},
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  dueText: {
    fontSize: 11,
    fontWeight: '600',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    color: '#1E293B',
  },

  meta: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 13,
  },

  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  assignedLabel: {
    color: '#94A3B8',
    fontSize: 11,
  },

  assignedName: {
    color: '#1E293B',
    fontWeight: '600',
  },
});
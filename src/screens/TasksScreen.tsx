import React from 'react';
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
export default function TasksScreen() {
    const navigation = useNavigation<any>();
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

          <Text style={styles.icon}>⌕</Text>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.activeFilter}>All</Text>
          <Text style={styles.filter}>Pending</Text>
          <Text style={styles.filter}>In Progress</Text>
          <Text style={styles.filter}>Completed</Text>
          <Text style={styles.filter}>Overdue</Text>
        </View>

        <TaskCard
          status="OVERDUE"
          statusColor="#DC2626"
          title="Vital Signs Monitoring"
          location="General Ward - 2"
          due="02:00 PM"
          assigned="Nurse Lakshmi"
          dueText="1h 45m"
onPress={() =>
  navigation.navigate('TaskDetail', {
    task: {
      status: 'OVERDUE',
      title: 'Vital Signs Monitoring',
      location: 'General Ward - 2',
      due: '02:00 PM',
      assigned: 'Nurse Lakshmi',
    },
  })
}
        />

        <TaskCard
          status="PENDING"
          statusColor="#D97706"
          title="Crash Cart / Drug Inventory Check"
          location="Emergency"
          due="11:00 AM"
          assigned="Nurse Priya"
          dueText="Due in 30m"
        />

        <TaskCard
          status="PENDING"
          statusColor="#D97706"
          title="OT Linen Sterilization Check"
          location="Operation Theatre"
          due="02:00 PM"
          assigned="Staff Ramesh"
          dueText="Due in 1h 30m"
        />

        <TaskCard
          status="IN PROGRESS"
          statusColor="#2563EB"
          title="Medical Gas Supply Check"
          location="OT"
          due="Started 10:15 AM"
          assigned="Suresh"
          dueText=""
        />
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
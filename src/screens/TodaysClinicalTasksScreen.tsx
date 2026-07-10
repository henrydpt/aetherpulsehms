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
  TouchableOpacity,
} from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  getPatientTasks,
} from '../services/patientTaskQueryService';
export default function TodaysClinicalTasksScreen() {

  const route = useRoute<any>();
const navigation =
  useNavigation<any>();
  const admission =
    route.params?.admission;
const [
  tasks,
  setTasks,
] = useState<any[]>([]);
useEffect(() => {
  loadTasks();
}, []);

async function loadTasks() {

  const data =
    await getPatientTasks(
      admission.patient_id
    );

  setTasks(data);

}
  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Today's Clinical Tasks
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
  }}
>
  Patient Summary
</Text>

<Text
  style={{
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
  }}
>
  {admission?.patientName}
</Text>

<Text style={{ marginTop: 6 }}>
  Admission No: {admission?.admission_number}
</Text>

<Text>
  Ward: {admission?.wardName}
</Text>

<Text>
  Bed: {admission?.bedNumber}
</Text>

</View>
<View
  style={{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
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
    Today's Tasks
  </Text>

  {tasks.length === 0 ? (

    <Text
      style={{
        color: '#64748B',
      }}
    >
      No clinical tasks for today.
    </Text>

  ) : (

    tasks.map((task) => (

<TouchableOpacity
  key={task.id}
  onPress={() =>
    navigation.navigate(
      'TaskDetail',
      {
        task,
      }
    )
  }
  style={{
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
    paddingVertical: 12,
  }}
>

        <Text
          style={{
            fontWeight: '700',
          }}
        >
          {task.title}
        </Text>

        <Text
          style={{
            marginTop: 4,
            color: '#64748B',
          }}
        >
          {task.taskCategory}
        </Text>

<Text
  style={{
    marginTop: 2,
    color: '#64748B',
  }}
>
  {new Date(task.dueDate)
  .toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  )
  .replace(/ /g, '-')} • {task.dueTime}
</Text>

<Text
  style={{
    marginTop: 2,
    color: '#64748B',
  }}
>
  {task.status}
</Text>

</TouchableOpacity>

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
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { taskTemplates } from '../data/taskTemplates';
import { usePatientStore } from '../store/patientStore';
import { useTaskStore } from '../store/taskStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../theme/colors';
export default function CreateTaskScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

const editTask =
  route.params?.task;

const isEditMode =
  !!editTask;
  const [taskCategory, setTaskCategory] =
  useState('ADMIN');
  const [taskSource, setTaskSource] =
  useState('TEMPLATE');
  const patients = usePatientStore(
  (state) => state.patients
);
const addTask = useTaskStore(
  (state) => state.addTask
);

const updateTask = useTaskStore(
  (state) => state.updateTask
);
const [selectedPatientId, setSelectedPatientId] =
  useState('');

const [selectedTemplateId, setSelectedTemplateId] =
  useState('');
const [taskName, setTaskName] =
  useState(
    editTask?.title || ''
  );

const [dueDate, setDueDate] =
  useState(
    editTask?.dueDate || ''
  );

const [dueTime, setDueTime] =
  useState(
    editTask?.dueTime || ''
  );

const [priority, setPriority] =
  useState(
    editTask?.priority ||
      'MEDIUM'
  );

const [escalationMinutes, setEscalationMinutes] =
  useState(
    editTask?.escalationMinutes
      ?.toString() || '30'
  );

const [showDatePicker, setShowDatePicker] =
  useState(false);

const [showTimePicker, setShowTimePicker] =
  useState(false);

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
        <View style={styles.topBar}>
        <View style={{ width: 24 }} />

          <Text style={styles.topBarTitle}>
            Create Task
          </Text>

          <View style={{ width: 20 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Task Category
          </Text>

          <TouchableOpacity
  style={[
    styles.option,
    taskCategory === 'ADMIN' &&
      styles.selectedOption,
  ]}
  onPress={() =>
    setTaskCategory('ADMIN')
  }
>
  <Text style={styles.optionText}>
    Administrative Task
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.option,
    taskCategory === 'PATIENT' &&
      styles.selectedOption,
  ]}
  onPress={() =>
    setTaskCategory('PATIENT')
  }
>
  <Text style={styles.optionText}>
    Patient Care Task
  </Text>
</TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Task Source
          </Text>

<TouchableOpacity
  style={[
    styles.option,
    taskSource === 'TEMPLATE' &&
      styles.selectedOption,
  ]}
  onPress={() =>
    setTaskSource('TEMPLATE')
  }
>
  <Text style={styles.optionText}>
    Use Template
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.option,
    taskSource === 'CUSTOM' &&
      styles.selectedOption,
  ]}
  onPress={() =>
    setTaskSource('CUSTOM')
  }
>
  <Text style={styles.optionText}>
    Custom Task
  </Text>
</TouchableOpacity>
        </View>
{taskSource === 'TEMPLATE' &&
  taskCategory === 'ADMIN' && (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Available Templates
      </Text>

      {taskTemplates
        .filter(
          (template) =>
            template.category === 'ADMIN'
        )
        .map((template) => (
<TouchableOpacity
  key={template.id}
  style={[
    styles.option,
    selectedTemplateId ===
      template.id &&
      styles.selectedOption,
  ]}
  onPress={() =>
    setSelectedTemplateId(
      template.id
    )
  }
>
            <Text style={styles.optionText}>
              {template.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
)}

{taskSource === 'TEMPLATE' &&
  taskCategory === 'PATIENT' && (
    <>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Select Patient
        </Text>

{patients.map((patient) => (
  <TouchableOpacity
    key={patient.id}
    style={[
      styles.option,
      selectedPatientId === patient.id &&
        styles.selectedOption,
    ]}
    onPress={() =>
      setSelectedPatientId(patient.id)
    }
  >
            <Text style={styles.optionText}>
              {patient.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Available Templates
        </Text>

        {taskTemplates
          .filter(
            (template) =>
              template.category ===
              'NURSING'
          )
          .map((template) => (
<TouchableOpacity
  key={template.id}
  style={[
    styles.option,
    selectedTemplateId ===
      template.id &&
      styles.selectedOption,
  ]}
  onPress={() =>
    setSelectedTemplateId(
      template.id
    )
  }
>
              <Text style={styles.optionText}>
                {template.name}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </>
)}

{taskSource === 'CUSTOM' && (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>
      Custom Task
    </Text>

    <Text style={styles.optionText}>
      Task Name
    </Text>

    <Text style={styles.optionText}>
      Description
    </Text>

    <Text style={styles.optionText}>
      Assigned To
    </Text>

    <Text style={styles.optionText}>
      Due Date / Time
    </Text>
  </View>
)}
<View style={styles.card}>
  <Text style={styles.sectionTitle}>
    Task Details
  </Text>

  <TextInput
    placeholder="Task Name"
    value={taskName}
    onChangeText={setTaskName}
    style={styles.input}
  />

<TouchableOpacity
  style={styles.input}
  onPress={() =>
    setShowDatePicker(true)
  }
>
  <Text>
    {dueDate || 'Select Due Date'}
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.input}
  onPress={() =>
    setShowTimePicker(true)
  }
>
  <Text>
    {dueTime || 'Select Due Time'}
  </Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    onChange={(
      event,
      selectedDate
    ) => {
      setShowDatePicker(false);

      if (selectedDate) {
       setDueDate(
  selectedDate
    .toISOString()
    .split('T')[0]
);
      }
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={new Date()}
    mode="time"
    onChange={(
      event,
      selectedTime
    ) => {
      setShowTimePicker(false);

      if (selectedTime) {
        setDueTime(
selectedTime
  .toLocaleTimeString(
    'en-GB',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
  )
        );
      }
    }}
  />
)}

  <Text
    style={{
      marginTop: 10,
      marginBottom: 8,
      fontWeight: '700',
      color: '#234A7A',
    }}
  >
    Priority
  </Text>

  <View
    style={{
      flexDirection: 'row',
      gap: 8,
    }}
  >
    {['LOW', 'MEDIUM', 'HIGH'].map(
      (value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.option,
            {
              flex: 1,
              marginTop: 0,
            },
            priority === value &&
              styles.selectedOption,
          ]}
          onPress={() =>
            setPriority(value)
          }
        >
          <Text
            style={styles.optionText}
          >
            {value}
          </Text>
        </TouchableOpacity>
      )
    )}
  </View>

  <Text
    style={{
      marginTop: 16,
      marginBottom: 8,
      fontWeight: '700',
      color: '#234A7A',
    }}
  >
    Escalation (Minutes)
  </Text>

  <View
    style={{
      flexDirection: 'row',
      gap: 8,
    }}
  >
    {['15', '30', '60', '120'].map(
      (value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.option,
            {
              flex: 1,
              marginTop: 0,
            },
            escalationMinutes ===
              value &&
              styles.selectedOption,
          ]}
          onPress={() =>
            setEscalationMinutes(
              value
            )
          }
        >
          <Text
            style={styles.optionText}
          >
            {value}
          </Text>
        </TouchableOpacity>
      )
    )}
  </View>
</View>
<TouchableOpacity
  style={styles.button}
  onPress={() => {
    const selectedTemplate =
      taskTemplates.find(
        (template) =>
          template.id ===
          selectedTemplateId
      );

    const selectedPatient =
      patients.find(
        (patient) =>
          patient.id ===
          selectedPatientId
      );

    const taskPayload = {
  status: 'PENDING',

  statusColor: '#D97706',

  dueText: '',

  title:
    taskName ||
    selectedTemplate?.name ||
    'Custom Task',

  assigned:
    taskCategory === 'ADMIN'
      ? 'Administration'
      : 'Nursing Staff',

  due:
    dueDate && dueTime
      ? `${dueDate} ${dueTime}`
      : 'Today',

  dueAt: null,

  dueDate,

  dueTime,

  priority,

  escalationMinutes:
    Number(escalationMinutes),

escalated: false,

escalatedAt: null,

escalatedTo: null,

  location:
    selectedPatient?.ward ||
    'Hospital',

  taskCategory,

  patientId:
    selectedPatient?.id,

  patientName:
    selectedPatient?.name,

  type:
    taskCategory === 'PATIENT'
      ? 'VITALS'
      : 'ADMIN',
};

if (isEditMode) {
  updateTask(
    editTask.id,
    taskPayload
  );
} else {
  addTask({
    id: `TASK-${Date.now()}`,
    ...taskPayload,
  });
}

    navigation.goBack();
  }}
>
<Text style={styles.buttonText}>
  {isEditMode
    ? 'Save Changes'
    : 'Create Task'}
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

  icon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

topBarTitle: {
  color: COLORS.card,
  fontSize: 18,
  fontWeight: '700',
},

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginBottom: 14,
    padding: 18,
    borderRadius: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#234A7A',
    marginBottom: 12,
  },

  input: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#E2E8F0',
},

  option: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  optionText: {
    color: '#1E293B',
    fontWeight: '600',
  },
  selectedOption: {
  borderColor: '#234A7A',
  borderWidth: 2,
},
button: {
  backgroundColor: '#234A7A',
  marginHorizontal: 14,
  borderRadius: 16,
  paddingVertical: 16,
  alignItems: 'center',
  marginBottom: 20,
},

buttonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700',
},
});
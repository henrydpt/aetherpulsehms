import React from 'react';
import { useAuthStore } from '../store/authStore';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ComplianceScreen from '../screens/ComplianceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import EvidenceViewerScreen from '../screens/EvidenceViewerScreen';
import PatientCaseSheetScreen from '../screens/PatientCaseSheetScreen';
import LoginScreen from '../screens/LoginScreen';
import { COLORS } from '../theme/colors';
import UserManagementScreen from '../screens/UserManagementScreen';
import EditUserScreen from '../screens/EditUserScreen';
import AddUserScreen from '../screens/AddUserScreen';
import { useEffect } from 'react';
import { usePatientStore } from '../store/patientStore';
import { useTaskStore } from '../store/taskStore';
import AdmissionsScreen from '../screens/AdmissionsScreen';
import ConsultationScreen
  from '../screens/ConsultationScreen';
import OpQueueScreen
  from '../screens/OpQueueScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MainTabs() {
    const insets = useSafeAreaInsets();
    const role = useAuthStore(
  (state) => state.role
);
const loadPatients =
  usePatientStore(
    (state) => state.loadPatients
  );

const loadTasks =
  useTaskStore(
    (state) => state.loadTasks
  );

useEffect(() => {
  loadPatients();
  loadTasks();
}, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#94A3B8',

      tabBarStyle: {
  height: 60 + insets.bottom,
  paddingBottom: insets.bottom,
  paddingTop: 8,

  backgroundColor: COLORS.card,
  borderTopColor: COLORS.border,
  borderTopWidth: 1,
},
tabBarLabelStyle: {
  fontWeight: '600',
},

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Tasks') {
            iconName = 'clipboard';
          } else if (route.name === 'Patients') {
            iconName = 'people';
          } else if (route.name === 'Analytics') {
            iconName = 'bar-chart';
          } else {
            iconName = 'person';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
<Tab.Screen
  name="Home"
  component={HomeScreen}
/>

<Tab.Screen
  name="Patients"
  component={PatientsScreen}
/>

<Tab.Screen
  name="OPD"
  component={OpQueueScreen}
/>

<Stack.Screen
  name="Admissions"
  component={AdmissionsScreen}
/>

<Stack.Screen
  name="Consultation"
  component={ConsultationScreen}
/>

<Tab.Screen
  name="Profile"
  component={ProfileScreen}
/>
    </Tab.Navigator>
  );
}
export default function AppNavigator() {
  return (
  <SafeAreaProvider>
    <NavigationContainer>
<Stack.Navigator
  screenOptions={{
    headerShown: false,
  }}
>
  <Stack.Screen
    name="Login"
    component={LoginScreen}
  />

  <Stack.Screen
    name="MainTabs"
    component={MainTabs}
  />

  <Stack.Screen
    name="TaskDetail"
    component={TaskDetailScreen}
  />
  <Stack.Screen
  name="EditUser"
  component={EditUserScreen}
/>
  <Stack.Screen
  name="PatientDetail"
  component={PatientDetailScreen}
/>
<Stack.Screen
  name="PatientCaseSheet"
  component={PatientCaseSheetScreen}
/>
<Stack.Screen
  name="AddPatient"
  component={AddPatientScreen}
/>
<Stack.Screen
  name="Admissions"
  component={AdmissionsScreen}
/>
<Stack.Screen
  name="CreateTask"
  component={CreateTaskScreen}
/>
<Stack.Screen
  name="UserManagement"
  component={UserManagementScreen}
/>
<Stack.Screen
  name="EvidenceViewer"
  component={EvidenceViewerScreen}
/>
<Stack.Screen
  name="AddUser"
  component={AddUserScreen}
/>
</Stack.Navigator>
        </NavigationContainer>
  </SafeAreaProvider>
);
}
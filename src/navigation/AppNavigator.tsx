import React from 'react';
import { useAuthStore } from '../store/authStore';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import PatientDashboardScreen
  from '../screens/PatientDashboardScreen';
import DischargeScreen
  from '../screens/DischargeScreen';
import DoctorRoundsScreen
  from '../screens/DoctorRoundsScreen';
import NursingNotesScreen
  from '../screens/NursingNotesScreen';
import MedicationOrdersScreen
  from '../screens/MedicationOrdersScreen';
import MedicationAdministrationScreen
  from '../screens/MedicationAdministrationScreen';
import MedicationAdministrationRecordScreen
  from '../screens/MedicationAdministrationRecordScreen';
import MedicineMasterScreen
  from '../screens/MedicineMasterScreen';
import ReceiveStockScreen
  from '../screens/ReceiveStockScreen';
import InventoryScreen
  from '../screens/InventoryScreen';
import DispensingQueueScreen
  from '../screens/DispensingQueueScreen';
import DispensedMedicationsScreen
  from '../screens/DispensedMedicationsScreen';
import MedicationTimelineScreen
  from '../screens/MedicationTimelineScreen';
import DispenseMedicationScreen
  from '../screens/DispenseMedicationScreen';
import OpQueueScreen
  from '../screens/OpQueueScreen';
import AppDrawerContent
  from '../components/navigation/AppDrawerContent';
import OPRegistrationScreen from '../screens/OPRegistrationScreen';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
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
} else if (route.name === 'Patients') {
  iconName = 'people';
} else if (route.name === 'OPD') {
  iconName = 'medical';
} else if (route.name === 'IPD') {
  iconName = 'bed';
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

<Tab.Screen
  name="IPD"
  component={AdmissionsScreen}
/>

<Tab.Screen
  name="Profile"
  component={ProfileScreen}
/>
    </Tab.Navigator>
  );
}
function MainDrawer() {
  return (
<Drawer.Navigator
  drawerContent={(props) => (
    <AppDrawerContent {...props} />
  )}
  screenOptions={{
    headerShown: false,
  }}
>
<Drawer.Screen
  name="MainTabs"
  component={MainTabs}
/>

      <Drawer.Screen
        name="Consultations"
        component={ConsultationScreen}
      />

      <Drawer.Screen
        name="Tasks"
        component={TasksScreen}
      />

      <Drawer.Screen
        name="Evidence Viewer"
        component={EvidenceViewerScreen}
      />

      <Drawer.Screen
        name="User Management"
        component={UserManagementScreen}
      />
<Drawer.Screen
  name="Medicine Master"
  component={MedicineMasterScreen}
/>
<Drawer.Screen
  name="Receive Stock"
  component={ReceiveStockScreen}
/>
<Drawer.Screen
  name="Inventory"
  component={InventoryScreen}
/>
<Drawer.Screen
  name="Dispensing Queue"
  component={DispensingQueueScreen}
/>
<Drawer.Screen
  name="Dispensed Medications"
  component={DispensedMedicationsScreen}
/>
      <Drawer.Screen
        name="NABH Dashboard"
        component={ComplianceScreen}
      />
    </Drawer.Navigator>
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
  name="MainDrawer"
  component={MainDrawer}
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
  name="OPRegistration"
  component={OPRegistrationScreen}
/>
<Stack.Screen
  name="Consultation"
  component={ConsultationScreen}
/>

<Stack.Screen
  name="PatientDashboard"
  component={PatientDashboardScreen}
/>

<Stack.Screen
  name="DoctorRounds"
  component={DoctorRoundsScreen}
/>

<Stack.Screen
  name="NursingNotes"
  component={NursingNotesScreen}
/>

<Stack.Screen
  name="MedicationOrders"
  component={MedicationOrdersScreen}
/>

<Stack.Screen
  name="MedicationAdministration"
  component={MedicationAdministrationScreen}
/>

<Stack.Screen
  name="MedicationAdministrationRecord"
  component={MedicationAdministrationRecordScreen}
/>
<Stack.Screen
  name="Dispense Medication"
  component={DispenseMedicationScreen}
/>
<Stack.Screen
  name="Medication Timeline"
  component={MedicationTimelineScreen}
/>
<Stack.Screen
  name="Discharge"
  component={DischargeScreen}
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
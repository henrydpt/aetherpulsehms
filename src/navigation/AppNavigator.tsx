import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import TasksScreen from '../screens/TasksScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ComplianceScreen from '../screens/ComplianceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#234A7A',
        tabBarInactiveTintColor: '#94A3B8',

        tabBarStyle: {
          height: 95,
          paddingBottom: 25,
          paddingTop: 8,
          marginBottom: 20,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Tasks') {
            iconName = 'clipboard';
          } else if (route.name === 'Patients') {
            iconName = 'people';
          } else if (route.name === 'Compliance') {
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
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
      />

      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
      />

      <Tab.Screen
        name="Compliance"
        component={ComplianceScreen}
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
    name="MainTabs"
    component={MainTabs}
  />

  <Stack.Screen
    name="TaskDetail"
    component={TaskDetailScreen}
  />
  <Stack.Screen
  name="PatientDetail"
  component={PatientDetailScreen}
/>
<Stack.Screen
  name="AddPatient"
  component={AddPatientScreen}
/>
<Stack.Screen
  name="CreateTask"
  component={CreateTaskScreen}
/>
</Stack.Navigator>
        </NavigationContainer>
  </SafeAreaProvider>
);
}
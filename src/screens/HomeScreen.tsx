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
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons }
  from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useAuthStore } from '../store/authStore';
import { getHospitalStats }
  from '../services/hospitalStatsService';
  import { getOpStats }
  from '../services/opDashboardService';
import {
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
export default function HomeScreen() {

  const userName =
    useAuthStore(
      (state) => state.userName
    );
const navigation =
  useNavigation<any>();
  const [stats, setStats] =
    useState({
      wards: 0,
      beds: 0,
      occupiedBeds: 0,
      availableBeds: 0,
      activeAdmissions: 0,
    });
const [opStats, setOpStats] =
  useState({
    waiting: 0,
    inConsultation: 0,
    completed: 0,
  });
  useEffect(() => {
    loadStats();
  }, []);

async function loadStats() {

  const data =
    await getHospitalStats();

  setStats(data);

  const opd =
    await getOpStats();

  setOpStats(opd);
}

  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 17
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        backgroundColor={
          COLORS.primary
        }
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.topBar}>
<TouchableOpacity
  style={styles.headerButton}
  onPress={() =>
    navigation.dispatch(
      DrawerActions.toggleDrawer()
    )
  }
>
  <Ionicons
    name="menu"
    size={22}
    color="#FFFFFF"
  />
</TouchableOpacity>

  <Text style={styles.title}>
    Aether Pulse HMS
  </Text>

  <View style={styles.headerButton}>
    <Ionicons
      name="notifications-outline"
      size={22}
      color="#FFFFFF"
    />
  </View>
</View>

        <View style={styles.hero}>
          <Text
            style={styles.greeting}
          >
            {greeting}
          </Text>

          <Text
            style={styles.user}
          >
            {userName}
          </Text>
        </View>

        <Text style={styles.heading}>
          Today's Snapshot
        </Text>
<View style={styles.card}>
<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
  }}
>
  <Ionicons
    name="medical"
    size={20}
    color={COLORS.primary}
  />

  <Text
    style={[
      styles.label,
      { marginLeft: 8 },
    ]}
  >
    OPD Snapshot
  </Text>
</View>

<View style={styles.tileRow}>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="people"
        size={20}
        color="#2563EB"
      />

      <Text style={styles.metricValue}>
        {opStats.waiting}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Waiting
    </Text>
  </View>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="medical"
        size={20}
        color="#16A34A"
      />

      <Text style={styles.metricValue}>
        {opStats.inConsultation}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Consultation
    </Text>
  </View>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="checkmark-circle"
        size={20}
        color="#7C3AED"
      />

      <Text style={styles.metricValue}>
        {opStats.completed}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Completed
    </Text>
  </View>

</View>

</View>

<View style={styles.card}>
<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
  }}
>
  <Ionicons
    name="bed"
    size={20}
    color={COLORS.primary}
  />

  <Text
    style={[
      styles.label,
      { marginLeft: 8 },
    ]}
  >
    IPD Snapshot
  </Text>
</View>

<View style={styles.tileRow}>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="bed"
        size={20}
        color="#7C3AED"
      />

      <Text style={styles.metricValue}>
        {stats.activeAdmissions}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Admissions
    </Text>
  </View>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="bed"
        size={20}
        color="#EA580C"
      />

      <Text style={styles.metricValue}>
        {stats.occupiedBeds}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Occupied
    </Text>
  </View>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="bed"
        size={20}
        color="#16A34A"
      />

      <Text style={styles.metricValue}>
        {stats.availableBeds}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Available
    </Text>
  </View>

  <View style={styles.tile}>
    <View style={styles.metricHeader}>
      <Ionicons
        name="business"
        size={20}
        color="#2563EB"
      />

      <Text style={styles.metricValue}>
        {stats.wards}
      </Text>
    </View>

    <Text style={styles.metricLabel}>
      Wards
    </Text>
  </View>

</View>
</View>

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  }}
>
  <Ionicons
    name="flash"
    size={22}
    color={COLORS.primary}
  />

  <Text
    style={[
      styles.heading,
      {
        marginLeft: 8,
        marginHorizontal: 0,
        marginBottom: 0,
      },
    ]}
  >
    Quick Actions
  </Text>
</View>

<View style={styles.actionRow}>

  <TouchableOpacity
    style={styles.actionTile}
    onPress={() =>
      navigation.navigate(
        'AddPatient'
      )
    }
  >
    <Ionicons
      name="person-add"
      size={28}
      color={COLORS.primary}
    />

    <Text style={styles.actionText}>
      Register
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.actionTile}
    onPress={() =>
      navigation.navigate(
        'Patients'
      )
    }
  >
    <Ionicons
      name="people"
      size={28}
      color={COLORS.primary}
    />

    <Text style={styles.actionText}>
      Patients
    </Text>
  </TouchableOpacity>

<TouchableOpacity
  style={styles.actionTile}
  onPress={() =>
    navigation.navigate('IPD')
  }
>
    <Ionicons
      name="bed"
      size={28}
      color={COLORS.primary}
    />

    <Text style={styles.actionText}>
      Admission
    </Text>
  </TouchableOpacity>

</View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F8F5EE',
    },

    content: {
      paddingBottom: 40,
    },

topBar: {
  backgroundColor: COLORS.primary,
  minHeight: 100,
  paddingTop: 40,
  paddingBottom: 16,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

title: {
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: '700',
  flex: 1,
  textAlign: 'center',
},
headerIcon: {
  color: '#FFFFFF',
  fontSize: 20,
  width: 30,
  textAlign: 'center',
},
headerButton: {
  width: 30,
  alignItems: 'center',
},
    hero: {
      padding: 20,
    },

    greeting: {
      fontSize: 24,
      fontWeight: '700',
      color: '#1E293B',
    },

    user: {
      marginTop: 4,
      color: '#64748B',
    },

    heading: {
      marginHorizontal: 20,
      marginBottom: 10,
      fontSize: 18,
      fontWeight: '700',
    },

    card: {
      backgroundColor:
        '#FFFFFF',
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 16,
      padding: 18,
    },
tileRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 12,
},

tile: {
  flex: 1,
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 8,
  marginHorizontal: 2,
  alignItems: 'center',
},
ipdTileRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
},

ipdTile: {
  width: '48%',
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 8,
  alignItems: 'center',
},

tileValue: {
  fontSize: 28,
  fontWeight: '700',
  color: COLORS.primary,
},

tileLabel: {
  marginTop: 6,
  fontSize: 12,
  color: '#64748B',
  textAlign: 'center',
},
tileIcon: {
  marginBottom: 8,
},
actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

actionTile: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  paddingVertical: 20,
  marginHorizontal: 4,
  alignItems: 'center',
},

actionText: {
  marginTop: 8,
  fontSize: 12,
  fontWeight: '600',
  textAlign: 'center',
  color: '#334155',
},
    label: {
      color: '#64748B',
    },
infoRow: {
  marginTop: 10,
  fontSize: 16,
  color: '#334155',
},
actionLink: {
  fontSize: 16,
  color: COLORS.primary,
  fontWeight: '600',
  marginTop: 12,
},
    value: {
      marginTop: 8,
      fontSize: 28,
      fontWeight: '700',
      color: COLORS.primary,
    },
metricHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

metricValue: {
  marginLeft: 8,
  fontSize: 20,
  fontWeight: '700',
  color: '#1E293B',
},

metricLabel: {
  marginTop: 6,
  fontSize: 12,
  color: '#64748B',
  textAlign: 'center',
},
  });
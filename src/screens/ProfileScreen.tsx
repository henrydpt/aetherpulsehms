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
import { COLORS } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const role = useAuthStore(
  (state) => state.role
);

const userName = useAuthStore(
  (state) => state.userName
);

const department =
  userName ===
  'Dr Udumula Ashok Reddy'
    ? 'Orthopaedics'
    : userName ===
      'Dr S.V. Geethika Reddy'
    ? 'Gynaecology'
    : '-';
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
  <View style={{ width: 60 }} />

  <Text style={styles.topBarTitle}>
    Profile
  </Text>

<TouchableOpacity
  onPress={() =>
    navigation.replace('Login')
  }
  style={{
    flexDirection: 'row',
    alignItems: 'center',
  }}
>
  <Ionicons
    name="log-out-outline"
    size={18}
    color="#FFFFFF"
  />

  <Text
    style={{
      color: '#FFFFFF',
      fontWeight: '700',
      marginLeft: 4,
    }}
  >
    Logout
  </Text>
</TouchableOpacity>
</View>

        <View style={styles.profileCard}>
<Text
  style={{
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
    alignSelf: 'flex-start',
  }}
>
  Profile Information
</Text>

<View style={styles.infoRow}>
  <Text style={styles.infoIcon}>👤</Text>

  <View>
    <Text style={styles.infoLabel}>
      User
    </Text>

    <Text style={styles.infoValue}>
      {userName}
    </Text>
  </View>
</View>

<View style={styles.infoRow}>
  <Text style={styles.infoIcon}>🩺</Text>

  <View>
    <Text style={styles.infoLabel}>
      Role
    </Text>

    <Text style={styles.infoValue}>
      {role}
    </Text>
  </View>
</View>

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
  }}
>
  <Text style={styles.infoIcon}>🏥</Text>

  <View>
    <Text style={styles.infoLabel}>
      Department
    </Text>

    <Text style={styles.infoValue}>
      {department}
    </Text>
  </View>
</View>
</View>
<View style={styles.menuCard}>
<Text
  style={{
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
  }}
>
  Workspace Information
</Text>

<View style={styles.infoRow}>
  <Text style={styles.infoIcon}>🏥</Text>

  <View>
    <Text style={styles.infoLabel}>
      Hospital
    </Text>

    <Text style={styles.infoValue}>
      Udumula Hospitals
    </Text>
  </View>
</View>

<View style={styles.infoRow}>
  <Text style={styles.infoIcon}>📱</Text>

  <View>
    <Text style={styles.infoLabel}>
      Application
    </Text>

    <Text style={styles.infoValue}>
      Aether Pulse Mobile
    </Text>
  </View>
</View>

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
  }}
>
  <Text style={styles.infoIcon}>🔖</Text>

  <View>
    <Text style={styles.infoLabel}>
      Version
    </Text>

    <Text style={styles.infoValue}>
      v1.0
    </Text>
  </View>
</View>
</View>
{(
  role === 'Admin' ||
  role === 'Super User'
) && (
  <View style={styles.menuCard}>
    <Text
      style={{
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 10,
      }}
    >
      Administration
    </Text>

    <TouchableOpacity
      style={styles.adminItem}
      onPress={() =>
        navigation.navigate(
          'UserManagement'
        )
      }
    >
      <Text
        style={styles.adminText}
      >
        User Management
      </Text>

      <Text
        style={styles.arrow}
      >
        ›
      </Text>
    </TouchableOpacity>
  </View>
)}

      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>
        {title}
      </Text>

      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
  },

content: {
  paddingBottom: 100,
  paddingTop: 0,
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

profileCard: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  marginTop: 16,
  borderRadius: 18,
  padding: 20,
  borderWidth: 1,
  borderColor: '#EEE7D8',
},

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#234A7A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },

  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },

  email: {
    marginTop: 6,
    color: '#64748B',
  },

  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },

  onlineText: {
    color: '#22C55E',
    fontWeight: '600',
  },

menuCard: {
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  marginTop: 16,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: '#EEE7D8',
  overflow: 'hidden',
  padding: 20,
},

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  menuText: {
    fontSize: 16,
    color: '#1E293B',
  },

  arrow: {
    fontSize: 24,
    color: '#94A3B8',
  },

  logoutCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  logoutText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 16,
  },
infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderBottomColor: '#F1F5F9',
},

infoIcon: {
  fontSize: 22,
  marginRight: 14,
},

infoLabel: {
  color: '#64748B',
  fontSize: 13,
},

infoValue: {
  color: '#1E293B',
  fontSize: 16,
  fontWeight: '600',
  marginTop: 2,
},
adminItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 14,
},

adminText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1E293B',
},
});
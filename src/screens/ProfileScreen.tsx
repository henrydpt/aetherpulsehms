import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            Profile
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              NH
            </Text>
          </View>

          <Text style={styles.name}>
            Nursing Head
          </Text>

          <Text style={styles.email}>
            nursing.head@hospital.com
          </Text>

          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>
              Online
            </Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          <MenuItem title="My Profile" />
          <MenuItem title="Change Password" />
          <MenuItem title="Notifications" />
          <MenuItem title="Help & Support" />
          <MenuItem title="About Aether Pulse" />
        </View>

        <TouchableOpacity style={styles.logoutCard}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
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
  },

  topBar: {
    height: 64,
    backgroundColor: '#234A7A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
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
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEE7D8',
    overflow: 'hidden',
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
});
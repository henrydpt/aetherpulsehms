import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';
import { COLORS } from '../theme/colors';

export default function UserManagementScreen() {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] =
  useState('');
const allUsers = useUserStore(
  (state) => state.users
);

const users = allUsers.filter(
  (user) =>
    user.name
      .toLowerCase()
      .includes(
        searchText.toLowerCase()
      ) ||
    user.username
      .toLowerCase()
      .includes(
        searchText.toLowerCase()
      ) ||
    user.role
      .toLowerCase()
      .includes(
        searchText.toLowerCase()
      ) ||
    (user.department || '')
      .toLowerCase()
      .includes(
        searchText.toLowerCase()
      )
);

  const admins = users.filter(
    (user) =>
      user.role === 'Admin' ||
      user.role === 'Super User'
  );

  const doctors = users.filter(
    (user) =>
      user.role === 'Doctor'
  );

  const executives = users.filter(
    (user) =>
      user.role === 'Executive'
  );

  const renderUserCard = (
    user: any
  ) => (
<TouchableOpacity
  key={user.id}
  style={styles.userCard}
  onPress={() =>
    navigation.navigate(
      'EditUser',
      {
        user,
      }
    )
  }
>
      <View style={{ flex: 1 }}>
        <Text style={styles.userName}>
          {user.name}
        </Text>

        <Text style={styles.userInfo}>
          {user.role}
        </Text>

        <Text style={styles.userInfo}>
          Username: {user.username}
        </Text>

        {user.department ? (
          <Text style={styles.userInfo}>
            Department: {user.department}
          </Text>
        ) : null}
      </View>

      <View
        style={[
          styles.statusChip,
          {
            backgroundColor:
              user.active
                ? '#DCFCE7'
                : '#FEE2E2',
          },
        ]}
      >
        <Text
          style={{
            color: user.active
              ? '#15803D'
              : '#B91C1C',
            fontWeight: '600',
          }}
        >
          {user.active
            ? 'Active'
            : 'Inactive'}
        </Text>
      </View>
<Text
  style={{
    color: COLORS.primary,
    fontWeight: '700',
    marginLeft: 12,
  }}
>
  Edit ›
</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.back}>
              ‹
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            User Management
          </Text>

          <View style={{ width: 20 }} />
        </View>
<View
  style={{
    paddingHorizontal: 16,
    paddingTop: 16,
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: COLORS.primary,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
    }}
    onPress={() =>
      navigation.navigate(
        'AddUser'
      )
    }
  >
    <Text
      style={{
        color: '#FFFFFF',
        fontWeight: '700',
      }}
    >
      + Add User
    </Text>
  </TouchableOpacity>
</View>
<View
  style={{
    paddingHorizontal: 16,
    paddingTop: 12,
  }}
>
  <TextInput
    placeholder="Search users..."
    value={searchText}
    onChangeText={setSearchText}
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      paddingHorizontal: 14,
      paddingVertical: 12,
    }}
  />
</View>
        <Section
          title={`Administrators (${admins.length})`}
        >
          {admins.map(renderUserCard)}
        </Section>

        <Section
          title={`Doctors (${doctors.length})`}
        >
          {doctors.map(renderUserCard)}
        </Section>

        <Section
          title={`Executives (${executives.length})`}
        >
          {executives.map(renderUserCard)}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: any) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
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

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  back: {
    color: '#FFFFFF',
    fontSize: 28,
  },

  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#234A7A',
  },

  userCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },

  userInfo: {
    color: '#64748B',
    marginTop: 4,
  },

  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
});
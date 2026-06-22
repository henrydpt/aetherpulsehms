import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { supabase } from '../lib/supabase';
import {
  useNavigation,
} from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useUserStore } from '../store/userStore';
import { COLORS } from '../theme/colors';

export default function AddUserScreen() {
  const navigation = useNavigation<any>();

  const users = useUserStore(
    (state) => state.users
  );

  const addUser = useUserStore(
    (state) => state.addUser
  );
const loadUsers = useUserStore(
  (state) => state.loadUsers
);
  const [name, setName] =
    useState('');

  const [username, setUsername] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('Executive');

  const [department, setDepartment] =
    useState('');

  const createUser = async () => {
    if (
      !name ||
      !username ||
      !password
    ) {
      alert(
        'Please complete all required fields'
      );
      return;
    }

    const prefix =
      role === 'Doctor'
        ? 'DR'
        : role === 'Admin'
        ? 'AD'
        : 'EX';

    const count =
      users.filter(
        (user) =>
          user.role === role
      ).length + 1;

    const id =
      `${prefix}${String(count).padStart(
        3,
        '0'
      )}`;

const newUser = {
  id,
  name,
  username,
  password,
  role,
department:
  role === 'Doctor'
    ? department
    : undefined,
  active: true,
};
console.log('ABOUT TO INSERT', newUser);
const { error } =
  await supabase
    .from('users')
    .insert([newUser]);
console.log(
  'INSERT ERROR',
  error
);
if (error) {
  alert(error.message);
  return;
}

addUser(newUser);

await loadUsers();

navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />

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
          Add User
        </Text>

        <View style={{ width: 20 }} />
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.label}>
          Name
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>
          Username
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Text style={styles.label}>
          Role
        </Text>

        <View style={styles.roleRow}>
          {[
            'Doctor',
            'Executive',
            'Admin',
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.roleButton,
                role === item && {
                  backgroundColor:
                    COLORS.primary,
                },
              ]}
              onPress={() =>
                setRole(item)
              }
            >
              <Text
                style={{
                  color:
                    role === item
                      ? '#FFFFFF'
                      : '#334155',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {role === 'Doctor' && (
          <>
            <Text
              style={styles.label}
            >
              Department
            </Text>

            <TextInput
              value={department}
              onChangeText={
                setDepartment
              }
              style={styles.input}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={createUser}
        >
          <Text
            style={styles.saveText}
          >
            Create User
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
    justifyContent:
      'space-between',
    paddingHorizontal: 18,
  },

  back: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  label: {
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 16,
  },

  roleRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 20,
  },

  roleButton: {
    width: '31%',
    backgroundColor: '#E2E8F0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
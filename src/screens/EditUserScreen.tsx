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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { useUserStore } from '../store/userStore';
import { COLORS } from '../theme/colors';

export default function EditUserScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const updateUser = useUserStore(
    (state) => state.updateUser
  );
const deactivateUser =
  useUserStore(
    (state) => state.deactivateUser
  );
  const user = route.params?.user;

  const [name, setName] =
    useState(user?.name || '');

  const [username, setUsername] =
    useState(user?.username || '');

  const [password, setPassword] =
    useState(user?.password || '');

  const [department, setDepartment] =
    useState(user?.department || '');

  const [active, setActive] =
    useState(user?.active ?? true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />

      <View style={styles.topBar}>
        <View style={{ width: 40 }} />

        <Text style={styles.title}>
          Edit User
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.content}
  enableOnAndroid={true}
  extraScrollHeight={100}
  keyboardShouldPersistTaps="handled"
>
        <Text>Name</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text>Username</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <Text>Password</Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Text>Role</Text>

        <TextInput
          value={user?.role}
          editable={false}
          style={styles.input}
        />

        <Text>Department</Text>

        <TextInput
          value={department}
          onChangeText={setDepartment}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            updateUser(
              user.id,
              {
                name,
                username,
                password,
                department,
                active,
              }
            );

            navigation.goBack();
          }}
        >
          <Text
            style={styles.saveText}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
<TouchableOpacity
  style={[
    styles.saveButton,
    {
      backgroundColor: active
  ? '#B91C1C'
  : '#15803D',
      marginTop: 12,
    },
  ]}
onPress={async () => {
  await updateUser(
    user.id,
    {
      active: !active,
    }
  );

  setActive(!active);

  navigation.goBack();
}}
>
  <Text style={styles.saveText}>
    {active
      ? 'Deactivate User'
      : 'Activate User'}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
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

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    marginBottom: 16,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    alignItems: 'center',
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
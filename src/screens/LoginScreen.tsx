import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function LoginScreen() {
  const navigation = useNavigation<any>();
const setRoleInStore =
  useAuthStore(
    (state) => state.setRole
  );
const [username, setUsername] =
  useState('admin');

const [password, setPassword] =
  useState('admin');
const [role, setRole] =
  useState('Executive');
  return (
    <SafeAreaView style={styles.container}>
<StatusBar
  backgroundColor="#F8F5EE"
  barStyle="dark-content"
/>
<KeyboardAwareScrollView
  enableOnAndroid={true}
  extraScrollHeight={200}
  keyboardShouldPersistTaps="handled"
contentContainerStyle={{
  flexGrow: 1,
  paddingHorizontal: 24,
  paddingTop: 40,
  paddingBottom: 120,
}}
>
      <View style={styles.hero}>
<Image
  source={require('../../assets/aetherpulsetransparent.png')}
  style={styles.logo}
  resizeMode="contain"
/>
<Text style={styles.hospital}>
  Udumula Hospitals
</Text>

<Text style={styles.tagline}>
  HOSPITAL OPERATIONS PLATFORM
</Text>

      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
<Text
  style={{
    fontWeight: '700',
    marginBottom: 10,
    color: COLORS.primary,
  }}
>
  Role
</Text>

<View
  style={{
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-between',
marginBottom: 16,
  }}
>
  {[
    'Super User',
    'Admin',
    'Doctor',
    'Executive',
  ].map((item) => (
    <TouchableOpacity
      key={item}
      onPress={() => setRole(item)}
      style={{
        backgroundColor:
          role === item
            ? COLORS.primary
            : '#E2E8F0',
width: '48%',
paddingVertical: 10,
borderRadius: 12,
marginBottom: 10,
alignItems: 'center',
      }}
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
        <TouchableOpacity
          style={styles.button}
onPress={() => {
  if (
    username === 'admin' &&
    password === 'admin'
  ) {
    setRoleInStore(role);
    navigation.replace(
      'MainTabs'
    );
  } else {
    alert(
      'Invalid username or password'
    );
  }
}}
        >
          <Text style={styles.buttonText}>
            Sign In
          </Text>

        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        Powered by Aether Interactions
      </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F8F5EE',
},
logo: {
  width: 180,
  height: 180,
  marginBottom: -12,
},
hero: {
  alignItems: 'center',
    marginTop: 20,
  marginBottom: 32,
},
heroIcon: {
  marginBottom: 16,
},
appName: {
  fontSize: 18,
  fontWeight: '700',
  color: COLORS.primary,
  textAlign: 'center',
},

hospital: {
  fontSize: 24,
  fontWeight: '700',
  color: COLORS.primary,
  marginTop: 6,
  letterSpacing: 0.5,
  textAlign: 'center',
},

tagline: {
  fontSize: 14,
  fontWeight: '500',
  color: '#64748B',
  marginTop: 8,
  textAlign: 'center',
  letterSpacing: 1,
},

card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 24,
  padding: 20,
  marginBottom: 20,
},

  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  footer: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 24,
  },
});
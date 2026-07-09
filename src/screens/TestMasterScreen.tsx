import React, {
  useEffect,
  useState,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  getLabTests,
  searchLabTests,
} from '../services/labTestService';
import FloatingActionButton
  from '../components/FloatingActionButton';
export default function TestMasterScreen() {
const navigation =
  useNavigation<any>();
const [
  tests,
  setTests,
] = useState<any[]>([]);
const [search, setSearch] =
  useState('');
async function handleSearch(
  text: string
) {

  setSearch(text);

  if (!text.trim()) {

    loadTests();

    return;

  }

  const data =
    await searchLabTests(
      text
    );

  setTests(data);

}
useFocusEffect(
  React.useCallback(() => {

    loadTests();

  }, [])
);

async function loadTests() {

  const data =
    await getLabTests();

  setTests(data);

}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>
          Test Master
        </Text>
      </View>

<View style={styles.content}>
<TextInput
  placeholder="Search test..."
  value={search}
  onChangeText={handleSearch}
  style={styles.search}
/>
  {tests.map((test) => (

<TouchableOpacity
  key={test.id}
  style={styles.card}
  onPress={() =>
    navigation.navigate(
      'Add Test',
      {
        mode: 'EDIT',
        test,
      }
    )
  }
>

      <Text
        style={styles.testName}
      >
        🧪 {test.test_name}
      </Text>

      <Text
        style={styles.detail}
      >
        Code: {test.test_code}
      </Text>

      <Text
        style={styles.detail}
      >
        Department: {test.department}
      </Text>

      <Text
        style={styles.detail}
      >
        Sample: {test.sample_type}
      </Text>

    </TouchableOpacity>

  ))}
<FloatingActionButton
  icon="add"
  onPress={() =>
    navigation.navigate(
      'Add Test'
    )
  }
/>
</View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

content: {
  padding: 16,
},
card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 14,
  padding: 16,
  marginBottom: 12,
},

testName: {
  fontSize: 17,
  fontWeight: '700',
  color: '#0F172A',
},

detail: {
  marginTop: 6,
  color: '#475569',
},

  message: {
    fontSize: 18,
    color: '#64748B',
  },
search: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#CBD5E1',
  padding: 14,
  marginBottom: 16,
},

});
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';

export default function DiagnosticsScreen() {

  const route = useRoute<any>();
const navigation =
  useNavigation<any>();
  const admission =
    route.params?.admission;

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Diagnostics
        </Text>

        <View style={{ width: 24 }} />

      </View>

<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.content}
>

<View
  style={{
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  }}
>

<Text
  style={{
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  }}
>
  Patient Summary
</Text>

<Text
  style={{
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
  }}
>
  {admission?.patientName}
</Text>

<Text style={{ marginTop: 6 }}>
  Admission No: {admission?.admission_number}
</Text>

<Text>
  Ward: {admission?.wardName}
</Text>

<Text>
  Bed: {admission?.bedNumber}
</Text>

</View>

<View
  style={{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  }}
>

<Text
  style={{
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
  }}
>
  Quick Actions
</Text>
<TouchableOpacity
  style={styles.actionRow}
  onPress={() =>
    navigation.navigate(
      'Lab Orders',
      {
        admission,
      }
    )
  }
>
  <Text style={styles.actionTitle}>
    🧪 Laboratory Orders
  </Text>

  <Text style={styles.arrow}>
    ›
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.actionRow}
  onPress={() =>
    navigation.navigate(
      'Radiology Orders',
      {
        admission,
      }
    )
  }
>
  <Text style={styles.actionTitle}>
    🩻 Radiology Orders
  </Text>

  <Text style={styles.arrow}>
    ›
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.actionRow}
  onPress={() =>
    navigation.navigate(
      'Diagnostic Results',
      {
        admission,
      }
    )
  }
>
  <Text style={styles.actionTitle}>
    📋 Diagnostic Results
  </Text>

  <Text style={styles.arrow}>
    ›
  </Text>
</TouchableOpacity>
</View>

</ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    paddingBottom: 24,
  },

  topBar: {
    minHeight: 90,
    paddingTop: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#EEF2F7',
},

actionTitle: {
  fontSize: 16,
  fontWeight: '600',
},

arrow: {
  fontSize: 24,
  color: COLORS.primary,
  fontWeight: '700',
},
});
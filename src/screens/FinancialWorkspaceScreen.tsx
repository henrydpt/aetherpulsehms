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
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';

export default function FinancialWorkspaceScreen() {

  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const admission =
    route.params?.admission;

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Financial
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
    overflow: 'hidden',
  }}
>

<Text
  style={{
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    padding: 16,
    paddingBottom: 8,
  }}
>
  Financial Modules
</Text>

<TouchableOpacity
  style={styles.actionRow}
>

<Text style={styles.actionTitle}>
  💰 Billing
</Text>

<Text style={styles.arrow}>
  ›
</Text>

</TouchableOpacity>

<TouchableOpacity
  style={styles.actionRow}
>

<Text style={styles.actionTitle}>
  💳 Payments
</Text>

<Text style={styles.arrow}>
  ›
</Text>

</TouchableOpacity>

<TouchableOpacity
  style={styles.actionRow}
>

<Text style={styles.actionTitle}>
  🧾 Insurance
</Text>

<Text
  style={{
    color: '#94A3B8',
  }}
>
  Coming Soon
</Text>

</TouchableOpacity>

<TouchableOpacity
  style={styles.actionRow}
>

<Text style={styles.actionTitle}>
  📦 Packages
</Text>

<Text
  style={{
    color: '#94A3B8',
  }}
>
  Coming Soon
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
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: '#EEF2F7',
},

actionTitle: {
  fontSize: 16,
  fontWeight: '600',
},

arrow: {
  fontSize: 22,
  color: '#94A3B8',
},
});
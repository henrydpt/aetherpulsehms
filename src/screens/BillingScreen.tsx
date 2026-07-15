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
} from 'react-native';
import {
  useRoute,
} from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import {
  getBillingTransactions,
} from '../services/billingQueryService';
import {
  getBillingSummary,
} from '../services/billingSummaryService';
export default function BillingScreen() {

  const route =
    useRoute<any>();

  const admission =
    route.params?.admission;
const [
  transactions,
  setTransactions,
] = useState<any[]>([]);

const [
  summary,
  setSummary,
] = useState<any>(null);

useEffect(() => {
  loadBilling();
}, []);

async function loadBilling() {

  const data =
    await getBillingTransactions(
      admission.id
    );

  setTransactions(data);

  const billingSummary =
    await getBillingSummary(
      admission.id
    );

  setSummary(
    billingSummary
  );

}

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>

        <View style={{ width: 24 }} />

        <Text style={styles.topBarTitle}>
          Billing
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
<View
  style={{
    backgroundColor: COLORS.primary,
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
    padding: 20,
  }}
>

<Text
  style={{
    color: '#FFFFFF',
    fontSize: 16,
  }}
>
  Outstanding
</Text>

<Text
  style={{
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 8,
  }}
>
  ₹{summary?.outstanding?.toFixed(2) ?? '0.00'}
</Text>

<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  }}
>

<View>

<Text style={{ color: '#D6E4FF' }}>
  Charges
</Text>

<Text
  style={{
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  }}
>
  {summary?.transactionCount ?? 0}
</Text>

</View>

<View>

<Text style={{ color: '#D6E4FF' }}>
  Pending
</Text>

<Text
  style={{
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  }}
>
  {summary?.pendingTransactions ?? 0}
</Text>

</View>

<View>

<Text style={{ color: '#D6E4FF' }}>
  Paid
</Text>

<Text
  style={{
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  }}
>
  {summary?.paidTransactions ?? 0}
</Text>

</View>

</View>

</View>
<Text
  style={{
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    padding: 16,
  }}
>
  Admission Charges
</Text>

{transactions.map((item) => (

<View
  key={item.id}
  style={styles.billRow}
>

<View style={{ flex: 1 }}>

<Text style={styles.billTitle}>
  {item.description}
</Text>

<Text style={styles.billCategory}>
  {item.source_module}
</Text>

</View>

<Text style={styles.billAmount}>
  ₹{Number(item.amount).toFixed(2)}
</Text>

</View>

))}

<View style={styles.totalRow}>

<Text style={styles.totalLabel}>
  Grand Total
</Text>

<Text style={styles.totalAmount}>
  ₹{summary?.totalCharges?.toFixed(2) ?? '0.00'}
</Text>

</View>

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
billRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: '#EEF2F7',
},

billTitle: {
  fontSize: 16,
  fontWeight: '600',
},

billCategory: {
  color: '#64748B',
  marginTop: 4,
},

billAmount: {
  fontSize: 16,
  fontWeight: '700',
},

totalRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 18,
  borderTopWidth: 2,
  borderTopColor: '#CBD5E1',
},

totalLabel: {
  fontSize: 18,
  fontWeight: '700',
},

totalAmount: {
  fontSize: 20,
  fontWeight: '700',
  color: COLORS.primary,
},
});
import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { COLORS } from '../theme/colors';

import {
  getInventory,
} from '../services/inventoryService';

export default function InventoryScreen() {

  const [
    inventory,
    setInventory,
  ] = useState<any[]>([]);

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    const data =
      await getInventory();

    setInventory(data);
  }

  function getStatusColor(
    qty: number
  ) {

    if (qty <= 0) {
      return '#DC2626';
    }

    if (qty < 20) {
      return '#F59E0B';
    }

    return '#16A34A';
  }

  function renderItem({
    item,
  }: any) {

    const medicine =
      item.medicines;

    return (

      <View
        style={styles.card}
      >

        <View
          style={[
            styles.statusBar,
            {
              backgroundColor:
                getStatusColor(
                  item.quantity
                ),
            },
          ]}
        />

        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={styles.name}
          >
            {medicine.name}
          </Text>

          <Text
            style={
              styles.detail
            }
          >
            {medicine.strength}
            {' • '}
            {medicine.dosage_form}
          </Text>

          <Text
            style={
              styles.detail
            }
          >
            Batch : {item.batch_no}
          </Text>

          <Text
            style={
              styles.detail
            }
          >
            Expiry : {item.expiry_date}
          </Text>

          <Text
            style={
              styles.stock
            }
          >
            Available :
            {' '}
            {item.quantity}
          </Text>

        </View>

      </View>

    );
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <View
        style={styles.topBar}
      >

        <Text
          style={styles.title}
        >
          Pharmacy Inventory
        </Text>

      </View>

      <FlatList
        data={inventory}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={
          renderItem
        }
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30,
        }}
      />

    </SafeAreaView>

  );
}

const styles =
StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#F8FAFC',
  },

  topBar: {
    height: 90,
    paddingTop: 20,
    justifyContent:
      'center',
    alignItems:
      'center',
    backgroundColor:
      COLORS.primary,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    flexDirection: 'row',
    backgroundColor:
      '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
  },

  statusBar: {
    width: 8,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 16,
    marginHorizontal: 16,
  },

  detail: {
    color: '#475569',
    marginTop: 4,
    marginHorizontal: 16,
  },

  stock: {
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },

});
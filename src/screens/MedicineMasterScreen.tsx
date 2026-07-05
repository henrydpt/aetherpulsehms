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
  TextInput,
} from 'react-native';

import { COLORS } from '../theme/colors';

import {
  getMedicines,
  searchMedicines,
} from '../services/medicineService';

export default function MedicineMasterScreen() {

  const [
    medicines,
    setMedicines,
  ] = useState<any[]>([]);

  const [
    search,
    setSearch,
  ] = useState('');

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    const data =
      await getMedicines();

    setMedicines(data);
  }

  async function handleSearch(
    text: string
  ) {
    setSearch(text);

    if (!text.trim()) {
      loadMedicines();
      return;
    }

    const data =
      await searchMedicines(text);

    setMedicines(data);
  }

  function renderItem({
    item,
  }: any) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.detail}>
          {item.strength}
          {' • '}
          {item.dosage_form}
        </Text>

        <Text style={styles.manufacturer}>
          {item.manufacturer}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.topBar}>
        <Text style={styles.title}>
          Medicine Master
        </Text>
      </View>

      <TextInput
        placeholder="Search medicine..."
        value={search}
        onChangeText={
          handleSearch
        }
        style={styles.search}
      />

      <FlatList
        data={medicines}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={renderItem}
        contentContainerStyle={{
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
      alignItems: 'center',
      backgroundColor:
        COLORS.primary,
    },

    title: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
    },

    search: {
      margin: 16,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#CBD5E1',
      padding: 14,
    },

    card: {
      backgroundColor:
        '#FFFFFF',
      marginHorizontal: 16,
      marginBottom: 12,
      padding: 16,
      borderRadius: 14,
    },

    name: {
      fontSize: 17,
      fontWeight: '700',
      color: '#0F172A',
    },

    detail: {
      marginTop: 6,
      color: '#475569',
    },

    manufacturer: {
      marginTop: 4,
      color: COLORS.primary,
      fontWeight: '600',
    },

  });
import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';

import {
  getOpQueueWithPatients,
} from '../services/opQueueListService';

export default function OpQueueScreen() {

  const [queue, setQueue] =
    useState<any[]>([]);

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
const data =
  await getOpQueueWithPatients();

    setQueue(data);
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.title}>
        OP Queue
      </Text>

      <Text>
        Waiting:
        {' '}
        {queue.length}
      </Text>

      <FlatList
        data={queue}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <View
            style={styles.card}
          >
            <Text>
              Token:
              {' '}
              {item.token_number}
            </Text>

<Text>
  Patient:
  {' '}
  {item.patientName}
</Text>

<Text>
  Status:
  {' '}
  {item.status}
</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F8F5EE',
      padding: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 12,
    },

    card: {
      backgroundColor:
        '#FFFFFF',
      padding: 14,
      marginTop: 10,
      borderRadius: 10,
    },
  });
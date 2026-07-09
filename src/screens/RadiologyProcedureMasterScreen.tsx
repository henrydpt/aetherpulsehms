import React, {
  useEffect,
  useState,
} from 'react';
import {
  useNavigation,
} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  getProcedures,
} from '../services/radiologyProcedureService';
import { COLORS } from '../theme/colors';
import FloatingActionButton
  from '../components/FloatingActionButton';
export default function RadiologyProcedureMasterScreen() {
const navigation =
  useNavigation<any>();
const [
  procedures,
  setProcedures,
] = useState<any[]>([]);
async function loadProcedures() {

  const data =
    await getProcedures();

  setProcedures(data);

}
useFocusEffect(
  React.useCallback(() => {

    loadProcedures();

  }, [])
);
  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >

        <View
          style={styles.topBar}
        >

          <Text
            style={styles.topBarTitle}
          >
            Radiology Procedure Master
          </Text>

        </View>

        <View
          style={styles.card}
        >

          <Text
            style={styles.heading}
          >
            Procedures
          </Text>

{procedures.map(
  (item) => (

    <View
      key={item.id}
      style={styles.procedureCard}
    >

      <Text
        style={styles.procedureName}
      >
        {item.procedure_name}
      </Text>

<Text
  style={styles.procedureInfo}
>
  Code: {item.procedure_code}
</Text>

<Text
  style={styles.procedureInfo}
>
  Modality: {item.modality}
</Text>

<Text
  style={styles.procedureInfo}
>
  Body Part: {item.body_part || '-'}
</Text>

<Text
  style={styles.procedureInfo}
>
  Duration: {item.estimated_duration ?? '-'} mins
</Text>

<Text
  style={[
    styles.procedureInfo,
    {
      marginTop: 8,
      fontWeight: '600',
    },
  ]}
>
  Preparation
</Text>

<Text
  style={styles.procedureInfo}
>
  {item.preparation_instructions ||
    'No preparation required'}
</Text>

    </View>

  )
)}

        </View>

      </ScrollView>

<FloatingActionButton
  icon="add"
  onPress={() =>
    navigation.navigate(
      'Add Radiology Procedure'
    )
  }
/>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F5EE',
  },

  content: {
    paddingBottom: 100,
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

  card: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },

  message: {
    marginTop: 12,
    color: '#64748B',
    lineHeight: 22,
  },

procedureCard: {
  marginTop: 10,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 12,
  padding: 14,
},

procedureName: {
  fontSize: 16,
  fontWeight: '700',
  color: COLORS.primary,
},

procedureInfo: {
  marginTop: 4,
  color: '#64748B',
},
});
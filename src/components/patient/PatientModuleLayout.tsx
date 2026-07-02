import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../../theme/colors';
import PatientModuleHeader
  from './PatientModuleHeader';

interface Props {
  title: string;
  admission: any;
  children: React.ReactNode;
}

export default function PatientModuleLayout({
  title,
  admission,
  children,
}: Props) {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>
          {title}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <PatientModuleHeader
          admission={admission}
        />

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  topBar: {
    height: 90,
    paddingTop: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  content: {
    paddingBottom: 24,
  },
});
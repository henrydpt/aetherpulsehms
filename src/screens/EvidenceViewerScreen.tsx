import React from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export default function EvidenceViewerScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { imageUri } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#000000"
        barStyle="light-content"
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>
          Close
        </Text>
      </TouchableOpacity>

      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  closeButton: {
    padding: 16,
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  image: {
    flex: 1,
    width: '100%',
  },
});
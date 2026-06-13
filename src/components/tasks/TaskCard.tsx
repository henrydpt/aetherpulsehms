import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  status: string;
  statusColor: string;
  title: string;
  location: string;
  due: string;
  assigned: string;
  dueText?: string;
  onPress?: () => void;
};

export default function TaskCard({
  status,
  statusColor,
  title,
  location,
  due,
  assigned,
  dueText,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.cardTop}>
        <View
          style={[
            styles.badge,
            { borderColor: statusColor },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: statusColor },
            ]}
          >
            {status}
          </Text>
        </View>

        {dueText ? (
          <Text
            style={[
              styles.dueText,
              { color: statusColor },
            ]}
          >
            {dueText}
          </Text>
        ) : null}
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.meta}>
        Location: {location}
      </Text>

      <Text style={styles.meta}>
        Due: {due}
      </Text>

      <View style={styles.assignedRow}>
        <View style={styles.avatar}>
          <Text>👤</Text>
        </View>

        <View>
          <Text style={styles.assignedLabel}>
            Assigned To
          </Text>

          <Text style={styles.assignedName}>
            {assigned}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEE7D8',
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  dueText: {
    fontSize: 11,
    fontWeight: '600',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    color: '#1E293B',
  },

  meta: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 13,
  },

  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  assignedLabel: {
    color: '#94A3B8',
    fontSize: 11,
  },

  assignedName: {
    color: '#1E293B',
    fontWeight: '600',
  },
});
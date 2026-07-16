import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Ionicons,
} from '@expo/vector-icons';
import {
  COLORS,
} from '../../theme/colors';
import { useAuthStore } from '../../store/authStore';
function DrawerSection({
  title,
}: {
  title: string;
}) {
  return (
    <Text style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

function DrawerRow({
  icon,
  title,
  onPress,
  active = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
<TouchableOpacity
  style={[
    styles.row,
    active && styles.activeRow,
  ]}
  onPress={onPress}
>
<Ionicons
  name={icon}
  size={22}
  color={
    active
      ? COLORS.primary
      : '#64748B'
  }
/>

      <Text
  style={[
    styles.rowText,
    active &&
      styles.activeRowText,
  ]}
>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function AppDrawerContent(props: any) {

const navigation = props.navigation;
const userName = useAuthStore(
  (state) => state.userName
);

const role = useAuthStore(
  (state) => state.role
);

const state = props.state;

const currentRoute =
  state.routeNames[
    state.index
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >

      <View style={styles.header}>

        <Ionicons
          name="business"
          size={52}
          color={COLORS.primary}
        />

        <Text style={styles.appName}>
          Aether Pulse HMS
        </Text>

        <Text style={styles.hospital}>
          Udumula Hospital
        </Text>
<View style={styles.userSection}>

  <Text style={styles.userName}>
    {userName}
  </Text>

  <Text style={styles.userRole}>
    {role}
  </Text>

</View>
      </View>

      <DrawerRow
        icon="home"
        title="Home"
        onPress={() =>
          navigation.navigate(
            'MainTabs'
          )
        }
      />

      <DrawerSection
        title="PATIENT CARE"
      />

<DrawerRow
  icon="people"
  title="Patients"
  onPress={() =>
navigation.navigate(
  'MainTabs',
  {
    screen: 'Patients',
  }
)
  }
/>
<DrawerRow
  icon="clipboard"
  title="OP Registration"
  onPress={() =>
    navigation.getParent()?.navigate(
      'OPRegistration'
    )
  }
/>
      <DrawerRow
        icon="bed"
        title="OP Queue"
        onPress={() =>
navigation.navigate(
  'MainTabs',
  {
    screen: 'OPD',
  }
)
        }
      />
      <DrawerRow
        icon="medical"
        title="Consultations"
        onPress={() =>
          navigation.navigate(
            'Consultations'
          )
        }
      />
<DrawerRow
  icon="people"
  title="IP Admissions"
  onPress={() =>
navigation.navigate(
  'MainTabs',
  {
    screen: 'IPD',
  }
)
  }
/>

      <DrawerSection
        title="OPERATIONS"
      />

      <DrawerRow
        icon="checkmark-circle"
        title="Tasks"
        onPress={() =>
          navigation.navigate(
            'Tasks'
          )
        }
      />

      <DrawerRow
        icon="images"
        title="Evidence Viewer"
        onPress={() =>
          navigation.navigate(
            'Evidence Viewer'
          )
        }
      />

      <DrawerSection
        title="ADMINISTRATION"
      />

      <DrawerRow
        icon="person"
        title="User Management"
        onPress={() =>
          navigation.navigate(
            'User Management'
          )
        }
      />
<DrawerSection
  title="PHARMACY"
/>

<DrawerRow
  icon="medkit"
  title="Medicine Master"
  onPress={() =>
    navigation.navigate(
      'Medicine Master'
    )
  }
/>
<DrawerRow
  icon="cube"
  title="Receive Stock"
  onPress={() =>
    navigation.navigate(
      'Receive Stock'
    )
  }
/>
<DrawerRow
  icon="archive"
  title="Inventory"
  onPress={() =>
    navigation.navigate(
      'Inventory'
    )
  }
/>
<DrawerRow
  icon="cube-outline"
  title="Dispensing Queue"
  onPress={() =>
    navigation.navigate(
      'Dispensing Queue'
    )
  }
/>
<DrawerRow
  icon="checkmark-done"
  title="Dispensed Medications"
  onPress={() =>
    navigation.navigate(
      'Dispensed Medications'
    )
  }
/>
<DrawerSection
  title="DIAGNOSTICS"
/>

<DrawerRow
  icon="flask"
  title="Test Master"
  onPress={() =>
    navigation.navigate(
      'Test Master'
    )
  }
/>

<DrawerRow
  icon="beaker"
  title="Lab Queue"
  onPress={() =>
    navigation.navigate(
      'Lab Queue'
    )
  }
/>

<DrawerRow
  icon="document-text"
  title="Lab Results"
  onPress={() =>
    navigation.navigate(
      'Lab Results'
    )
  }
/>
<DrawerRow
  icon="scan"
  title="Radiology"
  onPress={() =>
    navigation.navigate(
      'Radiology Procedure Master'
    )
  }
/>
      <DrawerSection
        title="QUALITY"
      />

      <DrawerRow
        icon="shield-checkmark"
        title="NABH Dashboard"
        onPress={() =>
          navigation.navigate(
            'NABH Dashboard'
          )
        }
      />

      <View style={styles.footer}>

<DrawerRow
  icon="person"
  title="Profile"
  onPress={() =>
    navigation.navigate(
      'Profile'
    )
  }
/>
        <DrawerRow
          icon="settings"
          title="Settings"
          onPress={() => {}}
        />

<DrawerRow
  icon="log-out"
  title="Logout"
  onPress={() => {}}
/>

      </View>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({

  header: {
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 12,
  },

  appName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  hospital: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 14,
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 18,
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  rowText: {
    marginLeft: 18,
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },

  footer: {
    marginTop: 28,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
activeRow: {
  backgroundColor: '#EEF4FF',
  borderLeftWidth: 4,
  borderLeftColor: COLORS.primary,
},

activeRowText: {
  color: COLORS.primary,
  fontWeight: '700',
},
userSection: {
  marginTop: 18,
  alignItems: 'center',
},

userName: {
  fontSize: 16,
  fontWeight: '700',
  color: '#0F172A',
},

userRole: {
  marginTop: 4,
  fontSize: 13,
  color: '#64748B',
},
});
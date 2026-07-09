import React from 'react';

import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  COLORS,
} from '../theme/colors';

type Props = {

  onPress: () => void;

  icon?:
    keyof typeof Ionicons.glyphMap;

};

export default function FloatingActionButton({
  onPress,
  icon = 'add',
}: Props) {

  const insets =
    useSafeAreaInsets();

  return (

    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.fab,
        {
          bottom:
            insets.bottom + 20,
        },
      ]}
    >

<Ionicons
  name={icon}
  size={30}
  color="#FFFFFF"
/>

    </TouchableOpacity>

  );

}

const styles =
  StyleSheet.create({

    fab: {

      position: 'absolute',

      right: 20,

      width: 60,

      height: 60,

      borderRadius: 30,

      backgroundColor:
        COLORS.primary,

      justifyContent: 'center',

      alignItems: 'center',

      elevation: 6,

      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.25,

      shadowRadius: 4,

    },

});
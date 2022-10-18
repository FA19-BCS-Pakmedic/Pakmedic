import {StyleSheet} from 'react-native';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

export const DividerStyles = StyleSheet.create({
  divider: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  halfDivider: {
    height: 5,
    flex: 1,
    borderRadius: 20,
  },

  text: {
    color: colors.secondary1,
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
    marginHorizontal: 20,
  },
});

import {StyleSheet} from 'react-native';
import colors from '../themes/colors';

export const InputStyles = StyleSheet.create({
  filled: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondaryLight,
    borderRadius: 5,
    color: colors.secondary1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  outlined: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary1,
    color: colors.secondary1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

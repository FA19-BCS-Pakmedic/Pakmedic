import {StyleSheet} from 'react-native';
import colors from '../../../utils/styles/themes/colors';
import Fonts from '../../../utils/styles/themes/fonts';

export const ButtonStyles = StyleSheet.create({
  filled: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    borderRadius: 50,
    color: colors.white,
    marginVertical: 10,
  },

  outlined: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary1,
    marginVertical: 10,
  },

  buttonLabel: {
    fontSize: Fonts.size.font16,
    fontWeight: Fonts.weight.bold,
  },
});

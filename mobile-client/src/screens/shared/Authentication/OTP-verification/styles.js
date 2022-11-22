import {StyleSheet} from 'react-native';

import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import dimensions from '../../../../utils/styles/themes/dimensions';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },

  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  input: {
    width: '20%',
    backgroundColor: colors.secondaryLight,
    height: 50,
    color: colors.secondary1,
  },

  resendCodeContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },

  text: {
    fontSize: fonts.size.font14,
    fontWeight: fonts.weight.semi,
  },

  submitButton: {
    width: '70%',
    backgroundColor: colors.primary1,
    paddingVertical: 20,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: 50,
    flex: 1,
  },
});

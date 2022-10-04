import {StyleSheet} from 'react-native';
import colors from '../themes/colors';
import Fonts from '../themes/fonts';

export const ButtonStyles = StyleSheet.create({
  fullFilled: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    borderRadius: 50,
    color: colors.white,
    marginVertical: 10,
  },

  fullOutlined: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary1,
    marginVertical: 10,
  },

  halfFullFilled: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    borderRadius: 50,
    color: colors.white,
    marginVertical: 10,
  },

  halfFullOutlined: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary1,
    marginVertical: 10,
  },

  halfFilled: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    borderRadius: 50,
    color: colors.white,
    marginVertical: 10,
  },

  halfOutlined: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary1,
    marginVertical: 10,
  },

  quarterFilled: {
    width: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    borderRadius: 50,
    color: colors.white,
    marginVertical: 10,
  },

  quarterOutlined: {
    width: '25%',
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
    color: colors.secondary1,
    fontSize: Fonts.size.font16,
    fontWeight: Fonts.weight.bold,
  },
});

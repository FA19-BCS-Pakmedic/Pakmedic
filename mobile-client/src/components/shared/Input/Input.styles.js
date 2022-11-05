import colors from '../../../utils/styles/themes/colors';

export const InputStyles = {
  filled: {
    height: 50,
    backgroundColor: colors.secondaryLight,
    borderRadius: 5,
    color: colors.secondary1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  outlined: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary1,
    color: colors.secondary1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

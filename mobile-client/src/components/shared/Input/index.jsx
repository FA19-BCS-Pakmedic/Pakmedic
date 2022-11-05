//node modules import
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import IntlPhoneInput from 'react-native-intl-phone-input';

// import styles
import {InputStyles} from './Input.styles';
import colors from '../../../utils/styles/themes/colors';

// custom components import
import ErrorMessage from '../ErrorMessage';

getInputType = type => {
  switch (type) {
    case 'filled':
      return InputStyles.filled;
    case 'outlined':
      return InputStyles.outlined;
    default:
      return 'default';
  }
};

//contact input field

export const ContactInputField = ({control, name, rules = {}, type, width}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: {onChange, onBlur},
        fieldState: {error, isDirty, isTouched},
      }) => (
        <View style={styles().root}>
          <View
            style={[
              styles(type, width).container,
              {borderColor: error ? colors.invalid : colors.primary1},
            ]}>
            <IntlPhoneInput
              onChangeText={e => {
                onChange(
                  `${e.dialCode}-${e.phoneNumber.replace(/\s|(|)/gi, '')}`,
                );
              }}
              onBlur={onBlur}
              defaultCountry="PK"
              phoneInputStyle={styles(type, width).input}
              containerStyle={{
                width: '93.5%',
              }}
            />
            <View>
              {(isDirty || isTouched || error) && (
                <Animatable.View
                  animation="fadeIn"
                  easing="ease-in-out"
                  style={styles().iconContainer}>
                  {!error && <Icon name="checkmark-circle-outline" size={18} />}
                  {error && (
                    <Icon
                      name="close-circle-outline"
                      size={18}
                      color={colors.invalid}
                    />
                  )}
                </Animatable.View>
              )}
            </View>
          </View>
          {/* error message */}
          {error && <ErrorMessage error={error} />}
        </View>
      )}
    />
  );
};

// Input field with validity functionality
export const ValidateInputField = ({
  control,
  name,
  rules = {},
  type,
  placeholder,
  width,
  keyboardType,
  isPasswordField,
  placeholderTextColor,
  isPasswordVisible,
  setIsPasswordVisible,
}) => {
  // setting the password eye icon name based on the visiblility status
  const passwordIconName = !isPasswordVisible
    ? 'ios-eye-off-outline'
    : 'ios-eye-outline';

  // password visibility toggle function
  const togglePasswordView = () => {
    setIsPasswordVisible(isPasswordVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      key={name}
      render={({
        field: {onChange, onBlur},
        fieldState: {error, isDirty, isTouched},
      }) => {
        return (
          <View style={styles.root}>
            <View
              style={[
                styles(type).container,
                {borderColor: error ? colors.invalid : colors.primary1},
              ]}>
              <TextInput
                style={styles(type, width).input}
                placeholder={placeholder}
                secureTextEntry={isPasswordVisible}
                keyboardType={keyboardType || 'text'}
                placeholderTextColor={placeholderTextColor || colors.secondary1}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              <View
                style={
                  isPasswordField &&
                  (isDirty || isTouched || error) &&
                  styles().iconsContainer
                }>
                {isPasswordField && (
                  <TouchableOpacity
                    onPress={togglePasswordView}
                    style={styles().iconContainer}>
                    <Icon name={passwordIconName} size={18} />
                  </TouchableOpacity>
                )}
                {(isDirty || isTouched || error) && (
                  <Animatable.View
                    animation="fadeIn"
                    easing="ease-in-out"
                    style={styles().iconContainer}>
                    {!error && (
                      <Icon name="checkmark-circle-outline" size={18} />
                    )}
                    {error && (
                      <Icon
                        name="close-circle-outline"
                        size={18}
                        color={colors.invalid}
                      />
                    )}
                  </Animatable.View>
                )}
              </View>
            </View>
            {/* error message */}
            {error && <ErrorMessage error={error} />}
          </View>
        );
      }}
    />
  );
};

const styles = (type, width) =>
  StyleSheet.create({
    root: {
      width: '100%',
    },

    container: {
      ...getInputType(type),
      width: '100%',
    },

    input: {
      color: colors.secondary1,
      width: width,
    },

    iconsContainer: {
      ...InputStyles.iconsContainer,
    },

    iconContainer: {
      ...InputStyles.iconContainer,
    },
  });

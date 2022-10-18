import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import SVGImage from '../../../assets/svgs/login-screen-icon.svg';
import {
  FacebookSocialButton,
  GoogleSocialButton,
  TwitterSocialButton,
} from 'react-native-social-buttons';

// custom styles import
import styles from './Login.styles';
import colors from '../../../utils/styles/themes/colors';
import {InputStyles} from '../../../utils/styles/components/Input.styles';
import {ButtonStyles} from '../../../utils/styles/components/Button.styles';
import {DividerStyles} from '../../../utils/styles/components/Divider.styles';

// custom components import
import Input from '../../../components/shared/Input';
import Button from '../../../components/shared/Button';
import {TextDivider} from '../../../components/shared/Divider';

const Login = () => {
  return (
    <View style={styles.root}>
      {/* icon */}
      <View style={styles.logoContainer}>
        <SVGImage width={300} height={300} />
      </View>

      {/* email and password fields */}
      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          placeholderTextColor={colors.secondary1}
          styles={InputStyles.outlined}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          placeholderTextColor={colors.secondary1}
          styles={InputStyles.outlined}
          secureTextEntry={true}
        />
      </View>

      {/* login button */}
      <Button
        styles={ButtonStyles.fullFilled}
        onPress={() => {}}
        textStyle={ButtonStyles.buttonLabel}
        label="Login"
      />

      {/* divider */}
      <TextDivider
        label="Or Login With"
        color={colors.secondary1}
        divider={DividerStyles.divider}
        halfDivider={DividerStyles.halfDivider}
        text={DividerStyles.text}
      />

      {/* social buttons */}
      <View style={{width: '100%'}}>
        <FacebookSocialButton
          buttonViewStyle={{width: '100%', marginVertical: 10}}
        />
        <GoogleSocialButton
          buttonViewStyle={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#484848',
            marginVertical: 10,
          }}
        />
      </View>

      {/* register with text */}
      <View style={styles.registerTextContainer}>
        <Text style={styles.text}>
          Don't have an account?
          <Text style={styles.registerText}>Register Now</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

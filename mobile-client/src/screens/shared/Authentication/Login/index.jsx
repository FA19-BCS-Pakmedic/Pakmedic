import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SVGImage from '../../../assets/svgs/login-screen-icon.svg';
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from 'react-native-social-buttons';
import {useForm} from 'react-hook-form';

// custom styles import
import styles from './styles';
import colors from '../../../utils/styles/themes/colors';

// custom components import
import {ValidateInputField} from '../../../components/shared/Input';
import Button from '../../../components/shared/Button';
import {TextDivider} from '../../../components/shared/Divider';

//constants import
import {emailRegex, passwordRegex} from '../../../utils/constants/Regex';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    console.log(data, 'data');
    console.log(errors, 'error');
  };

  return (
    <View style={styles.root}>
      {/* icon */}
      <View style={styles.logoContainer}>
        <SVGImage width={300} height={300} />
      </View>

      {/* email and password fields */}
      <View style={styles.formContainer}>
        {/* email field */}
        <ValidateInputField
          placeholder="Email"
          type="outlined"
          width="93%"
          placeholderTextColor={colors.secondary1}
          keyboardType="email-address"
          control={control}
          name="email"
          rules={{
            required: "Email can't be empty",
            pattern: {
              value: emailRegex,
              message: 'Please enter a valid email',
            },
          }}
        />
        {/* password field */}
        <ValidateInputField
          placeholder="Password"
          type="outlined"
          width="85.5%"
          placeholderTextColor={colors.secondary1}
          keyboardType="password"
          control={control}
          name="password"
          isPasswordField={true}
          isPasswordVisible={!isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
          rules={{
            required: "Password can't be empty",
            pattern: {
              value: passwordRegex,
              message: 'Please enter a valid password',
            },
          }}
        />
      </View>

      {/* login button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        label="Login"
        type="filled"
        width="100%"
      />

      {/* divider */}
      <TextDivider label="Or Login With" color={colors.secondary1} />

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
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

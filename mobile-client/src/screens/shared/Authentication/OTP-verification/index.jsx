// importing libraries`
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

// importing styles
import {styles} from './styles';
import colors from '../../../../utils/styles/themes/colors';

//import svg icon
import SVGImage from '../../../../assets/svgs/forgot-password-screen-icon.svg';
import CustomNavHeader from '../../../../components/shared/CustomNavHeader';
import Header from '../../../../components/shared/Header';
import AutoNextInput from '../../../../components/shared/AutoNextInput';
import Button from '../../../../components/shared/Button';

//importing custom

const OtpVerification = () => {
  const inputRef1 = useRef('');
  const inputRef2 = useRef('');
  const inputRef3 = useRef('');
  const inputRef4 = useRef('');

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(5);
  }, []);

  // useEffect for timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer => timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  onSubmit = () => {
    console.log('submit');
    console.log(pin1, pin2, pin3, pin4);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* custom navigation header with screen name and back navigation button */}
      <CustomNavHeader screenName={'OTP Code Verification'} />
      {/* input fields */}
      <View>
        <SVGImage width={300} height={300} />
      </View>
      <View style={styles.inputContainer}>
        <AutoNextInput
          type="filled"
          width="20%"
          maxLength={1}
          ref={inputRef1}
          onChangeText={text => {
            inputRef2.current.focus();
            setPin1(text);
          }}
        />
        <AutoNextInput
          type="filled"
          width="20%"
          maxLength={1}
          ref={inputRef2}
          onChangeText={text => {
            inputRef3.current.focus();
            setPin2(text);
          }}
        />
        <AutoNextInput
          type="filled"
          width="20%"
          maxLength={1}
          ref={inputRef3}
          onChangeText={text => {
            inputRef4.current.focus();
            setPin3(text);
          }}
        />
        <AutoNextInput
          type="filled"
          width="20%"
          maxLength={1}
          ref={inputRef4}
          onChangeText={text => {
            setPin4(text);
          }}
        />
      </View>
      {/* resend code part */}
      <View style={styles.resendCodeContainer}>
        {timer > 0 ? (
          <Text style={styles.text}>
            Resend Code in <Text style={{color: colors.accent1}}>{timer}s</Text>
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setTimer(5);
            }}>
            <Text style={styles.text}>Resend code</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* submit button */}
      <View style={styles.buttonContainer}>
        <Button
          width="90%"
          type="filled"
          onPress={onSubmit}
          label="Verify Code"
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;

//libraries import
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';
import ForgotPassword from './src/screens/shared/Authentication/Forgot-password';
import OtpVerification from './src/screens/shared/Authentication/OTP-verification';
import SetNewPassword from './src/screens/shared/Authentication/Set-new-password';

const App = () => {
  return (
    // <NavigationContainer>
    //   <RootNavigation />
    // </NavigationContainer>
    <SafeAreaView style={styles.root}>
      <ForgotPassword />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// screens
import Login from './src/screens/shared/Login';
import Register from './src/screens/doctor/Authentication/Register';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Login />
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

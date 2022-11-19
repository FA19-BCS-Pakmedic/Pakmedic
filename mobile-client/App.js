//libraries import
import React from 'react';
// import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

// import root navigation
import RootNavigation from './src/setup/navigation/root.navigation';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'red',
//   },
// });

export default App;

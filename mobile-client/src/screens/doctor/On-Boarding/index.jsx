import {View, Text, Dimensions} from 'react-native';
import React from 'react';

import Doc_Onboarding1 from '../../../assets/svgs/Doc-Onboarding1.svg';

import {styles} from './styles';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const OnBoarding = () => {
  return (
    <View style={{color: 'white'}}>
      {/* <Doc_Onboarding1 width={window.width} height={window.height} /> */}
      <Text style={{color: 'black'}}>{window.height}</Text>
      <Text style={{color: 'black'}}>{window.width}</Text>
    </View>
  );
};

export default OnBoarding;

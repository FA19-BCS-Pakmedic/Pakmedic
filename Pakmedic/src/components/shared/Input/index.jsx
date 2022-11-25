import react from 'react';
import {TextInput} from 'react-native';

// import {filledFieldStyles, outlinedFieldStyles} from './styles';

const Input = props => {
  return (
    <TextInput
      style={props.styles}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
    />
  );
};

export default Input;
